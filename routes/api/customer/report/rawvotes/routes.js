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
const api = class { }

/*
Rawvote required to implements seperate data in below structure.
{
    "data": {
        "EN": {
            "slides": [{
                "qseq": 1,
                "text": "Plase rate for product`s quality.",
                "maxChoice": 4,
                "choices": [{
                    "choice": 1,
                    "text": "Poor"
                }, {
                    "choice": 2,
                    "text": "Fair"
                }, {
                    "choice": 3,
                    "text": "Good"
                }, {
                    "choice": 4,
                    "text": "Excellent"
                }],
                "orgs": [
                    {
                        "orgId": "O0001",
                        "OrgName": "EDL Co., Ltd.",
                        "parentId": "",
                        "branchId": "B0001",
                        "BranchName": "HQ",                        
                    }
                ],
                votes :[
                    { "VoteDate": "", "VoteValue": 1, ... }
                ]
            }
        ]}
}
*/
//#region Implement - Get

api.Get = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId =  'EN';
        }
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        return params;
    }
    static async call(db, params) { 
        return db.GetRawVotes(params);
    }
    static parse(db, data, callback) {
        let result = {
            data : null,
            //src: dbResult.data,
            errors: data.errors,
            //multiple: dbResult.multiple,
            //datasets: dbResult.datasets,
            out: data.out
        }
        // set to result.
        result.data = data.data;

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
// routes for raw votes
router.all('/report/rawvotes/search', api.Get.entry);
//router.post('/report/rawvotes/save', api.Save.entry);
//router.post('/report/rawvotes/delete', api.Delete.entry);

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;