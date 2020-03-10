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
    /**
     * home
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static home(req, res) {
        WebServer.sendFile(req, res, __dirname, 'index.html');
    }
    static getCss(req, res) {
        WebServer.sendFile(req, res, __dirname, 'style.css');
    }
    static getJs(req, res) {
        WebServer.sendFile(req, res, __dirname, 'script.js');
    }
}

router.get('/tosvg', routes.home)
router.get('/tosvg/style.css', routes.getCss)
router.get('/tosvg/script.js', routes.getJs)

const init_routes = (svr) => {
    svr.route('/dev/fabricjs', router);
};

module.exports.init_routes = exports.init_routes = init_routes;
