//#region EventService class

class EventService {
    constructor() {
        this.name = {}
    }
    raise(eventName, data) {
        // Raise event.
        let evt;
        if (data) {
            evt = new CustomEvent(eventName, { detail: { data: data } });
        }
        else {
            evt = new CustomEvent(eventName);
        }
        document.dispatchEvent(evt);
    }
}

//console.log('Init event service...');
window.events = window.events || new EventService();

//#endregion

//#region avaliable events name for app.

/** app language changed. */
window.events.name.LanguageChanged = 'app:language:change';
/** app contents changed. */
window.events.name.ContentChanged = 'app:contents:changed';
/** app screen changed. */
window.events.name.ScreenChanged = 'app:screen:change';

/** Show OSD. */
window.events.name.ShowOsd = 'app:osd:show';
/** Update OSD. */
window.events.name.UpdateOsd = 'app:osd:update';
/** Hide OSD. */
window.events.name.HideOsd = 'app:osd:hide';

/** Secure: Client User SignIn User List Changed. */
window.events.name.UserListChanged = 'app:secure:user:list:changed';
/** Secure: Client User SignIn Failed. */
window.events.name.UserSignInFailed = 'app:secure:user:signin:failed';

/** Master: Member Type List Changed. */
window.events.name.MemberTypeListChanged = 'app:master:membertype:list:changed';
/** Master: Device Type List Changed. */
window.events.name.DeviceTypeListChanged = 'app:master:devicetype:list:changed';
/** Master: Period Unit List Changed. */
window.events.name.PeriodUnitListChanged = 'app:master:periodunit:list:changed';
/** Master: Limit Unit List Changed. */
window.events.name.LimitUnitListChanged = 'app:master:limitunit:list:changed';
/** Master: License Type List Changed. */
window.events.name.LicenseTypeListChanged = 'app:master:licensetype:list:changed';
/** Master: License Feature List Changed. */
window.events.name.LicenseFeatureListChanged = 'app:master:licensefeature:list:changed';

/** Datasource: Customer. */
window.events.name.CustomerListChanged = 'app:datasource:customer:list:changed';
window.events.name.BeginEditCustomer = 'app:datasource:customer:begin:edit';
window.events.name.DeleteCustomer = 'app:datasource:customer:delete';
window.events.name.EndEditCustomer = 'app:datasource:customer:end:edit';

/** Datasource: Device. */
window.events.name.DeviceListChanged = 'app:datasource:device:list:changed';
window.events.name.BeginEditDevice = 'app:datasource:device:begin:edit';
window.events.name.DeleteDevice = 'app:datasource:device:delete';
window.events.name.EndEditDevice = 'app:datasource:device:end:edit';

/** Datasource: Branch. */
window.events.name.BranchListChanged = 'app:datasource:branch:list:changed';
window.events.name.BeginEditBranch = 'app:datasource:branch:begin:edit';
window.events.name.DeleteBranch = 'app:datasource:branch:delete';
window.events.name.EndEditBranch = 'app:datasource:branch:end:edit';

/** Datasource: Org. */
window.events.name.OrgListChanged = 'app:datasource:org:list:changed';
window.events.name.BeginEditOrg = 'app:datasource:org:begin:edit';
window.events.name.DeleteOrg = 'app:datasource:org:delete';
window.events.name.EndEditOrg = 'app:datasource:org:end:edit';

/** Datasource: Member. */
window.events.name.MemberListChanged = 'app:datasource:member:list:changed';
window.events.name.BeginEditMember = 'app:datasource:member:begin:edit';
window.events.name.DeleteMember = 'app:datasource:member:delete';
window.events.name.EndEditMember = 'app:datasource:member:end:edit';

/** Reports. */
window.events.name.VoteSummarySearch = 'app:report:votesummary:search';
window.events.name.VoteSummaryResult = 'app:report:votesummary:result';

window.events.name.PieSummarySearch = 'app:report:piesummary:search';
window.events.name.PieSummaryResult = 'app:report:piesummary:result';

window.events.name.BarSummarySearch = 'app:report:barsummary:search';
window.events.name.BarSummaryResult = 'app:report:barsummary:result';

window.events.name.RawVoteSearch = 'app:report:rawvote:search';
window.events.name.RawVoteResult = 'app:report:rawvotemary:result';

window.events.name.StaffCompareSearch = 'app:report:staffcompare:search';
window.events.name.StaffCompareResult = 'app:report:staffcompare:result';

window.events.name.StaffPerfSearch = 'app:report:staffperf:search';
window.events.name.StaffPerfResult = 'app:report:staffperf:result';

//#endregion

//#region DbApi class

class DbApi {
    static parse(r) {        
        let ret = { records: null, errors: null, out: null };
        if (r && r.result) {
            //console.log(r.result)
            ret.records = r.result.data;
            ret.out = r.result.out;
            ret.errors = r.result.errors;
        }
        return ret;
    }
}

const api = DbApi; // create shortcur variable.

//#endregion

//#region LocalStorage class

class LocalStorage {
    constructor() {
        this._name = ''
        this._data = null
        this._ttl = 0;
    };
    //-- public methods.
    checkExist() {
        if (!this.data) {
            this.data = this.getDefault();
            this.save();
        }
    };
    getDefault() { return {} };
    save() {
        if (!this._name) return; // no name specificed.
        let ttl = (this._ttl) ? this._ttl : 0;
        nlib.storage.set(this._name, this._data, { TTL: ttl }); // 1 days.
    };
    load() {
        if (!this._name) return; // no name specificed.
        let ttl = (this._ttl) ? this._ttl : 0;
        this._data = nlib.storage.get(this._name);
    };
    //-- public properties.
    get name() { return this._name; };
    set name(value) { this._name = value; };
    get data() { return this._data; };
    set data(value) { this._data = value; };
    get ttl() { return this._ttl; };
    set ttl(value) { this._ttl = value; };
};

//#endregion

//#region UserPerference class

class UserPerference extends LocalStorage {
    constructor() {
        super();
        this.name = 'uperf'
        this.ttl = 0;
        this._prefchanged = null;
        this.load();
        this.checkExist();
    };
    //-- public methods.
    getDefault() { return { langId: 'EN' } };
    load() { super.load(); };
    save() { super.save(); };
    //-- public properties.
    get langId() {
        if (!this.data) this.checkExist();
        return this.data.langId;
    };
    set langId(value) {
        if (!this.data) this.checkExist();
        this.data.langId = value;
    };
};

//#endregion

//#region LanguageService class

class LanguageService {
    constructor() {
        this.pref = new UserPerference();
        this.pref.load(); // load once.
        this.languages = [];
        this.langId = LanguageService.defaultId;
        this.current = LanguageService.defaultLang;
        this.loaded = false;
    }
    getLanguages() {
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.languages = (data && data.records) ? data.records : [];
            self.change(self.pref.langId, true); // set langId from preference.
            self.loaded = true;
        }
        XHR.get('/api/languages/search', { enable: true }, fn);
    }
    change(langId, forced) {
        let newId = (langId) ? langId.toUpperCase() : LanguageService.defaultId;
        if (this.langId != newId || forced) {
            this.langId = newId;
            let ids = this.languages.map(lang => lang.langId);
            let idx = ids.indexOf(newId);
            this.current = (idx === -1) ? LanguageService.defaultLang : this.languages[idx];
            // keep langid to storage.
            this.pref.langId = this.current.langId;
            this.pref.save();
            // Raise event.
            events.raise(events.name.LanguageChanged);
        }
    }
    static get defaultId() { return 'EN' }
    static get defaultLang() { 
        return {
            Description: "English",
            Enabled: true,
            SortOrder: 1,
            flagId: "US",
            langId: "EN"
        } 
    }
}

; (function () {
    //console.log('Init language service...');
    window.lang = window.lang || new LanguageService();
    lang.getLanguages();
})();

//#endregion

//#region OSDService class

class OSDService {
    constructor() {
        this.handle = null;
        this.shown = false;
        this.lastUpdate = new Date();
        /** timeout in millisecond. */
        this.timeout = 5000;
    }
    get elapse() { return new Date() - this.lastUpdate; }
    show() {
        let self = this;        
        if (!this.shown) {
            this.lastUpdate = new Date();
            this.shown = true;
            // raise message
            events.raise(events.name.ShowOsd);
            this.handle = setInterval(() => {
                if (self.elapse > self.timeout) self.hide()
            }, 100);
        }
        // not show so show osd
        events.raise(events.name.ShowOsd)
    }
    info(message) {
        this.lastUpdate = new Date();
        if (!this.shown) this.show();
        // raise message
        events.raise(events.name.UpdateOsd, { msg: message, type: 'info' })
    }
    warn(message) {
        this.lastUpdate = new Date();
        if (!this.shown) this.show();
        // raise message
        events.raise(events.name.UpdateOsd, { msg: message, type: 'warn' })
    }
    err(message) {
        this.lastUpdate = new Date();
        if (!this.shown) this.show();
        // raise message
        events.raise(events.name.UpdateOsd, { msg: message, type: 'error' })
    }
    hide() {
        if (this.shown) {
            //console.log('OSD hide.')
            clearInterval(this.handle);
        }
        this.lastUpdate = new Date();
        this.handle = null;
        this.shown = false;
        // raise message
        events.raise(events.name.HideOsd)
    }
}

; (function () {
    window.osd = window.osd || new OSDService()
})()

//#endregion

//#region ContentService class

class ContentService {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
            // Raise event.
            events.raise(events.name.ContentChanged);
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load(url, paramObj) {
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
            // Raise event.
            events.raise(events.name.ContentChanged);

        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}
; (function () {
    //console.log('Init content service...');
    window.contents = window.contents || new ContentService();
    let href = window.location.href;
    if (href.endsWith('#')) href = window.location.href.replace('#', '');
    if (!href.endsWith('/')) href = href + '/';
    let url = href.replace('#', '') + 'contents';
    contents.load(url); // load contents.
})();

//#endregion

//#region ScreenService class

class ScreenService {
    constructor() {
        this.current = {
            screenId: ''
        };
    }
    show(screenId) {
        if (this.current.screenId !== screenId) {
            // change screen id.
            this.current.screenId = screenId;
            // Raise event.
            events.raise(events.name.ScreenChanged);
        }
    }
}
; (function () {
    //console.log('Init screen service...');
    window.screens = window.screens || new ScreenService();
})();

//#endregion

//#region SecureService class

class SecureService {
    constructor() {
        this.content = null;
        this.account = { username: '', password: ''}
    }
    reset() {
        this.content = null;
        this.account = { username: '', password: ''}
    }
    /*
    register(customername, username, pwd, licenseTypeId) {
        let url = '/api/customer/register'
        let paramObj = { 
            customerName: customername,
            userName: username,
            passWord: pwd,
            licenseTypeId: licenseTypeId
        }
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            // raise event.
            let evt;
            if (data.errors.hasError) {
                evt = new CustomEvent('registerfailed');
            }
            else {
                evt = new CustomEvent('registersuccess');
            }
            document.dispatchEvent(evt);
        }
        XHR.postJson(url, paramObj, fn);
    }
    */
    verifyUsers(username, pwd) {
        let url = '/api/customer/validate-accounts'
        this.account = { username: username, password: pwd}

        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            // Raise event.
            events.raise(events.name.UserListChanged);
        }
        XHR.postJson(url, this.account, fn);
    }
    signin(customerId) {
        let url = '/api/customer/signin'
        let paramObj = {
            customerId: customerId,
            userName: this.account.username,
            passWord: this.account.password
        }
        //console.log('Sign In:', paramObj);
        let fn = (r) => {
            let data = api.parse(r);
            let err = data.errors;
            if (err && err.hasError) {
                // Raise event.
                events.raise(events.name.UserSignInFailed, { error: err });
            }
            else {
                //console.log('Sign In Success.');
                nlib.nav.gotoUrl('/', true);
            }            
        }
        XHR.postJson(url, paramObj, fn);
    }
    signout() {
        let url = '/api/customer/signout'
        let fn = (r) => {
            //console.log(r);
            //console.log('sign out detected.');
            nlib.nav.gotoUrl('/', true);
        }
        XHR.postJson(url, this.account, fn);
    }
    nav(url) {
        nlib.nav.gotoUrl(url);
    }
    /*
    postUrl(url) {
        if (!url || url.length <= 0) return;
        let fn = (r) => {
            let data = api.parse(r);
            let evt = new CustomEvent('posturlcompleted', { detail: { data: data }});
            document.dispatchEvent(evt);
        }
        XHR.postJson(url, this.account, fn);
    }
    */
    get users() {
        let ret = []
        if (this.content) {
            let usrs = (this.content[lang.langId]) ? this.content[lang.langId] : (this.content['EN']) ? this.content['EN'] : [];
            ret = usrs;
        }
        return ret;
    }
}

window.secure = window.secure || new SecureService();

//#endregion

