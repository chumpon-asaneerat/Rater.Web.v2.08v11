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

const routes = class {
    static register(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return db.Register(params);
        }
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    static validateAcccounts(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        
        let fn = async () => {
            return db.CheckUsers(params);
        }
        exec(db, fn).then(data => {
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
                let map = ret[rec.langId].map(c => c.customerId);
                let idx = map.indexOf(rec.customerId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { customerId: rec.customerId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.FullName = rec.FullName;
                nobj.CustomerName = rec.CustomerName;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static signin(req, res, next) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return db.SignIn(params);
        }
        exec(db, fn).then(data => {
            let result = validate(db, data);
            if (result && !result.errors.hasError && result.out.errNum === 0) {
                let obj = {
                    accessId: result.out.accessId
                }
                WebServer.signedCookie.writeObject(req, res, obj, WebServer.expires.in(5).years);
            }
            WebServer.sendJson(req, res, result);
        })
    }
}

router.post('/register', routes.register)
router.post('/validate-accounts', routes.validateAcccounts)
router.post('/signin', routes.signin)
router.post('/signout', secure.signout)

const init_routes = (svr) => {
    svr.route('/api/customer', router);
};

module.exports.init_routes = exports.init_routes = init_routes;