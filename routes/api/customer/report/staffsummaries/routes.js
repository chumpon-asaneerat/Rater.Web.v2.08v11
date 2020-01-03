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

// static class.
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
    static CreateStaffSummaries(obj, qset, results) {
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
                        users: []
                    }
                    currSlide.orgs.push(currOrg)
                }
                else { 
                    currOrg = currSlide.orgs[orgidx];
                }
                let usermaps = currOrg.users.map(user => { return user.userId});
                let useridx = usermaps.indexOf(row.UserId);
                let currUser;
                if (useridx === -1) {
                    currUser = {
                        TotCnt: row.TotCnt,
                        AvgPct: row.AvgPct,
                        AvgTot: row.AvgTot,
                        userId: row.UserId,
                        fullName: row.FullName,
                        deviceId: row.DeviceId,
                        choices: []
                    }
                    currOrg.users.push(currUser)
                }
                else {
                    currUser = currOrg.users[useridx];
                }

                let choicemaps = currUser.choices.map(item => { return item.choice });
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
                    currUser.choices.push(currChoice)
                }
                else {
                    currChoice = currUser.choices[choiceidx];
                }
            }
        }
    }
}

//#region Implement - Get

api.Get = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId = null;
        }
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.deviceId = null;

        return params;
    }
    static async call(db, params) { 
        let oParams = {};
        oParams.langId = params.langId;
        oParams.customerId = params.customerId;
        oParams.beginDate = params.beginDate;
        oParams.endDate = params.endDate;
        oParams.qsetId = params.qsetId;

        let qset = await api.GetQSet(db, params);

        let slides = params.slides;
        let orgs = params.orgs;
        let users = params.users;
        let ret, dbresult;
        let result = {};
        // loop selected slide
        if (slides && slides.length > 0) {
            for (let i = 0; i < slides.length; i++) {
                oParams.qSeq = slides[i].qSeq;
                if (orgs && orgs.length > 0) {
                    for (let j = 0; j < orgs.length; j++) {
                        oParams.orgId = orgs[j].orgId;
                        if (users && users.length > 0) {
                            for (let k = 0; k < users.length; k++) {
                                oParams.userId = users[k].userId;
                                // execute
                                ret = await db.GetVoteSummaries(oParams);
                                dbresult = validate(db, ret);
                                api.CreateStaffSummaries(result, qset, dbresult.data)
                            }
                        }
                        else {
                            oParams.userId = null;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            api.CreateStaffSummaries(result, qset, dbresult.data)
                        }
                    }
                }
                else {
                    // no org specificed
                    oParams.orgId = null;
                    if (users && users.length > 0) {
                        for (let k = 0; k < users.length; k++) {
                            oParams.userId = users[k].userId;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            api.CreateStaffSummaries(result, qset, dbresult.data)
                        }
                    }
                    else {
                        oParams.userId = null;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        api.CreateStaffSummaries(result, qset, dbresult.data)
                    }
                }
            }
        }
        else {
            // no slide specificed
            oParams.qSeq = null;
            if (orgs && orgs.length > 0) {
                for (let j = 0; j < orgs.length; j++) {
                    oParams.orgId = orgs[j].orgId;
                    if (users && users.length > 0) {
                        for (let k = 0; k < users.length; k++) {
                            oParams.userId = users[k].userId;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            api.CreateVoteSummaries(result, qset, dbresult.data)
                        }
                    }
                    else {
                        oParams.userId = null;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        api.CreateVoteSummaries(result, qset, dbresult.data)
                    }
                }
            }
            else {
                // no org specificed
                oParams.orgId = null;
                if (users && users.length > 0) {
                    for (let k = 0; k < users.length; k++) {
                        oParams.userId = users[k].userId;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        api.CreateVoteSummaries(result, qset, dbresult.data)
                    }
                }
                else {
                    oParams.userId = null;
                    // execute
                    ret = await db.GetVoteSummaries(oParams);
                    dbresult = validate(db, ret);
                    api.CreateVoteSummaries(result, qset, dbresult.data)
                }
            }
        }

        //return db.GetVoteSummaries(params);
        return result;
    }
    static parse(db, data, callback) {
            //let dbResult = validate(db, data);

            /*
            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            */
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

router.use(secure.checkAccess);
// routes for staff summaries
router.all('/report/staffsummaries/search', api.Get.entry);

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;