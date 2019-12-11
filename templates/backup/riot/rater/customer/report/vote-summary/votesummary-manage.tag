<votesummary-manage>
    <flip-screen ref="flipper">
        <yield to="viewer">
            <votesummary-search ref="viewer" class="view"></votesummary-search>
        </yield>
        <yield to="entry">
            <votesummary-result ref="entry" class="entry"></votesummary-result>
        </yield>
    </flip-screen>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        .view, .entry {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            /* max-width: 100%; */
            /* max-height: calc(100vh - 62px); */
            overflow: auto;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Vote Summary'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        //#endregion

        //#region controls variables and methods

        let flipper, view, entry;
        let initCtrls = () => {
            //console.log('device manage refs:', self.refs)
            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
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
            addEvt(events.name.VoteSummarySearch, onShowSearch)
            addEvt(events.name.VoteSummaryResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.VoteSummaryResult, onShowResult)
            delEvt(events.name.VoteSummarySearch, onShowSearch)
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
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }
            
        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

        //#endregion
    </script>
</votesummary-manage>
