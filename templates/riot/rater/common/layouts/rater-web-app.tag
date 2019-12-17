<rater-web-app>
    <napp>
        <navibar>
            <navi-item>
                <div class="banner">
                    <div class="caption">My Choice Rater Web{ (content && content.title) ? '&nbsp;-&nbsp;' : '&nbsp;'}</div>
                    <div class="title ">{ (content && content.title) ? content.title : '' }</div>
                </div>
            </navi-item>
            <navi-item class="center"></navi-item>
            <navi-item class="right"><language-menu></language-menu></navi-item>
            <navi-item class="right"><links-menu></links-menu></navi-item>
        </navibar>
        <yield/>
        <statusbar></statusbar>
    </napp>    
    <style>
        :scope {
            position: relative;
            display: block;
            margin: 0;
            padding: 0;
            width: auto;            
            height: auto;
            overflow: hidden;
        }
        .banner .title {
            margin: 0;
            padding: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.2rem;
        }
        .banner .caption {
            margin: 0;
            padding: 0;
            width: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.2rem;
        }
        @media only screen and (max-width: 700px) {
            .banner .caption {
                width: 0;
                visibility: hidden;
            }
        }
        language-menu {
            display: flex;
            margin: 0 auto;
            padding: 0;
            align-items: center;
            justify-content: stretch;
        }
        links-menu {
            display: flex;
            margin: 0 auto;
            padding: 0;
            align-items: center;
            justify-content: stretch;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        this.content = {
            title: ''
        }
        this.hasContent = () => { return (this.content !== undefined && this.content != null) }

        //#endregion

        //#region content variables and methods

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : { title: '' };
            self.update();
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

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region dom event handlers

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        //#endregion
    </script>
</rater-web-app>