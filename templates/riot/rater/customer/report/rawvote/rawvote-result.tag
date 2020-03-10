<rawvote-result>
    <div class="result">
        <div class="tabs">
            <date-result caption="{ (content && content.labels) ? content.labels.date : 'Date' }" begin="{ current.begin }" end="{ current.end }"></date-result>
            <virtial if={ current.slides && current.slides.length > 0 }>
                <virtial each={ slide in current.slides }>
                    <rawvote-question-slide slide="{ slide }"></rawvote-question-slide>
                </virtial>
            </virtial>
        </div>
        <div class="tool">
            <button class="float-button" onclick="{ goback }">
                <span class="fas fa-times"></span>
            </button>
            <button class="float-button" onclick="{ onhome }">
                <span class="fas fa-home"></span>
            </button>
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
                'result'
                '.';
            background-color: whitesmoke;
            /* overflow: hidden; */
        }
        :scope>.result {
            grid-area: result;
            display: grid;
            grid-template-columns: 1fr auto 5px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'tabs tool .';
            margin: 0 auto;
            padding: 0;
            width: 100%;
            /* max-width: 800px; */
            height: 100%;
        }
        :scope>.result .tabs {
            grid-area: tabs;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope>.result .tool {
            grid-area: tool;
            margin: 0 auto;
            margin-right: 5px;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope>.result .tool .float-button {
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
        :scope>.result .tool .float-button:hover {
            color: whitesmoke;
            background: forestgreen;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'rawvote-manage';
        let shown = false;
        let result = null;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        //#endregion

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                //console.log(result)
                if (result) {
                    self.current = result[lang.langId];
                    //console.log(self.current)
                }
                if (!self.current) self.current = {
                    begin: '',
                    end: '',
                    slides: []
                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;
            //search_opts.langId = lang.langId; // set langId
            $.ajax({
                type: "POST",
                url: "/customer/api/report/rawvotes/search",
                data: JSON.stringify(search_opts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {
                    //console.log(ret);
                    result = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }

        //#region controls variables and methods

        let initCtrls = () => {}
        let freeCtrls = () => {}

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

        /*
        let onContentChanged = (e) => { refresh(); }
        let onLanguageChanged = (e) => { }
        let onScreenChanged = (e) => { }
        */
        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { refresh(); }
        let onScreenChanged = (e) => { updatecontent(); }

        //#endregion

        this.goback = () => {
            shown = false;
            events.raise(events.name.RawVoteSearch)
        }

        this.setup = (criteria) => {
            //console.log('criteria:', criteria)
            search_opts = criteria;
            shown = true;
            refresh();
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
</rawvote-result>