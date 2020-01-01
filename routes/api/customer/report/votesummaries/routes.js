//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));
const secure = require(path.join(rootPath, 'edl', 'rater-secure')).RaterSecure;

const WebServer = require(path.join(rootPath, 'nlib', 'nlib-express'));
const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

const fs = require('fs')
const mkdirp = require('mkdirp')

//#region exec/validate wrapper method

const exec = async (db, callback) => {
    let ret;
    let connected = await db.connect();
    if (connected) {
        ret = await callback();
        await db.disconnect();
    }
    else {
        ret = db.error(db.errorNumbers.CONNECT_ERROR, 'No database connection.');
    }
    return ret;
}
const validate = (db, data) => {
    let result = data;
    if (!result) {
        result = db.error(db.errorNumbers.NO_DATA_ERROR, 'No data returns');
    }
    else {
        result = checkForError(data);
    }
    return result;
}
const checkForError = (data) => {
    let result = data;
    if (result.out && result.out.errNum && result.out.errNum !== 0) {
        result.errors.hasError = true;
        result.errors.errNum = result.out.errNum;
        result.errors.errMsg = result.out.errMsg;
    }
    return result;
}

//#endregion

const api = class {
    static async GetQSet(db, params) {
        let ret = {};
        let qslideitemsDbRet = await db.GetQSlideItems({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            qSSeq: null,
            enabled: true,
        });
        let qslideitems = qslideitemsDbRet.data;
        for (let i = 0; i < qslideitems.length; i++) {
            let row = qslideitems[i];
            if (!ret[row.langId]) {
                ret[row.langId] = {
                    desc: '',
                    beginDate: null,
                    endDate: null,
                    slides: []
                }
            }
            let currLang = ret[row.langId];
            let slidemaps = currLang.slides.map(slide => { return slide.qseq })
            let slideidx = slidemaps.indexOf(row.qSeq)
            let currSlide;
            if (slideidx === -1) {
                currSlide = {
                    qseq: row.qSeq,
                    text: '',
                    items: []
                }
                currLang.slides.push(currSlide)
            }
            else {
                currSlide = currLang.slides[slideidx]
            }
            let itemmaps = currSlide.items.map(item => { return item.choice })
            let itemidx = itemmaps.indexOf(row.qSSeq)
            let currItem;
            if (itemidx === -1) {
                currItem = {
                    choice: row.qSSeq,
                    text: row.QItemText
                }
                currSlide.items.push(currItem)
            }
            else {
                currItem = currSlide.items[itemidx]
            }
        }

        let qslidesDbRet = await db.GetQSlides({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            enabled: true,
        });
        let qslides = qslidesDbRet.data;
        for (let i = 0; i < qslides.length; i++) {
            let row = qslides[i];
            let currLang = ret[row.langId];
            if (currLang) {
                let slidemaps = currLang.slides.map(slide => { return slide.qseq })
                let slideidx = slidemaps.indexOf(row.qSeq)
                let currSlide;
                if (slideidx !== -1) {
                    currSlide = currLang.slides[slideidx]
                    currSlide.text = row.QSlideText;
                }
            }
        }

        let qsetDbRet = await db.GetQSets({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            enabled: true,
        });
        let qsets = qsetDbRet.data;

        for (let i = 0; i < qsets.length; i++) {
            let row = qsets[i];
            let currLang = ret[row.langId];
            if (currLang) {
                currLang.desc = row.QSetDescription;
                currLang.beginDate = row.BeginDate;
                currLang.endDate = row.EndDate;
            }
        }        

        return ret;
    }
    static CreateVoteSummaries(obj, qset, results) {
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let row = results[i];
                let landId = row.LangId;
                if (!obj[landId]) {
                    obj[landId] = {
                        slides: []
                    }
                }
                let cLangObj = obj[landId];
                let cQSet = qset[landId]
                cLangObj.customerId = row.CustomerId;
                cLangObj.CustomerName = row.CustomerName;
                cLangObj.qsetId = row.QSetId;
                cLangObj.desc = cQSet.desc;
                cLangObj.beginDate = cQSet.beginDate;
                cLangObj.endDate = cQSet.endDate;
                let slidemaps = cLangObj.slides.map(slide => { return slide.qseq })
                let slideidx = slidemaps.indexOf(row.QSeq);
                let currSlide;
                let cqslidemap = cQSet.slides.map(qslide => { return qslide.qseq })
                let cqslideidx = cqslidemap.indexOf(row.QSeq);
                let cQSlide = (cqslideidx !== -1) ? cQSet.slides[cqslideidx] : null;

                if (slideidx === -1) {
                    currSlide = { 
                        qseq: row.QSeq,
                        text: (cQSlide) ? cQSlide.text : '',
                        maxChoice: row.MaxChoice,
                        choices: [],
                        orgs: []
                    }
                    // setup choices
                    cQSlide.items.forEach(item => {
                        let choice = {
                            choice: item.choice,
                            text: item.text,
                        }
                        currSlide.choices.push(choice)
                    })
                    cLangObj.slides.push(currSlide)
                }
                else { 
                    currSlide = cLangObj.slides[slideidx];
                }

                let orgmaps = currSlide.orgs.map(org => { return org.orgId });
                let orgidx = orgmaps.indexOf(row.OrgId);
                let currOrg;
                if (orgidx === -1) {
                    currOrg = { 
                        orgId: row.OrgId,
                        OrgName: row.OrgName,
                        parentId: row.ParentId,
                        branchId: row.BranchId,
                        BranchName: row.BranchName,
                        TotCnt: row.TotCnt,
                        AvgPct: row.AvgPct,
                        AvgTot: row.AvgTot,
                        choices: []
                    }
                    currSlide.orgs.push(currOrg)
                }
                else { 
                    currOrg = currSlide.orgs[orgidx];
                }

                let choicemaps = currOrg.choices.map(item => { return item.choice });
                let choiceidx = choicemaps.indexOf(row.Choice);
                let currChoice;

                let cQItemmaps = (cQSlide) ? cQSlide.items.map(item => { return item.choice }) : null
                let cQItemidx = (cQItemmaps) ? cQItemmaps.indexOf(row.Choice) : -1;
                if (choiceidx === -1) {
                    currChoice = {
                        choice: row.Choice,
                        text: (cQItemmaps && cQItemidx !== -1) ? cQSlide.items[cQItemidx].text : '',
                        Cnt: row.Cnt,
                        Pct: row.Pct,
                    }
                    currOrg.choices.push(currChoice)
                }
                else {
                    currChoice = currOrg.choices[choiceidx];
                }
            }
        }
    }

    static findIndex(items, property, value) {
        let maps = items.map(item => { return item[property] })
        let idx = maps.indexOf(value)
        return idx;
    }
}

// static class.
/*
const api = class {
    static findIndex(items, property, value) {
        let maps = items.map(item => { return item[property] })
        let idx = maps.indexOf(value)
        return idx;
    }
}
*/
api.question = class {
    static checkLanguageId(params) {
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId = null;
        }
    }
    static prepare(params) {
        let util = api.question;
        util.checkLanguageId(params)
    }
    static async load(db, params) {
        let util = api.question;
        util.prepare(params)
        let ret = {};
        await util.qslideitems.exec(db, params, ret)
        await util.qslides.exec(db, params, ret)
        await util.qsets.exec(db, params, ret)
        return ret;
    }
    static parse(db, params, data) {
        let oParams = {}
        oParams.langId = params.langId;
        oParams.customerId = params.customerId;
        oParams.beginDate = params.beginDate;
        oParams.endDate = params.endDate;
        oParams.qsetId = params.qsetId;

        let slides = params.slides;
        let orgs = params.orgs;

        let result;

        if (slides && slides.length > 0) {

        }
        else {

        }

        result = {
            data: null,
            errors: { hasError: false, errNum: 0, errMsg: '' },
            out: {}
        }
        // set to result.
        result.data = data;

        return result;
    }
    static parseSlides(db, params, data, slides, orgs) {

    }
}
api.question.qslideitems = class {
    static async exec(db, params, model) {
        let util = api.question.qslideitems; // shotcut
        let rows = await util.exec_db(db, params)
        util.process_rows(model, rows)
    }
    static async exec_db(db, params) {
        let dbResult = await db.GetQSlideItems({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            qSSeq: null,
            enabled: true,
        });
        return (dbResult) ? dbResult.data : null;
    }
    static process_rows(model, rows) {
        let util = api.question.qslideitems; // shotcut
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            util.process_row(model, row)
        }
    }
    static process_row(model, row) {
        let util = api.question.qslideitems; // shotcut
        util.checkLanguagePropperty(model, row)
        let langObj = model[row.langId];
        let slideObj = util.getSlideByRow(row, langObj)
        let slideItemObj = util.getSlideItemByRow(row, slideObj)
    }
    static checkLanguagePropperty(model, row) {
        if (!model[row.langId]) {
            model[row.langId] = {
                desc: '',
                beginDate: null,
                endDate: null,
                slides: []
            }
        }
    }
    static getSlideByRow(row, langObj) {
        let util = api.question.qslideitems; // shotcut
        let ret;
        let idx = api.findIndex(langObj.slides, 'qseq', row.qSeq)
        if (idx === -1) {
            ret = {
                qseq: row.qSeq,
                text: '',
                items: []
            }
            langObj.slides.push(ret)
        }
        else {
            ret = langObj.slides[idx]
        }
        return ret;
    }
    static getSlideItemByRow(row, slideObj) {
        let util = api.question.qslideitems; // shotcut
        let ret;
        let idx = api.findIndex(slideObj.items, 'choice', row.qSSeq)
        if (idx === -1) {
            ret = {
                choice: row.qSSeq,
                text: row.QItemText
            }
            slideObj.items.push(ret)
        }
        else {
            ret = currSlide.items[idx]
        }
        return ret;
    }
}
api.question.qslides = class {
    static async exec(db, params, model) {
        let util = api.question.qslides; // shotcut
        let rows = await util.exec_db(db, params)
        util.process_rows(model, rows)
    }
    static async exec_db(db, params) {
        let dbResult = await db.GetQSlides({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            enabled: true,
        });
        return (dbResult) ? dbResult.data : null;
    }
    static process_rows(model, rows) {
        let util = api.question.qslides; // shotcut
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            util.process_row(model, row)
        }
    }
    static process_row(model, row) {
        let util = api.question.qslides; // shotcut
        let langObj = model[row.langId];
        if (langObj) {
            let slideObj = util.getSlideByRow(row, langObj)
        }        
    }
    static getSlideByRow(row, langObj) {
        //let util = api.question.qslides; // shotcut
        let idx = api.findIndex(langObj.slides, 'qseq', row.qSeq)
        let ret = null;
        if (idx !== -1) {
            ret = langObj.slides[idx];
            ret.text = row.QSlideText;
        }
        return ret; 
    }
}
api.question.qsets = class {
    static async exec(db, params, model) {
        let util = api.question.qsets; // shotcut
        let rows = await util.exec_db(db, params)
        util.process_rows(model, rows)
    }
    static async exec_db(db, params) {
        let dbResult = await db.GetQSets({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            enabled: true,
        });
        return (dbResult) ? dbResult.data : null;
    }
    static process_rows(model, rows) {
        let util = api.question.qsets; // shotcut
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            util.process_row(model, row)
        }
    }
    static process_row(model, row) {
        let util = api.question.qsets; // shotcut
        let langObj = model[row.langId];
        if (langObj) {
            langObj.desc = row.QSetDescription;
            langObj.beginDate = row.BeginDate;
            langObj.endDate = row.EndDate;
        }
    }
}

//#region Implement - Get

api.Get = class {
    static prepare(req, res) {
        /*
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        api.question.prepare(params)
        params.deviceId = null;
        params.userId = null;
        */
       let params = WebServer.parseReq(req).data;
       if (params.langId === undefined || params.langId === null || params.langId === '') {
           params.langId = null;
       }
       let customerId = secure.getCustomerId(req, res);
       if (customerId) params.customerId = customerId;
       params.deviceId = null;
       params.userId = null;

        return params;
    }
    static async call(db, params) { 
        //return await api.question.load(db, params);
        let oParams = {};
        oParams.langId = params.langId;
        oParams.customerId = params.customerId;
        oParams.beginDate = params.beginDate;
        oParams.endDate = params.endDate;
        oParams.qsetId = params.qsetId;

        let qset = await api.GetQSet(db, params);

        console.log(qset)

        let slides = params.slides;
        let orgs = params.orgs;
        let ret, dbresult;
        let result = {};
        // loop selected slide
        if (slides && slides.length > 0) {
            for (let i = 0; i < slides.length; i++) {
                oParams.qSeq = slides[i].qSeq;
                if (orgs && orgs.length > 0) {
                    for (let j = 0; j < orgs.length; j++) {
                        oParams.orgId = orgs[j].orgId;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        api.CreateVoteSummaries(result, qset, dbresult.data)
                    }
                }
                else {
                    // no org specificed
                    oParams.orgId = null;
                    // execute
                    ret = await db.GetVoteSummaries(oParams);
                    dbresult = validate(db, ret);
                    api.CreateVoteSummaries(result, qset, dbresult.data)
                }
            }
        }
        else {
            // no slide specificed
            oParams.qSeq = null;
            if (orgs && orgs.length > 0) {
                for (let j = 0; j < orgs.length; j++) {
                    oParams.orgId = orgs[j].orgId;
                    // execute
                    ret = await db.GetVoteSummaries(oParams);
                    dbresult = validate(db, ret);
                    api.CreateVoteSummaries(result, qset, dbresult.data)
                }
            }
            else {
                // no org specificed
                oParams.orgId = null;
                // execute
                ret = await db.GetVoteSummaries(oParams);
                dbresult = validate(db, ret);
                api.CreateVoteSummaries(result, qset, dbresult.data)
            }
        }

        //return db.GetVoteSummaries(params);
        return result;
    }
    static parse(db, data, callback) {
        //let result = api.question.parse(db, params, data)
        let result = {
            data: null,
            errors: {
                hasError: false,
                errNum: 0,
                errMsg: ''
            },
            out: {}
        }
        // set to result.
        result.data = data;
        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.Get.prepare(req, res);
        let fn = async () => { return api.Get.call(db, params); }
        exec(db, fn).then(data => {
            api.Get.parse(db, data, (result) => {
                WebServer.sendJson(req, res, result);
            });
        })
    }
}

//#endregion

//#region Implement - Save

api.Save = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        /*
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.langId = null; // force null.
        params.branchId = null;
        params.enabled = true;
        */
        return params;
    }
    static async call(db, params) { 
        return null;
    }
    static parse(db, data, callback) {
        let dbResult = validate(db, data);
        let result = {}        
        result.data = null
        //result.src = dbResult.data
        result.errors = dbResult.errors
        //result.multiple = dbResult.multiple
        //result.datasets = dbResult.datasets
        result.out = dbResult.out

        let records = dbResult.data;
        let ret = {};

        // set to result.
        result.data = ret;

        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.Save.prepare(req, res);
        let fn = async () => { return api.Save.call(db, params); }
        exec(db, fn).then(data => {
            api.Save.parse(db, data, (result) => {
                WebServer.sendJson(req, res, result);
            });
        })
    }
}

//#endregion

//#region Implement - Delete

api.Delete = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        /*
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.langId = null; // force null.
        params.branchId = null;
        params.enabled = true;
        */
        return params;
    }
    static async call(db, params) { 
        return null;
    }
    static parse(db, data, callback) {
        let dbResult = validate(db, data);
        let result = {}        
        result.data = null
        //result.src = dbResult.data
        result.errors = dbResult.errors
        //result.multiple = dbResult.multiple
        //result.datasets = dbResult.datasets
        result.out = dbResult.out

        let records = dbResult.data;
        let ret = {};

        // set to result.
        result.data = ret;

        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.Delete.prepare(req, res);
        let fn = async () => { return api.Delete.call(db, params); }
        exec(db, fn).then(data => {
            api.Delete.parse(db, data, (result) => {
                WebServer.sendJson(req, res, result);
            });
        })
    }
}

//#endregion

router.use(secure.checkAccess);
// routes for vote summaries
router.all('/report/votesummaries/search', api.Get.entry);
//router.post('/report/votesummaries/save', api.Save.entry);
//router.post('/report/votesummaries/delete', api.Delete.entry);

router.all('/report/votesummaries/test1', (req, res) => {
    let db = new sqldb();
    let params = api.Get.prepare(req, res);
    let fn = async () => { 
        return await api.question.load(db, params);
    }
    exec(db, fn).then(data => {
        WebServer.sendJson(req, res, data);
    })
});

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;