<staff-compare-search>
    <div class="input-block center">
        <span>Staff Compare.</span>
    </div>
    <div class="input-block center">
        <nselect ref="ctrlQSets" title="Question set"></nselect>
    </div>
    <div class="input-block center">
        <ninput ref="ctrlBegin" type="date" title="Begin Date"></ninput>
        <ninput ref="ctrlEnd" type="date" title="End Date"></ninput>
    </div>
    <div class="input-block center">
        <ncheckedtree ref="ctrlQuesTree" title="Question" class="tree"></ncheckedtree>
    </div>
    <div class="input-block center">
        <ntree ref="ctrlOrgTree" title="Organization" class="tree"></ntree>
    </div>
    <div class="input-block center">
        <ncheckedtree ref="ctrlMemberTree" title="Staff" class="tree"></ncheckedtree>
    </div>
    <div class="input-block center">
        <button onclick="{ onseach }">Search</button>
    </div>
    <br>
    <style>
        :scope {
            display: block;
            margin: 0;
            padding: 5px;
            width: 100%;
            height: 100%;
            /* overflow: hidden; */
        }
        :scope .input-block {
            display: block;
            margin: 0;
            margin-top: 10px;
            padding: 0;
            width: 100%;
            max-width: 800px;
            text-align: center;
        }
        :scope .input-block.center {
            margin: auto;
            margin-top: 10px;
        }
        :scope .input-block span,
        :scope .input-block button {
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            width: 50%;
            font-size: 1rem;
            font-size: bold;
        }
        :scope .input-block span.label {
            margin: 1px;
            padding: 2px;
            text-align: left;
            color: cornflowerblue;
            width: 100%;
        }
        :scope .input-block span input {
            margin: 1px;
            padding: 2px;
            text-align: left;
            color: cornflowerblue;
            width: 100%;
        }
        :scope .input-block .tree {
            text-align: left;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'staff-compare-manage';
        let qsetModel;
        let quesModel;
        let orgModel;
        let memModel;

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        //#endregion

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();
                updateOrgs();
                self.update();
            }
        }

        //#region QSet Methods

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();
                //console.log('QSet selected:', qsetid)
                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value(); // remember

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);
                
                ctrlQSets.value(lastValue); // restore
            }
        }
        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {
                        //console.log(ret);
                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        //#endregion

        //#region Question Methods

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }
        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValues = ctrlQuesTree.selectedItems(); // remember
                //console.log('last selected values:', lastValues)

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;
                //console.log('slides:', values)
                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);
                
                ctrlQuesTree.selectedItems(lastValues); // restore
            }
        }
        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {
                        //console.log('Load Questions:', ret);
                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        //#endregion

        //#region Org Methods

        let clearOrgs = () => {
            if (ctrlOrgTree) {
                ctrlOrgTree.clear();
            }
        }
        let updateOrgs = () => {
            if (ctrlOrgTree && orgModel) {
                let lastValue = ctrlOrgTree.selectedItem(); // remember
                //console.log('last selected value:', lastValue)
                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);                
                //ctrlOrgTree.selectedItem(lastValue); // restore
            }
        }

        let loadOrgs = (qsetid) => {
            let criteria = { }
            if (ctrlOrgTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/org/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {
                        //console.log('Load Orgs:', ret);
                        orgModel = ret.data;
                        updateOrgs();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        //#endregion

        //#region Member Methods

        let clearMembers = () => {
            if (ctrlMemberTree) {
                ctrlMemberTree.clear();
            }
        }
        let updateMembers = () => {
            if (ctrlMemberTree && memModel) {
                let lastValues = ctrlMemberTree.selectedItems(); // remember
                //console.log('last selected values:', lastValues)
                let values = memModel[lang.langId];

                let fldmap = { valueField: 'memberId', textField: 'FullName', parentField: null }
                ctrlMemberTree.setup(values, fldmap);                
                ctrlMemberTree.selectedItems(lastValues); // restore
            }
        }
        let loadMembers = (criteria) => {
            if (ctrlMemberTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/filter/vote-members",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {
                        //console.log('Load Members:', ret);
                        memModel = ret.data;
                        updateMembers();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        //#endregion

        //#region controls variables and methods

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            if (ctrlQuesTree) {
                ctrlQuesTree.onSelectItems(reloadMembers)
            }
            ctrlOrgTree = self.refs['ctrlOrgTree']
            if (ctrlOrgTree) {
                ctrlOrgTree.onSelectItem(reloadMembers)
            }
            ctrlMemberTree = self.refs['ctrlMemberTree']
            loadQSets();
            //loadQuestions();
            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlMemberTree = null;
            if (ctrlOrgTree) {
                ctrlOrgTree.onSelectItem(null)
            }
            ctrlOrgTree = null;
            if (ctrlQuesTree) {
                ctrlQuesTree.onSelectItems(null)
            }
            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
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
        let reloadMembers = () => {
            let orgId = ctrlOrgTree.selectedItem()

            let filter = {}
            filter.qsetId = ctrlQSets.value()
            filter.beginDate = String(ctrlBegin.value());
            filter.endDate = String(ctrlEnd.value());
            filter.orgId = orgId

            //console.log(filter)
            loadMembers(filter)
        }

        //#endregion

        this.onseach = () => {
            let qsetid = ctrlQSets.value();
            let beginDT = String(ctrlBegin.value());
            let endDT = String(ctrlEnd.value());
            //console.log('Begin:', String(beginDT))
            //console.log('End:', String(endDT))
            let slides = [];
            let quesmap = ctrlQuesTree.selectedItems().map(item => item.id );
            quesmap.forEach(quesId => {
                slides.push({ qSeq: quesId })
            });
            let orgid = ctrlOrgTree.selectedItem();
            let members = []
            let memmap = ctrlMemberTree.selectedItems().map(item => item.id );
            memmap.forEach(memId => {
                members.push({ memberId: memId })
            });

            let criteria = {
                qsetId: qsetid,
                beginDate: beginDT,
                endDate: endDT,
                slides: slides,
                orgId: orgid,
                members: members
            }
            //console.log(criteria)

            events.raise(events.name.StaffCompareResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
    </script>
</staff-compare-search>