<norgtree>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
        }
    </style>
    <script>
        let self = this;

        let updatecontent = () => {
            self.update();
        }

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            //addEvt(events.name.LanguageChanged, onLanguageChanged)
            //addEvt(events.name.ContentChanged, onContentChanged)
        }
        let unbindEvents = () => {
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

        //#region public methods

        this.refresh = () => {
            updatecontent()
        }
        
        //#endregion
    </script>
</norgtree>