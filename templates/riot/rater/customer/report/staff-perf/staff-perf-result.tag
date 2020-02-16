<staff-perf-result>
    <div class="tabs">
        <date-result caption="Date" begin="{ current.begin }" end="{ current.end }"></date-result>
        <virtial if={ current.slides && current.slides.length > 0 }>
            <virtial each={ slide in current.slides }>
                <staff-perf-question-slide slide="{ slide }"></staff-perf-question-slide>
            </virtial>
        </virtial>
        <div class="input-block center">
            <button onclick="{ goback }">Close</button>
        </div>
        <br>
    </div>
    <div class="tool">
        <button class="float-button save" onclick="{ save }"><span class="fas fa-save"></span></button>
        <button class="float-button cancel" onclick="{ cancel }"><span class="fas fa-times"></span></button>
    </div>
    <style>
        :scope {
            display: block;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            /* overflow: hidden; */
            background-color: whitesmoke;
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
        :scope .input-block button {
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            width: 50%;
            font-size: 1rem;
            font-size: bold;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'staff-perf-manage';
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
                if (result && result[lang.langId]) {
                    self.current = result[lang.langId]
                    //console.log(self.current)
                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;
                
                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;
            /*
            //search_opts.langId = lang.langId; // set langId
            $.ajax({
                type: "POST",
                url: "/customer/api/report/votesummaries/search",
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
            */
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

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        //#endregion

        this.goback = () => {
            shown = false;
            events.raise(events.name.StaffPerfSearch)
        }

        this.setup = (criteria) => {
            //console.log('criteria:', criteria)
            search_opts = criteria;
            shown = true;
            refresh();
        }
    </script>
</staff-perf-result>