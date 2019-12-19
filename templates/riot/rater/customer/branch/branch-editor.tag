<branch-editor>
    <div class="entry">
        <tabcontrol class="tabs" content={ opts.content }>
            <tabheaders content={ opts.content }>
                <tabheader for="default" content={ opts.content }>
                    <span class="fas fa-cog"></span>
                    { opts.content.entry.tabDefault }
                </tabheader>
                <tabheader for="miltilang" content={ opts.content }>
                    <span class="fas fa-globe-americas"></span>
                    { opts.content.entry.tabMultiLang }
                </tabheader>
            </tabheaders>
            <tabpages>
                <tabpage name="default">
                    <branch-entry ref="EN" langId=""></branch-entry>
                </tabpage>
                <tabpage name="miltilang">
                    <virtual if={ lang.languages }>
                        <virtual each={ item in lang.languages }>
                            <virtual if={ item.langId !== 'EN' }>
                                <div class="panel-header" langId="{ item.langId }">
                                    &nbsp;&nbsp;
                                    <span class="flag-css flag-icon flag-icon-{ item.flagId.toLowerCase() }"></span>
                                    &nbsp;{ item.Description }&nbsp;
                                </div>
                                <div class="panel-body" langId="{ item.langId }">
                                    <branch-entry ref="{ item.langId }" langId="{ item.langId }"></branch-entry>
                                </div>
                            </virtual>
                        </virtual>
                    </virtual>
                </tabpage>
            </tabpages>
        </tabcontrol>
        <div class="tool">
            <button class="float-button save" onclick="{ save }"><span class="fas fa-save"></span></button>
            <button class="float-button cancel" onclick="{ cancel }"><span class="fas fa-times"></span></button>
        </div>
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
            grid-template-rows: 1fr;
            grid-template-areas: 
                'entry';
            background-color: white;
            overflow: hidden;
        }
        :scope>.entry {
            grid-area: entry;
            display: grid;
            grid-template-columns: 1fr auto 5px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'tabs tool .';
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        :scope>.entry .tabs {
            grid-area: tabs;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        :scope>.entry .tool {
            grid-area: tool;
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
                '. .'
                'btn-cancel .'
                'btn-save .';
            margin: 0 auto;
            margin-left: 3px;
            padding: 0;
            width: 100%;
            height: 100%;
            /* background-color: sandybrown; */
            overflow: hidden;
        }
        :scope>.entry .tool .float-button {
            margin: 0 auto;
            padding: 0;
            border: none;
            outline: none;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            color: whitesmoke;
            background: silver;
            cursor: pointer;
        }
        :scope>.entry .tool .float-button:hover {
            color: whitesmoke;
            background: forestgreen;
        }
        :scope>.entry .tool .float-button.save {
            grid-area: btn-save;
        }
        :scope>.entry .tool .float-button.cancel {
            grid-area: btn-cancel;
        }
        :scope .panel-header {
            margin: 0 auto;
            padding: 0;
            padding-top: 3px;
            width: 100%;
            height: 30px;
            color: white;
            background: cornflowerblue;
            border-radius: 5px 5px 0 0;
        }
        :scope .panel-body {
            margin: 0 auto;
            margin-bottom: 5px;
            padding: 2px;
            width: 100%;
            border: 1px solid cornflowerblue;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'branch-manage';

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
        opts.content = this.content; // update 2019-12-19

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content; // update 2019-12-19
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => { }
        let freeCtrls = () => { }

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
            branchmanager.save(items);
            events.raise(events.name.EndEditBranch)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditBranch)
        }

        //#region public methods

        // update 2019-12-19
        findCtrl = (langId) => {
            let ctrl;
            let tabpages = self.tags['tabcontrol'].tags['tabpages'].tags['tabpage'];
            for (let i = 0; i < tabpages.length; i++) {
                let tp = tabpages[i];
                ctrl = tp.refs[langId];
                if (ctrl) break;
            }
            return ctrl;
        }

        this.setup = (item) => {
            let isNew = false;
            branchId = item.branchId;
            if (branchId === undefined || branchId === null || branchId.trim() === '') {
                isNew = true;
            }
            ctrls = [];
            
            let loader = window.branchmanager;

            lang.languages.forEach(lg => {
                let ctrl = findCtrl(lg.langId) // update 2019-12-19
                let original = (isNew) ? clone(item) : loader.find(lg.langId, branchId);
                
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
</branch-editor>