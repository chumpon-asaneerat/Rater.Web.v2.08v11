//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));
const sfs = require(path.join(rootPath, 'edl', 'server-fs'));
const secure = require(path.join(rootPath, 'edl', 'rater-secure')).RaterSecure;

const WebServer = require(path.join(rootPath, 'nlib', 'nlib-express'));
const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

const routes = class {
    static home(req, res) {
        WebServer.sendFile(req, res, __dirname, 'html', 'index.html');
    }
    static getjsfile(req, res) {
        let file = req.params.file.toLowerCase();
        let files = ['app.js']
        let idx = files.indexOf(file);
        if (idx !== -1) {
            let fname = path.join(__dirname, 'js', files[idx]);
            WebServer.sendFile(req, res, fname);
        }
    }
    static getContents(req, res) {
        let data = sfs.getContents(path.join(__dirname, 'contents'));
        let result = nlib.NResult.data(data);
        WebServer.sendJson(req, res, result);
    }
}

//router.get('/question/', secure.checkAccess, secure.checkRedirect, routes.home)
router.get('/question/', secure.checkAccess, routes.home)
router.get('/question/contents', routes.getContents)
router.get('/question/js/:file', routes.getjsfile)

const init_routes = (svr) => {
    svr.route('/rating', router);
};

module.exports.init_routes = exports.init_routes = init_routes;

