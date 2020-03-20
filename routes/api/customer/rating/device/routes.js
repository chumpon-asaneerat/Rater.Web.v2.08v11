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
    static entry(req, res) {
        /*
        let accessId = secure.getAccessId(req, res);
        if (accessId) params.accessId = accessId;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        let deviceId = secure.getDeviceId(req, res);
        if (deviceId) params.deviceId = deviceId;
        */
        let result = {
            data : {},
            errors: null,
            out: {}
        }
        result.data.customerId = secure.getCustomerId(req, res)
        result.data.deviceId = secure.getDeviceId(req, res)
        WebServer.sendJson(req, res, result);
    }
}

//#endregion

//#region Implement - Save

api.Save = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;

        let accessId = secure.getAccessId(req, res);
        if (accessId) params.accessId = accessId;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        // required value or null but required
        //params.deviceId = null; // reset

        return params;
    }
    static async call(db, params) { 
        let ret = db.SetAccessDevice(params);
        return ret;
    }
    static parse(db, data, callback) {
        let result = validate(db, data);
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

router.use(secure.checkAccess);
// routes for device
router.all('/rating/device/search', api.Get.entry);
router.post('/rating/device/save', api.Save.entry);

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;