<rating-org>
    <div ref="container" class="scrarea">
        <div class="title">{ (content) ? content.title : 'Device Organization Setup' }</div>
        <div class="current-org">{ content.entry.currentOrg }: { (register) ? '( ' + register.orgName + ' )' : '-' }</div>
        <nselect ref="orgNames" title="{ content.entry.orgName }"></nselect>
        <br/>
        <div class="toolbars">
            <button class="float-button" onclick="{ gohome }">
                <span class="fas fa-home">&nbsp;</span>
            </button>
            <button class="float-button" onclick="{ save }">
                <span class="fas fa-save">&nbsp;</span>
            </button>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 20px 1fr 20px;
            grid-template-areas:
                '.'
                'scrarea'
                '.'
        }
        :scope>.scrarea {
            grid-area: scrarea;
            margin: 0 auto;
            padding: 0;
            height: 100%;
            width: 100%;
            max-width: 800px;
        }
        :scope>.scrarea>.title {
            display: block;
            margin: 0 auto;
            color: cornflowerblue;
            text-align: center;
            font-size: 1.5em;
            width: 100%;
            height: auto;
        }
        :scope>.scrarea>.current-org {
            display: block;
            margin: 0 auto;
            color: red;
            text-align: center;
            font-size: 0.8em;
            width: 100%;
            height: auto;
        }
        :scope>.scrarea>.toolbars {
            display: block;
            margin: 0 auto;
            margin-right: 5px;
            width: 100%;
            height: auto;
            text-align: center;
            overflow: hidden;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope>.scrarea>.toolbars .float-button {
            display: inline-block;
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
        :scope>.scrarea>.toolbars .float-button:hover {
            color: whitesmoke;
            background: forestgreen;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'rating-org';
        let defaultContent = {
            title: 'Device Organization Setup',
            entry: {
                orgName: 'Organization',
                currentOrg: 'Current Organization'
            }
        };
        this.content = defaultContent;
        opts.content = this.content;
        this.register = {
            orgId: '',
            orgName: ''
        }

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updateOrgList();
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let orgNames;

        let initCtrls = () => {
            orgNames = self.refs['orgNames']
            getOrgs();
        }
        let freeCtrls = () => {
            orgNames = null
        }

        let orgId = '';
        let orgML = null;
        let orgs = null;

        let getRegisterOrgList = (callback) => {
            let opt = {}
            $.ajax({
                type: "POST",
                url: "/customer/api/rating/org/search",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {
                    //console.log(ret);
                    if (ret.data && ret.data.length > 0) {
                        self.register.orgId = ret.data[0].orgId;
                    }
                    if (callback) callback()
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let getOrgs = () => {
            let opt = {}
            $.ajax({
                type: "POST",
                url: "/customer/api/org/search",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {
                    //console.log(ret);
                    orgML = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let updateOrgList = () => {
            // update org names by language id.
            if (orgNames) {
                // get exists value
                let val = orgNames.value();
                orgId = (val) ? val : self.register.orgId;
                if (orgML && orgML[lang.langId]) {
                    orgs = orgML[lang.langId]
                    // load lookup.
                    orgNames.setup(orgs, { valueField:'orgId', textField:'OrgName' });
                    if (orgId) {
                        orgNames.value(orgId);
                    }
                    // update register org
                    if (!self.register.orgId) {
                        getRegisterOrgList(updateRegisterOrg)
                    }
                    else {
                        updateRegisterOrg()
                    }
                }
            }
        }
        let updateRegisterOrg = () => {
            // update register org name.
            if (orgs) {
                if (self.register.orgId) {
                    let om = orgs.map(org => org.orgId)
                    let idx = om.indexOf(self.register.orgId)
                    self.register.orgName = (idx !== -1) ? orgs[idx].OrgName  : '';
                }

                if (orgNames) {
                    let val = orgNames.value()
                    if (val !== self.register.orgId) {
                        orgNames.value(self.register.orgId);
                    }
                }
            }
            self.update();
        }

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
    
        this.save = () => {
            let selectedId = (orgNames) ? orgNames.value() : null;
            let opt = {
                orgId: selectedId
            }
            $.ajax({
                type: "POST",
                url: "/customer/api/rating/org/save",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {
                    //console.log(ret);
                    console.log('save success')
                    //self.gohome()
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        this.gohome = () => {
            let url = '/rating';
            secure.nav(url)
        }
    </script>
</rating-org>