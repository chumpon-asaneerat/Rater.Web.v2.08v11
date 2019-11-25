//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));

const sfs = require(path.join(rootPath, 'edl', 'server-fs'));
const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));

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

const routes = class {
    static GetLanguages(req, res) { 
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.enabled = true;
        let fn = () => db.GetLanguages(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
}

router.all('/languages/search', routes.GetLanguages)

const init_routes = (svr) => {
    svr.route('/api', router);
};

module.exports.init_routes = exports.init_routes = init_routes;