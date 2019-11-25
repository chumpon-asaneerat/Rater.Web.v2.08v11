//#region common requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlibPath = path.join(rootPath, 'nlib');
const nlibjs = path.join(nlibPath, 'nlib');
const nlib = require(nlibjs);

const nlibExprjs = path.join(nlibPath, 'nlib-express');
const WebServer = require(nlibExprjs);
const WebRouter = WebServer.WebRouter;

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));

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

class RaterWebDb {
    //#region Languages

    GetLanguages(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.enabled = true;
        let fn = () => db.GetLanguages(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLanguage(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLanguage(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    EnableLanguage(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.EnableLanguage(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    DisableLanguage(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.DisableLanguage(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Error Messages

    GetErrorMsg(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.enabled = true;
        let fn = () => db.GetErrorMsg(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    GetErrorMsgs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.enabled = true;
        let fn = () => db.GetErrorMsgs(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveErrorMsg(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.enabled = true;
        let fn = () => db.SaveErrorMsg(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveErrorMsgML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.enabled = true;
        let fn = () => db.SaveErrorMsgML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region PeriodUnits

    GetPeriodUnits(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        params.enabled = true;
        let fn = () => db.GetPeriodUnits(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SavePeriodUnit(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SavePeriodUnit(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SavePeriodUnitML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SavePeriodUnitML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region LimitUnits

    GetLimitUnits(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        params.enabled = true;
        let fn = () => db.GetLimitUnits(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLimitUnit(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLimitUnit(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLimitUnitML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLimitUnitML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region MemberTypes

    GetMemberTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        params.enabled = true;
        let fn = () => db.GetMemberTypes(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveMemberType(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveMemberType(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveMemberTypeML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveMemberTypeML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region DeviceTypes

    GetDeviceTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        params.enabled = true;
        let fn = () => db.GetDeviceTypes(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region LicenseTypes

    GetLicenseTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetLicenseTypes(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLicenseType(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLicenseType(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLicenseTypeML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLicenseTypeML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region LicenseFeatures

    GetLicenseFeatures(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetLicenseFeatures(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLicenseFeature(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLicenseFeature(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region License

    GetLicenses(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetLicenses(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Customer Histories/License History (save/revoke/extend)

    GetCustomerHistories(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetCustomerHistories(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveLicenseHistory(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveLicenseHistory(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    RevokeLicense(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.RevokeLicense(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    ExtendLicense(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.ExtendLicense(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region UserInfos

    GetUserInfos(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetUserInfos(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveUserInfo(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveUserInfo(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveUserInfoML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveUserInfoML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Customers

    GetCustomers(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetCustomers(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveCustomer(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveCustomer(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveCustomerML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveCustomerML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    DeleteCustomer(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.DeleteCustomer(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region MemberInfos

    GetMemberInfos(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetMemberInfos(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveMemberInfo(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveMemberInfo(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveMemberInfoML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveMemberInfoML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Branchs

    GetBranchs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetBranchs(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveBranch(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveBranch(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveBranchML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveBranchML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Orgs

    GetOrgs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetOrgs(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveOrg(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveOrg(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveOrgML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveOrgML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Devices

    GetDevices(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetDevices(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveDevice(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveDevice(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveDeviceML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveDeviceML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region QSet

    GetQSets(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetQSets(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveQSet(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveQSet(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveQSetML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveQSetML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region QSlide

    GetQSlides(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetQSlides(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveQSlide(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveQSlide(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveQSlideML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveQSlideML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region QSlideItem

    GetQSlideItems(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        //params.langId = ????
        let fn = () => db.GetQSlideItems(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveQSlideItem(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveQSlideItem(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SaveQSlideItemML(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveQSlideItemML(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Reports

    SaveVote(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SaveVote(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    GetRawVotes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.GetRawVotes(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    GetVoteSummaries(req, res) {
        let db = new sqldb();
        let params = WebServer.SaveVote(req).data;
        let fn = () => db.GetVoteSummaries(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Register/SignIn/SignOut

    Register(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.Register(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SignIn(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SignIn(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    SignOut(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.SignOut(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Check Access (account/device/license)

    GetAccessUser(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.GetAccessUser(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    CheckUsers(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.CheckUsers(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    CheckAccess(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.CheckAccess(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    CheckLicense(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.CheckLicense(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion

    //#region Utils (GetRandomCode)

    GetRandomCode(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = () => db.GetRandomCode(params);
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }

    //#endregion
}

const webdb = new RaterWebDb();

module.exports = exports = webdb;
