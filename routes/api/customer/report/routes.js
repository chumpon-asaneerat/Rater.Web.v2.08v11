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

const api = class {}
api.filter = class {}
api.filter.FindVoteMembers = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        return params;
    }
    static async call(db, params) {
        return db.GetOrgs(params);
    }
    static parse(db, data, callback) {
        let dbResult = validate(db, data);

        let result = {
            data : null,
            //src: dbResult.data,
            errors: dbResult.errors,
            //multiple: dbResult.multiple,
            //datasets: dbResult.datasets,
            out: dbResult.out
        }
        let records = dbResult.data;
        let ret = {};

        records.forEach(rec => {
            if (!ret[rec.langId]) {
                ret[rec.langId] = []
            }
            let map = ret[rec.langId].map(c => c.orgId);
            let idx = map.indexOf(rec.orgId);
            let nobj;
            if (idx === -1) {
                // set id
                nobj = { orgId: rec.orgId }
                // init lang properties list.
                ret[rec.langId].push(nobj)
            }
            else {
                nobj = ret[rec.langId][idx];
            }
            nobj.parentId = rec.parentId;
            nobj.branchId = rec.branchId;
            nobj.OrgName = rec.OrgName;
            nobj.BranchName = rec.BranchName;
        })
        // set to result.
        result.data = ret;

        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.filter.FindVoteMembers.prepare(req, res);
        let fn = async () => { return api.filter.FindVoteMembers.call(db, params); }
        exec(db, fn).then(data => {
            api.Get.parse(db, data, (result) => {
                WebServer.sendJson(req, res, result);
            });
        })
    }
}
api.filter.QSetByDate = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        return params;
    }
    static async call(db, params) {
        return db.GetOrgs(params);
    }
    static parse(db, data, callback) {
        let dbResult = validate(db, data);

        let result = {
            data : null,
            //src: dbResult.data,
            errors: dbResult.errors,
            //multiple: dbResult.multiple,
            //datasets: dbResult.datasets,
            out: dbResult.out
        }
        let records = dbResult.data;
        let ret = {};

        records.forEach(rec => {
            if (!ret[rec.langId]) {
                ret[rec.langId] = []
            }
            let map = ret[rec.langId].map(c => c.orgId);
            let idx = map.indexOf(rec.orgId);
            let nobj;
            if (idx === -1) {
                // set id
                nobj = { orgId: rec.orgId }
                // init lang properties list.
                ret[rec.langId].push(nobj)
            }
            else {
                nobj = ret[rec.langId][idx];
            }
            nobj.parentId = rec.parentId;
            nobj.branchId = rec.branchId;
            nobj.OrgName = rec.OrgName;
            nobj.BranchName = rec.BranchName;
        })
        // set to result.
        result.data = ret;

        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.filter.QSetByDate.prepare(req, res);
        let fn = async () => { return api.filter.QSetByDate.call(db, params); }
        exec(db, fn).then(data => {
            api.Get.parse(db, data, (result) => {
                WebServer.sendJson(req, res, result);
            });
        })
    }
}

router.use(secure.checkAccess);
// routes for staff summaries
router.all('/filter/votemembers', api.filter.FindVoteMembers.entry);
router.all('/filter/qsetbydate', api.filter.QSetByDate.entry);

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;