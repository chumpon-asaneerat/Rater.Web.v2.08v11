<rating-org>
    <h2>{ (content) ? content.title : 'Device Organization Setup' }</h2>
    <nselect ref="orgNames" title="{ content.entry.orgName }"></nselect>
    <a href="/rating">Home</a>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'rating-org';
        let defaultContent = {
            title: 'Device Organization Setup',
            entry: {
                orgName: 'Organization'
            }
        };
        this.content = defaultContent;
        opts.content = this.content;

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

        let orgs = null;

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
                    orgs = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        
        let orgId = '';

        let updateOrgList = () => {
            // update org names by language id.
            if (orgNames) {
                // get exists value
                if (orgNames) {
                    orgId = orgNames.value();
                }

                if (orgs && orgs[lang.langId]) {
                    let org = orgs[lang.langId]
                    // load lookup.
                    if (orgNames) {
                        orgNames.setup(org, { valueField:'orgId', textField:'OrgName' });
                        if (orgId) {
                            orgNames.value(orgId);
                        }
                    }
                }
            }
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
    </script>
</rating-org>