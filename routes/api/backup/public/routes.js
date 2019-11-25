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
     * getJson
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static getJson(req, res) {
        let data = {
            name: 'Joe',
            value: Date.now()
        }
        let ret = nlib.NResult.data(data);
        WebServer.sendJson(req, res, ret);
    }
    /**
     * postJson
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static postJson(req, res) {
        let data = {
            greating: 'Welcome ' + req.body.name,
            value: Date.now()
        }
        let ret = nlib.NResult.data(data);
        WebServer.sendJson(req, res, ret);
    }
}

router.get('/getJson', routes.getJson)
router.post('/postJson', routes.postJson)

const init_routes = (svr) => {
    svr.route('/api', router);
};

module.exports.init_routes = exports.init_routes = init_routes;