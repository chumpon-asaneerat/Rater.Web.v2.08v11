//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));
const sfs = require(path.join(rootPath, 'edl', 'server-fs'));
//const secure = require(path.join(rootPath, 'edl', 'rater-secure')).RaterSecure;

const WebServer = require(path.join(rootPath, 'nlib', 'nlib-express'));
const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

const routes = class {
    static home(req, res) {
        WebServer.sendFile(req, res, __dirname, 'index.html');
    }
}

router.get('/orgchart/jsorgchart-6', routes.home)

const init_routes = (svr) => {
    svr.route('/dev', router);
};

module.exports.init_routes = exports.init_routes = init_routes;