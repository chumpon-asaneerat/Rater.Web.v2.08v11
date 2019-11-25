//#region Customer Manager

class CustomerManager {
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
        let url = '/customer/api/customer/search';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            //console.log(self.content)
            self.updateCurrent();
        }
        XHR.postJson(url, paramObj, fn);
    }
    save(items) {
        let self = this;
        let url = '/customer/api/customer/save';
        //console.log('save:', items)
        let paramObj = {
            items: items
        };
        let fn = (r) => {
            let results = [];
            for (let i = 0; i < r.result.length; i++) {
                //let data = api.parse(r.result[i]);
                let data = {
                    records: r.result[i].data,
                    out: r.result[i].out,
                    errors: r.result[i].errors
                }
                results.push(data)
            }
            self.load();
        }
        XHR.postJson(url, paramObj, fn);
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
        events.raise(events.name.CustomerListChanged)
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
    find(langId, customerId) {
        let ret = null;
        if (this.current) {
            //console.log('current:', this.content)
            let items = this.content[langId];
            //console.log('items:', items)
            if (items) {                
                let maps = items.map(item => item.customerId);
                let idx = maps.indexOf(customerId);
                ret = (idx !== -1) ? items[idx] : null;
            }
        }
        return ret;
    }
}

;(function () {
    window.customermanager = window.customermanager || new CustomerManager();
    window.customermanager.load();
})();

//#endregion
