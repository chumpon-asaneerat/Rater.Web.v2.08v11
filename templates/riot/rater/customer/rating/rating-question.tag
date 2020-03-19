<rating-question>
    <h2>{ (content) ? content.title : 'Today Question' }</h2>
    <a href="/rating">Home</a>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'rating-question';
        let defaultContent = {
            title: 'Today Question.'
        };
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion
        
        //#region events bind/unbind

        let bindEvents = () => {
            //addEvt(events.name.LanguageChanged, onLanguageChanged)
            //addEvt(events.name.ContentChanged, onContentChanged)
            //addEvt(events.name.ScreenChanged, onScreenChanged)
        }
        let unbindEvents = () => {
            //delEvt(events.name.ScreenChanged, onScreenChanged)
            //delEvt(events.name.ContentChanged, onContentChanged)
            //delEvt(events.name.LanguageChanged, onLanguageChanged)
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

        //let onContentChanged = (e) => { updatecontent(); }
        //let onLanguageChanged = (e) => { updatecontent(); }
        //let onScreenChanged = (e) => { updatecontent(); }

        //#endregion
    </script>
</rating-question>
