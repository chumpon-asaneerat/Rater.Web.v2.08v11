<pie-votesummary-search>
    <div ref="container" class="scrarea">
        <div ref="tool" class="toolarea">
            <button class="float-button" onclick="{ onseach }">
                <span class="fas fa-search">&nbsp;</span>
            </button>
            <button class="float-button" onclick="{ onhome }">
                <span class="fas fa-home">&nbsp;</span>
            </button>
        </div>
        <div ref="search" class="searcharea">
            <div class="input-block center">
                <span>{ (content) ? content.title : '' }</span>
            </div>
            <div class="input-block center">
                <nselect ref="ctrlQSets" title="{ (content && content.labels) ? content.labels.questionSet : 'Question Set' }"></nselect>
            </div>
            <div class="input-block center">
                <ninput ref="ctrlBegin" type="date" title="{ (content && content.labels) ? content.labels.beginDate : 'Begin Date' }"></ninput>
                <ninput ref="ctrlEnd" type="date" title="{ (content && content.labels) ? content.labels.endDate : 'End Date' }"></ninput>
            </div>
            <div class="input-block center">
                <ncheckedtree ref="ctrlQuesTree" title="{ (content && content.labels) ? content.labels.question : 'Question' }" class="tree"></ncheckedtree>
            </div>
            <div class="input-block center">
                <ncheckedtree ref="ctrlOrgTree" title="{ (content && content.labels) ? content.labels.organization : 'Organization' }" class="tree"></ncheckedtree>
            </div>
            <br>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
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
            display: grid;
            grid-template-columns: 5px auto 1fr;
            grid-template-rows: 1fr;
            grid-template-areas:
                '. toolarea searcharea';
            margin: 0 auto;
            padding: 0;
            margin-top: 3px;
            width: 100%;
            max-width: 800px;
            height: 100%;
        }
        :scope>.scrarea>.toolarea {
            grid-area: toolarea;
            margin: 0 auto;
            margin-right: 5px;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope>.scrarea>.toolarea .float-button {
            display: block;
            margin: 0 auto;
            margin-bottom: 5px;
            padding: 3px;
            padding-right: 1px;
            height: 40px;
            width: 40px;
            color: whitesmoke;
            background: silver;
            border: none;
            outline: none;
            border-radius: 50%;
            cursor: pointer;
        }
        :scope>.scrarea>.toolarea .float-button:hover {
            color: whitesmoke;
            background: forestgreen;
        }
        :scope>.scrarea>.searcharea {
            grid-area: searcharea;
            margin: 0 auto;
            padding: 0;
            height: 100%;
            width: 100%;
        }
        :scope>.scrarea>.searcharea .input-block {
            display: block;
            margin: 0;
            margin-top: 10px;
            padding: 0;
            width: 100%;
            max-width: 800px;
            text-align: center;
        }
        :scope>.scrarea>.searcharea .input-block.center {
            margin: auto;
            margin-top: 10px;
        }
        :scope>.scrarea>.searcharea .input-block span,
        :scope>.scrarea>.searcharea .input-block button {
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            width: 50%;
            font-size: 1rem;
            font-size: bold;
        }
        :scope>.scrarea>.searcharea .input-block span.label {
            margin: 1px;
            padding: 2px;
            text-align: left;
            color: cornflowerblue;
            width: 100%;
        }
        :scope>.scrarea>.searcharea .input-block span input {
            margin: 1px;
            padding: 2px;
            text-align: left;
            color: cornflowerblue;
            width: 100%;
        }
        :scope>.scrarea>.searcharea .input-block .tree {
            text-align: left;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'pie-votesummary-manage';
        let qsetModel;
        let quesModel;
        let orgModel;

        let defaultContent = {
            title: 'Pie chart vote summary.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
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
                let lastValues = ctrlOrgTree.selectedItems(); // remember
                //console.log('last selected values:', lastValues)

                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);
                
                ctrlOrgTree.selectedItems(lastValues); // restore
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

        //#region controls variables and methods

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            ctrlOrgTree = self.refs['ctrlOrgTree']
            loadQSets();
            //loadQuestions();
            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlOrgTree = null;
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
            let orgs = []
            let orgmap = ctrlOrgTree.selectedItems().map(item => item.id );
            orgmap.forEach(orgId => {
                orgs.push({ orgId: orgId })
            });

            let criteria = {
                qsetId: qsetid,
                beginDate: beginDT,
                endDate: endDT,
                slides: slides,
                orgs: orgs
            }
            //console.log(criteria)

            events.raise(events.name.PieSummaryResult, criteria)
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
</pie-votesummary-search>