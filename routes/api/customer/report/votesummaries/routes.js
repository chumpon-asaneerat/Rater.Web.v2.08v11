//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));
const secure = require(path.join(rootPath, 'edl', 'rater-secure')).RaterSecure;

const rptAPI = require('../report-api').api;

const WebServer = require(path.join(rootPath, 'nlib', 'nlib-express'));
const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

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

        let qset = await rptAPI.question.load(db, params);

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
        return await rptAPI.question.load(db, params);
    }
    exec(db, fn).then(data => {
        WebServer.sendJson(req, res, data);
    })
});

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;