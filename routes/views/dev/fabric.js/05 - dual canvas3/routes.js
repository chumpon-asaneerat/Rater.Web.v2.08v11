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
    static getFabricJs(req, res) {
        WebServer.sendFile(req, res, __dirname, 'nlib-fabric.js');
    }
    static getAssetList(req, res) {
        let obj = { urls: [] }
        WebServer.sendJson(req, res, obj)
    }
    static getAsset(req, res) {
        console.log(req)
        let obj = { urls: [] }
        WebServer.sendJson(req, rest, obj)
    }
}

router.get('/dualcanvas3', routes.home)
router.get('/dualcanvas3/style.css', routes.getCss)
router.get('/dualcanvas3/script.js', routes.getJs)
router.get('/dualcanvas3/nlib-fabric.js', routes.getFabricJs)

const init_routes = (svr) => {
    svr.route('/dev/fabricjs', router);
};

module.exports.init_routes = exports.init_routes = init_routes;
