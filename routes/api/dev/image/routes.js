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

const api = class {}

//#region Implement - Save

api.Save = class {
    static prepare(req, res) {
        let reqObj = WebServer.parseReq(req).data;
        let url = reqObj.url;
        let targetFile = path.join(rootPath, url)
        let binaryData = fs.readFileSync(targetFile)
        let params = {}
        params.imageId = reqObj.imageId;   
        params.data =  binaryData;
        return params;
    }
    static async call(db, params) { 
        return await db.SaveImage(params);
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
        // set to result.
        result.data = dbResult.data;

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

//#region Implement - Load

api.Load = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        return params;
    }
    static async call(db, params) { 
        return await db.GetImage(params);
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
        // set to result.
        result.data = dbResult.data

        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.Load.prepare(req, res);
        let fn = async () => { return api.Load.call(db, params); }
        exec(db, fn).then(data => {
            api.Load.parse(db, data, (result) => {
                // write to file.
                let targetFile = path.join(rootPath, params.url)
                if (result.data && result.data.length > 0) {                    
                    let row = result.data[0];
                    let buff = Buffer.from(row.data)
                    fs.writeFileSync(targetFile, buff)
                }
                // set data to null because is to large when used with image.
                result.data = null;
                
                WebServer.sendJson(req, res, result);
            });
        })
    }
}

//#endregion

router.all('/images/save', api.Save.entry);
router.all('/images/load', api.Load.entry);

const init_routes = (svr) => {
    svr.route('/dev/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;