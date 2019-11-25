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
    static GetMemberTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetMemberTypes(params);
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
                let map = ret[rec.langId].map(c => c.memberTypeId);
                let idx = map.indexOf(rec.memberTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { memberTypeId: rec.memberTypeId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Description = rec.MemberTypeDescription;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetLimitUnits(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetLimitUnits(params);
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
                let map = ret[rec.langId].map(c => c.limitUnitId);
                let idx = map.indexOf(rec.limitUnitId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { limitUnitId: rec.limitUnitId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Description = rec.LimitUnitDescription;
                nobj.Text = rec.LimitUnitText;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetPeriodUnits(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetPeriodUnits(params);
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
                let map = ret[rec.langId].map(c => c.periodUnitId);
                let idx = map.indexOf(rec.periodUnitId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { periodUnitId: rec.periodUnitId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Description = rec.PeriodUnitDescription;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetDeviceTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.langId = null; // force langId to null;
        params.deviceTypeId = null;

        let fn = async () => {
            return db.GetDeviceTypes(params);
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
            /*
            if (!records) {
                console.log('detected null record.');
            }
            */
            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.deviceTypeId);
                let idx = map.indexOf(rec.deviceTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { deviceTypeId: rec.deviceTypeId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Type = rec.Type;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetLicenseTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;

        let fn = async () => {
            return db.GetLicenseTypes(params);
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
                let map = ret[rec.langId].map(c => c.licenseTypeId);
                let idx = map.indexOf(rec.licenseTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { licenseTypeId: rec.licenseTypeId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.type = rec.Type;
                nobj.Description = rec.LicenseTypeDescription;
                nobj.AdText = rec.AdText;
                nobj.periodUnitId = rec.periodUnitId;
                nobj.NoOfUnit = rec.NoOfUnit;
                nobj.UseDefaultPrice = rec.UseDefaultPrice;
                nobj.Price = rec.Price;
                nobj.CurrencySymbol = rec.CurrencySymbol;
                nobj.CurrencyText = rec.CurrencyText;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetLicenseFeatures(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.langId = null; // force langId to null;
        params.licenseTypeId = null;

        let fn = async () => {
            return db.GetLicenseFeatures(params);
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
                let map = ret[rec.langId].map(c => c.licenseTypeId);
                let idx = map.indexOf(rec.licenseTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { licenseTypeId: rec.licenseTypeId }
                    nobj.items = [];
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }

                let seqs = nobj.items.map(item => item.seq);
                let idx2 = seqs.indexOf(rec.seq);
                let nobj2;
                if (idx2 === -1) {
                    nobj2 = {
                        seq: rec.seq
                    }
                    nobj.items.push(nobj2);
                }
                else {
                    nobj2 = seqs[idx2];
                }                
                nobj2.limitUnitId = rec.limitUnitId;
                nobj2.NoOfLimit = rec.NoOfLimit;
                nobj2.UnitDescription = rec.LimitUnitDescription;
                nobj2.UnitText = rec.LimitUnitText;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
}

router.all('/membertypes', routes.GetMemberTypes)
router.all('/limitunits', routes.GetLimitUnits)
router.all('/periodunits', routes.GetPeriodUnits)
router.all('/devicetypes', routes.GetDeviceTypes)
router.all('/licensetypes', routes.GetLicenseTypes)
router.all('/licensefeatures', routes.GetLicenseFeatures)

const init_routes = (svr) => {
    svr.route('/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;