<page-footer>
    <p class="caption">
        { content.status }
    </p>
    <p class="status" ref="l1"></p>
    <p class="copyright">
        &nbsp;&copy; 
        { content.copyright }
        &nbsp;&nbsp;
    </p>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            display: grid;
            grid-template-columns: fit-content(50px) 1fr fit-content(150px);
            grid-template-rows: 1fr;
            grid-template-areas: 
                'caption status copyright';
            font-size: 0.7em;
            font-weight: bold;
            background: darkorange;
            color: whitesmoke;
        }
        .caption {
            grid-area: caption;
            margin: 0 auto;
            padding: 0;
            /* padding-top: 2px; */
            padding-left: 3px;
            user-select: none;
        }
        .status {
            grid-area: status;
            margin: 0 auto;
            padding: 0;
            /* padding-top: 2px; */
            user-select: none;
        }
        .copyright {
            grid-area: copyright;
            margin: 0 auto;
            padding: 0;
            /* padding-top: 2px; */
            user-select: none;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        this.content = { status: '', copyright: '' }

        //#endregion

        //#region content variables and methods

        let updatecontent = () => {
            if (contents.current && contents.current.footer) {
                self.content = contents.current.footer;
                self.update();
            }
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
        }
        let unbindEvents = () => {
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region dom event handlers

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }

        //#endregion
    </script>
</page-footer>