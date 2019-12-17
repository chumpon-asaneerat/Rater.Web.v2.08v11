<admin-home>
    <h3>{ content.title }</h3>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            /* overflow: hidden; */
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'admin-home';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Admin Home Page.'
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
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent(); 
            }
        }
        let onScreenChanged = (e) => { 
            let scrId = screens.current.screenId;      
            if (screenId === scrId) {
                updatecontent();
            }
        }

        //#endregion
    </script>
</admin-home>