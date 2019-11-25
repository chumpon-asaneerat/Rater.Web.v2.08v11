
//#region Master Data Loader and Service classes

class MemberTypesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.updateCurrent();
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/membertypes';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.updateCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {        
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    updateCurrent() {
        this.current = this.getCurrent();
        // raise event
        events.raise(events.name.MemberTypeListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class PeriodUnitsLoader {
    constructor() {
        this.content = null;
        this.current = null
        let self = this;
        let contentChanged = (e) => {
            self.updateCurrent();
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/periodunits';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.updateCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    updateCurrent() {
        this.current = this.getCurrent();
        // raise event
        events.raise(events.name.PeriodUnitListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class LimitUnitsLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.updateCurrent();
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/limitunits';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.updateCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    updateCurrent() {
        this.current = this.getCurrent();
        // raise event
        events.raise(events.name.LimitUnitListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class DeviceTypesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.updateCurrent();
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/devicetypes';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.updateCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        return ret;
    }
    updateCurrent() {
        this.current = this.getCurrent();
        // raise event
        events.raise(events.name.DeviceTypeListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class LicenseTypesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.updateCurrent();
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/licensetypes';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.updateCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    updateCurrent() {
        this.current = this.getCurrent();
        // raise event
        events.raise(events.name.LicenseFeatureListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class LicenseFeaturesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.updateCurrent();
        }
        document.addEventListener(events.name.LanguageChanged, contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/licensefeatures';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.updateCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    updateCurrent() {
        this.current = this.getCurrent();
        // raise event
        events.raise(events.name.LicenseFeatureListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}
class MasterService {
    constructor() {
        this.membertypes = new MemberTypesLoader();
        this.periodunits = new PeriodUnitsLoader();
        this.limitunits = new LimitUnitsLoader();
        this.devicetypes = new DeviceTypesLoader();
        this.licesetypes = new LicenseTypesLoader();
        this.licensefeatures = new LicenseFeaturesLoader();
    }
    /*
    load() {
        this.membertypes.load()
        this.periodunits.load()
        this.limitunits.load()
        this.devicetypes.load()
        this.licesetypes.load()
        this.licensefeatures.load()
    }
    */
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

;(function () {
    //console.log('Init content service...');
    window.master = window.master || new MasterService();
    //master.load();
})();

//#endregion


