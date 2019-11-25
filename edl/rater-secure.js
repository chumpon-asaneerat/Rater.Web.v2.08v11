//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));
const WebServer = require(path.join(rootPath, 'nlib', 'nlib-express'));

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

//#region Cookies and Urls

const secureNames = {
    deviceId: 'deviceId',
    accessId: 'accessId'
}
const hasValue = (obj, name) => {
    let ret = false;
    ret = (obj && obj[name] !== undefined && obj[name] !== null);
    return ret;
}
const getValue = (obj, name) =>{
    let ret = '';
    ret = (hasValue(obj, name)) ? obj[name] : null;
    ret = (ret) ? ret : '';
    return ret;
}
const getFullUrl = (req) => {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}
const getRoutePath = (req) => {
    let url = getFullUrl(req);
    let rootUrl = req.protocol + '://' + req.get('host');
    let ret = url.replace(rootUrl, '');
    //console.log('Full Url:', url);
    //console.log('Path only:', ret);
    return ret;
}
const isStartsWith = (src, sPath) => {
    let lsrc = src.toLowerCase();
    if (lsrc.charAt(0) === '/') lsrc = lsrc.substring(1); // remove slash
    let lpath = sPath.toLowerCase();
    if (lpath.charAt(0) === '/') lpath = lpath.substring(1); // remove slash
    let ret = lsrc.startsWith(lpath);
    return ret;
}
const isHome = (url) => {
    let lsrc = url.toLowerCase();
    if (lsrc.charAt(0) === '/') lsrc = lsrc.substring(1); // remove slash
    let ret = (lsrc.length === 0);
    return ret;
}
const isAdmin = (url) => { return isStartsWith(url, 'customer/admin'); }
const isExcuisive = (url) => { return isStartsWith(url, 'customer/exclusive'); }
const isStaff = (url) => { return isStartsWith(url, 'customer/staff'); }
const isEDLAdmin = (url) => { return isStartsWith(url, 'edl/admin'); }
const isEDLSupervisor = (url) => { return isStartsWith(url, 'edl/supervisor'); }
const isEDLStaff = (url) => { return isStartsWith(url, 'edl/staff'); }
/*
const isAdminAPI = (url) => { return isStartsWith(url, 'customer/api/admin'); }
const isExclusiveAPI = (url) => { return isStartsWith(url, 'customer/api/exclusive'); }
const isStaffAPI = (url) => { return isStartsWith(url, 'customer/api/staff'); }
const isEDLAdminAPI = (url) => { return isStartsWith(url, 'edl/api/admin'); }
const isEDLSupervisorAPI = (url) => { return isStartsWith(url, 'edl/api/supervisor'); }
const isEDLStaffAPI = (url) => { return isStartsWith(url, 'edl/api/staff'); }
*/
const gotoHome = (req, res, next, url) => {
    if (!isHome(url)) res.redirect('/')
    else {
        if (next) next()
    }
}
const gotoAdmin = (req, res, next, url) => {
    if (!isAdmin(url)) {
        res.redirect('/customer/admin')
    }
    else {
        if (next) next()
    }
}
const gotoExcuisive = (req, res, next, url) => {
    if (!isExcuisive(url)) {
        res.redirect('/customer/exclusive')
    }
    else {
        if (next) next()
    }
}
const gotoStaff = (req, res, next, url) => {
    if (!isStaff(url)) {
        res.redirect('/customer/staff')
    }
    else {
        if (next) next()
    }
}
const gotoEDLAdmin = (req, res, next, url) => {
    if (!isEDLAdmin(url)) {
        res.redirect('/edl/admin')
    }
    else {
        if (next) next()
    }
}
const gotoEDLSupervisor = (req, res, next, url) => {
    if (!isEDLSupervisor(url)) {
        res.redirect('/edl/supervisor')
    }
    else {
        if (next) next()
    }
}
const gotoEDLStaff = (req, res, next, url) => {
    if (!isEDLStaff(url)) {
        res.redirect('/edl/staff')
    }
    else {
        if (next) next()
    }
}
// for redirect and permission for routes
const homeurls = [
    { code:   0, redirect: gotoHome },
    { code: 200, redirect: gotoAdmin },
    { code: 210, redirect: gotoExcuisive },
    { code: 280, redirect: gotoStaff },
    //{ code: 290, redirect: gotoDevice }, // not implements.
    { code: 100, redirect: gotoEDLAdmin },
    { code: 110, redirect: gotoEDLSupervisor },
    { code: 180, redirect: gotoEDLStaff }
]
const goHome = (memberType) => {
    let map = homeurls.map(urlObj => urlObj.code )
    let idx = map.indexOf(memberType);
    let ret = homeurls[0].redirect; // default to root page.
    if (idx !== -1) {
        ret = homeurls[idx].redirect;
    }
    return ret;
}
const checkRedirect = (req, res, next) => {
    let url = getRoutePath(req);
    let secure = (res.locals.rater) ? res.locals.rater.secure : null;
    let mtype = 0;
    if (secure && 
        secure.memberType !== undefined && secure.memberType !== null) {
        mtype = secure.memberType;            
    }
    // auto redirct if not match home url.
    let fn = goHome(mtype);
    fn(req, res, next, url);
}
// for api permission
const sendNoPermission = (req, res) => {
    let ret = nlib.NResult.error(-800, 'No Permission to access api(s).');
    WebServer.sendJson(req, res, ret);
}
const processPermission = (req, res, next, allow) => {
    if (allow) {
        if (next) next();
    }
    else {
        sendNoPermission(req, res);
    }
}
const checkAdminPermission = (req, res, next) => {
    let url = getRoutePath(req);
    let ret = isAdminAPI(url)
    if (ret) {
        // route valid.
        let memberType = getMemberType(req, res);
        ret = (memberType === 200);
    }
    processPermission(req, res, next, ret);
}
const checkExclusivePermission = (req, res, next) => {
    let url = getRoutePath(req);
    let ret = isExclusiveAPI(url)
    if (ret) {
        // route valid.
        let memberType = getMemberType(req, res);
        ret = (memberType === 210);
    }
    processPermission(req, res, next, ret);
}
const checkStaffPermission = (req, res, next) => {
    let url = getRoutePath(req);
    let ret = isStaffAPI(url)
    if (ret) {
        // route valid.
        let memberType = getMemberType(req, res);
        ret = (memberType === 280);
    }
    processPermission(req, res, next, ret);
}
const checkEDLAdminPermission = (req, res, next) => {
    let url = getRoutePath(req);
    let ret = isEDLAdminAPI(url)
    if (ret) {
        // route valid.
        let memberType = getMemberType(req, res);
        ret = (memberType === 100);
    }
    processPermission(req, res, next, ret);
}
const checkEDLSupervisorPermission = (req, res, next) => {
    let url = getRoutePath(req);
    let ret = isEDLSupervisorAPI(url)
    if (ret) {
        // route valid.
        let memberType = getMemberType(req, res);
        ret = (memberType === 110);
    }
    processPermission(req, res, next, ret);
}
const checkEDLStaffPermission = (req, res, next) => {
    let url = getRoutePath(req);
    let ret = isEDLStaffAPI(url)
    if (ret) {
        // route valid.
        let memberType = getMemberType(req, res);
        ret = (memberType === 180);
    }
    processPermission(req, res, next, ret);
}
// cookie/db sync
const getRater = (req, res) => {
    return (res.locals.rater) ? res.locals.rater : null;
}
const getSecure = (req, res) => {
    let rater = getRater(req, res)
    return (rater) ? rater.secure : null;
}
const getAccessId = (req, res) => {
    let secure = getSecure(req, res);
    let ret = (secure) ? secure.accessId : null;
    return ret;
}
const getCustomerId = (req, res) => {
    let secure = getSecure(req, res);
    let ret = (secure) ? secure.customerId : null;
    return ret;
}
const getMemberId = (req, res) => {
    let secure = getSecure(req, res);
    let ret = (secure) ? secure.memberId : null;
    return ret;
}
const getDeviceId = (req, res) => {
    let secure = getSecure(req, res);
    let ret = (secure) ? secure.deviceId : null;
    return ret;
}
const getMemberType = (req, res) => {
    let secure = getSecure(req, res);
    let ret = (secure) ? secure.memberType : 0;
    return ret;
}
const updateSecureObj = (req, res, obj) => {
    if (!res.locals.rater) {
        // setup value for access in all routes.        
        res.locals.rater = {
            secure : {
                accessId: '',
                deviceId: '',
                customerId: '',
                memberId: '',
                memberType: 0,
                IsEdlUser: false
            }
        }
    }
    let rater = res.locals.rater;
    if (obj) {
        rater.secure.accessId = obj.AccessId;
        rater.secure.deviceId = ''; // this value exist only on device screen.
        rater.secure.customerId = obj.CustomerId;
        rater.secure.memberId = obj.MemberId;
        rater.secure.memberType = obj.MemberType;
        rater.secure.IsEdlUser = obj.IsEDLUser
    }
}

//#endregion

//#region RaterSecure class

class RaterSecure {
    //#region middleware methods

    static checkAccess(req, res, next) {
        let obj = WebServer.signedCookie.readObject(req, res);
        //rater.secure.deviceId = getValue(obj, secureNames.deviceId)
        let db = new sqldb();
        let params = { 
            accessId: obj.accessId
        };
        let fn = async () => {
            return db.CheckAccess(params);
        }
        exec(db, fn).then(result => {
            if (!result.errors.hasError && result.data && result.data.length > 0) {
                let row = result.data[0];
                updateSecureObj(req, res, row);
            }
            if (next) next();
        });
    }
    static checkRedirect(req, res, next) {
        // check redirect.
        checkRedirect(req, res, next);
    }

    static checkAdminPermission(req, res, next) {
        checkAdminPermission(req, res ,next);
    }
    static checkExclusivePermission(req, res, next) {
        checkExclusivePermission(req, res ,next);
    }
    static checkStaffPermission(req, res, next) {
        checkStaffPermission(req, res ,next);
    }
    static checkEDLAdminPermission(req, res, next) {
        checkEDLAdminPermission(req, res ,next);
    }
    static checkEDLSupervisorPermission(req, res, next) {
        checkEDLSupervisorPermission(req, res ,next);
    }
    static checkEDLStaffPermission(req, res, next) {
        checkEDLStaffPermission(req, res ,next);
    }
    static getAccessId(req, res) { return getAccessId(req, res) }
    static getCustomerId(req, res) { return getCustomerId(req, res) }
    static getDeviceId(req, res) { return getDeviceId(req, res) }
    static getMemberId(req, res) { return getMemberId(req, res) }
    static getMemberType(req, res) { return getMemberType(req, res) }
    static signout(req, res) {
        let obj = WebServer.signedCookie.readObject(req, res);
        //rater.secure.deviceId = getValue(obj, secureNames.deviceId)
        let db = new sqldb();
        let params = { 
            accessId: obj.accessId
        };
        let fn = async () => {
            return db.SignOut(params);
        }
        exec(db, fn).then(result => {
            obj.accessId = ''; // cannot assigned null;
            WebServer.signedCookie.writeObject(req, res, obj, WebServer.expires.in(5).years);
            WebServer.sendJson(req, res, result);
        });
    }

    //#endregion
}

//#endregion

module.exports.RaterSecure = exports.RaterSecure = RaterSecure;