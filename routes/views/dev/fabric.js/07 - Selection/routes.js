//#region common requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];

// for production
const nlibPath = path.join(rootPath, 'nlib');
// for nlib-server dev project
//const nlibPath = path.join(rootPath, 'src', 'server', 'js', 'nlib');
const nlibjs = path.join(nlibPath, 'nlib');
const nlib = require(nlibjs);

const nlibExprjs = path.join(nlibPath, 'nlib-express');

const WebServer = require(nlibExprjs);

//#endregion

//#region router type and variables

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

router.get('/selection', routes.home)
router.get('/selection/style.css', routes.getCss)
router.get('/selection/script.js', routes.getJs)
router.get('/selection/nlib-fabric.js', routes.getFabricJs)

const init_routes = (svr) => {
    svr.route('/dev/fabricjs', router);
};

module.exports.init_routes = exports.init_routes = init_routes;
