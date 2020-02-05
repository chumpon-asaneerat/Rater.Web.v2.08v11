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

const routes = class {
    static SaveJsonQuestion(req, res) {
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.customerId = 'EDL-2019100001' // hard code.
        params.qsetid = 'QS00001' // hard code.
        let targetPath = path.join(rootPath, 'customer', params.customerId, 'Question')
        mkdirp.sync(targetPath);
        let targetFile =  path.join(targetPath, params.qsetid + '.json')
        let data = {
            id: params.qsetid,
            data: params.data
        };
        fs.writeFileSync(targetFile, JSON.stringify(data), 'utf8')

        let result = nlib.NResult.data({});
        WebServer.sendJson(req, res, result);
    }
    static LoadJsonQuestion(req, res) {
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.customerId = 'EDL-2019100001' // hard code.
        params.qsetid = 'QS00001' // hard code.
        let targetPath = path.join(rootPath, 'customer', params.customerId, 'Question')
        let obj = null;
        let targetFile =  path.join(targetPath, params.qsetid + '.json')
        if (fs.existsSync(targetFile)) {
            obj = fs.readFileSync(targetFile, 'utf8')
        }
        let result = (obj) ? nlib.NResult.data(obj) : nlib.NResult.error(-300, 'file not found');
        WebServer.sendJson(req, res, result);
    }
}

//router.use(secure.checkAccess);

router.post('/question/save', routes.SaveJsonQuestion);
router.post('/question/load', routes.LoadJsonQuestion);

const init_routes = (svr) => {
    svr.route('/dev/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;