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

//#region Implement - Get

api.Get = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.deviceId = null;
        params.enabled = true;

        return params;
    }
    static async call(db, params) { 
        return db.GetDevices(params);
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
            let map = ret[rec.langId].map(c => c.deviceId);
            let idx = map.indexOf(rec.deviceId);
            let nobj;
            if (idx === -1) {
                // set id
                nobj = { deviceId: rec.deviceId }
                // init lang properties list.
                ret[rec.langId].push(nobj)
            }
            else {
                nobj = ret[rec.langId][idx];
            }
            nobj.DeviceName = rec.DeviceName;
            nobj.Location = rec.Location;
            nobj.deviceTypeId = rec.deviceTypeId;
            nobj.memberId = rec.memberId;
            nobj.orgId = rec.orgId;
            nobj.Type = rec.Type;
        })
        // set to result.
        result.data = ret;

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

        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        return params;
    }
    static async call(db, params) { 
        let ret;
        let rets = [];
        let customerId = params.customerId;
        if (params && params.items) {
            let items = params.items;
            let deviceId;
            // loop to save EN item as default and 
            // keep device id when create new.
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = customerId;
                if (item.langId === 'EN') {
                    ret = await db.SaveDevice(item);
                    deviceId = ret.out.deviceId;
                    rets.push(ret);
                }
            }
            // loop to save non EN items and 
            // assign parent device id when save in child table.
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = params.customerId;
                if (!item.deviceId || item.deviceId === '') {
                    item.deviceId = deviceId;
                }                
                if (item.langId !== 'EN') {
                    ret = await db.SaveDeviceML(item);
                    rets.push(ret);
                }                
            }
        }
        return rets;
    }
    static parse(db, data, callback) {
        let results = [];
        let result;
        let dbResult;

        for (let i = 0; i < data.length; i++) {
            dbResult = validate(db, data[i]);

            result = {
                data : dbResult.data,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            results.push(result);
        }

        callback(results);
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
        //return db.GetBranchs(params);
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
        /*
        records.forEach(rec => {
            if (!ret[rec.langId]) {
                ret[rec.langId] = []
            }
            let map = ret[rec.langId].map(c => c.branchId);
            let idx = map.indexOf(rec.branchId);
            let nobj;
            if (idx === -1) {
                // set id
                nobj = {}
                nobj.branchId = rec.branchId
                // init lang properties list.
                ret[rec.langId].push(nobj)
            }
            else {
                nobj = ret[rec.langId][idx];
            }
            nobj.branchName = rec.BranchName;
        })
        */
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
// routes for device
router.all('/device/search', api.Get.entry);
router.post('/device/save', api.Save.entry);
//router.post('/device/delete', api.Delete.entry);

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;