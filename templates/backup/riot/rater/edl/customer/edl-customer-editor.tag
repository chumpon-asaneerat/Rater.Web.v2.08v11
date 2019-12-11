<edl-customer-editor>
    <div class="entry">
        <div class="tab">
            <button ref="tabheader" class="tablinks active" name="default" onclick="{ showContent }">
                <span class="fas fa-cog"></span>&nbsp;{ content.entry.tabDefault }&nbsp;
            </button>
            <button ref="tabheader" class="tablinks" name="miltilang" onclick="{ showContent }">
                <span class="fas fa-globe-americas"></span>&nbsp;{ content.entry.tabMultiLang }&nbsp;
            </button>
        </div>
        <div ref="tabcontent" name="default" class="tabcontent" style="display: block;">
            <edl-customer-entry ref="EN" langId=""></edl-customer-entry>
        </div>
        <div ref="tabcontent" name="miltilang" class="tabcontent">
            <virtual if={ lang.languages }>
                <virtual each={ item in lang.languages }>
                    <virtual if={ item.langId !== 'EN' }>
                        <div class="panel-header" langId="{ item.langId }">
                            &nbsp;&nbsp;
                            <span class="flag-css flag-icon flag-icon-{ item.flagId.toLowerCase() }"></span>
                            &nbsp;{ item.Description }&nbsp;
                        </div>
                        <div class="panel-body" langId="{ item.langId }">
                            <edl-customer-entry ref="{ item.langId }" langId="{ item.langId }"></edl-customer-entry>
                        </div>
                    </virtual>
                </virtual>
            </virtual>
        </div>
    </div>
    <div class="tool">
        <button onclick="{ save }"><span class="fas fa-save"></span></button>
        <button onclick="{ cancel }"><span class="fas fa-times"></span></button>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            max-width: 800px;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 30px;
            grid-template-areas: 
                'entry'
                'tool';
            overflow: hidden;
            background-color: white;
        }
        :scope .entry {
            grid-area: entry;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            /* background-color: antiquewhite; */
            overflow: auto;
        }
        :scope .entry .tab {
            overflow: hidden;
            border: 1px solid #ccc;
            /* background-color: #f1f1f1; */
        }
        :scope .entry .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
        }
        :scope .entry .tab button:hover {
            background-color: #ddd;
        }
        :scope .entry .tab button.active { background-color: #ccc; }
        :scope .entry .tabcontent {
            display: none;
            padding: 3px;
            width: 100%;
            /* height: calc(100% - 50px); */
            max-width: 100%;
            /* max-height: calc(100% - 50px); */
            overflow: auto;
        }
        :scope .entry .tabcontent .panel-header {
            margin: 0 auto;
            padding: 0;
            padding-top: 3px;
            width: 100%;
            height: 30px;
            color: white;
            background: cornflowerblue;
            border-radius: 5px 5px 0 0;
        }
        :scope .entry .tabcontent .panel-body {
            margin: 0 auto;
            margin-bottom: 5px;
            padding: 0;
            width: 100%;
            border: 1px solid cornflowerblue;
        }
        :scope .tool {
            grid-area: tool;
            margin: 0 auto;            
            padding: 0;
            padding-left: 3px;
            padding-top: 3px;
            width: 100%;
            height: 30px;
            /* background-color: sandybrown; */
            overflow: hidden;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'edl-customer-manage';

        let branchId = '';
        let ctrls = [];

        //#endregion

        //#region content variables and methods
        
        let defaultContent = {
            entry: { 
                tabDefault: 'Default',
                tabMultiLang: 'Languages'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let tabHeaders = [];
        let tabContents = [];

        let initCtrls = () => {
            let headers = self.refs['tabheader'];
            tabHeaders.push(...headers)
            let contents = self.refs['tabcontent'];
            tabContents.push(...contents)
        }
        let freeCtrls = () => {
            tabHeaders = [];
            tabContents = [];
        }

        //#endregion

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        //#endregion

        //#region dom event handlers

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        //#endregion

        //#region tab control methods and inline handler

        let clearActiveTabs = () => {
            if (tabHeaders) {
                // Get all elements with class="tabcontent" and hide them
                for (let i = 0; i < tabHeaders.length; i++) {
                    tabHeaders[i].className = tabHeaders[i].className.replace(" active", "");
                }
            }
        }
        let hideContents = () => {
            if (tabContents) {
                // Get all elements with class="tabcontent" and hide them
                for (let i = 0; i < tabContents.length; i++) {
                    tabContents[i].style.display = "none";                    
                }
            }
        }        
        let getContent = (name) => {
            let ret;
            if (tabContents) {
                for (let i = 0; i < tabContents.length; i++) {
                    let attr = tabContents[i].attributes['name'];
                    let aName = attr.value;
                    let vName = name;
                    if (aName === vName) {
                        ret = tabContents[i];
                        break;
                    }
                }
            }
            return ret;
        }
        let getHeader = (name) => {
            let ret;
            if (tabHeaders) {
                for (let i = 0; i < tabHeaders.length; i++) {
                    let attr = tabHeaders[i].attributes['name'];
                    let aName = attr.value;
                    let vName = name;
                    if (aName === vName) {
                        ret = tabHeaders[i];
                        break;
                    }
                }
            }
            return ret;
        }
        this.showContent = (evt) => {
            let target = evt.target;
            let name = target.attributes['name'].value;

            hideContents();
            clearActiveTabs();
            // Show the current tab, and add an "active" class to the button that opened the tab
            let currHeader = getHeader(name);
            let currContent = getContent(name);
            if (currContent) {
                currContent.style.display = "block";
            }
            if (currHeader) {
                currHeader.className += " active";
            }
        }

        //#endregion

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        this.save = (e) => {
            let item;
            let items = [];
            ctrls.forEach(oRef => {
                item = (oRef.entry) ? oRef.entry.getItem() : null;
                if (item) {
                    item.langId = oRef.langId;
                    items.push(item)
                }
            });
            customermanager.save(items);
            events.raise(events.name.EndEditCustomer)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditCustomer)
        }

        //#region public methods

        this.setup = (item) => {
            let isNew = false;
            //console.log('setup:', item)
            customerId = item.customerId;
            if (customerId === undefined || customerId === null || customerId.trim() === '') {
                isNew = true;
            }
            ctrls = [];
            
            let loader = window.customermanager;

            lang.languages.forEach(lg => {
                let ctrl = self.refs[lg.langId];
                let original = (isNew) ? clone(item) : loader.find(lg.langId, customerId);
                //console.log('find ori:' ,original)
                if (ctrl) {
                    let obj = {
                        langId: lg.langId,
                        entry: ctrl,
                        scrObj: original
                    }
                    ctrl.setup(original);
                    ctrls.push(obj)
                }
            });
        }

        //#endregion
    </script>
</edl-customer-editor>
