<language-menu>
    <div class="menu">
        <a ref="flags" class="flag-combo" href="javascript:;">
            <span class="flag-css flag-icon flag-icon-{ lang.current.flagId.toLowerCase() }" ref="css-icon"></span>
            <div class="flag-text">&nbsp;{ lang.langId }&nbsp;</div>
            <virtual if={ isMultiple() }>
                <span class="drop-synbol fas fa-caret-down"></span>
            </virtual>
        </a>
    </div>
    <div ref="dropItems" class="language-dropbox">
        <div each={ item in lang.languages }>
            <a class="flag-item { (lang.langId === item.langId) ? 'selected' : '' }" href="javascript:;" onclick="{ selectItem }">
                &nbsp;
                <span class="flag-css flag-icon flag-icon-{ item.flagId.toLowerCase() }" ref="css-icon"></span>
                &nbsp;
                <div class="flag-text">{ item.Description }</div>
                &nbsp;&nbsp;&nbsp;
            </a>                
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0, 2px;
            user-select: none;
        }
        .menu {
            margin: 0 auto;
            padding: 0;
        }
        a {
            margin: 0 auto;
            color: whitesmoke;            
        }
        a:link, a:visited { text-decoration: none; }
        a:hover, a:active {
            color: yellow;
            text-decoration: none;
        }
        .flag-combo {
            margin: 0 auto;
        }
        .flag-combo .flag-css {
            margin: 0px auto;
            padding-top: 1px;
            display: inline-block;            
        }
        .flag-combo .flag-text {
            margin: 0 auto;
            display: inline-block;
        }
        .flag-combo .drop-symbol {
            margin: 0 auto;
            display: inline-block;
        }
        .flag-item {
            margin: 0px auto;
            padding: 2px;
            padding-left: 5px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .flag-item:hover {
            color: yellow;
            background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%);
            background-color:#77a809;
            cursor: pointer;
        }
        .flag-item.selected {
            background-color: darkorange;
        }
        .flag-item .flag-css {
            margin: 0px auto;
            padding-top: 1px;
            width: 25px;
            display: inline-block;
        }
        .flag-item .flag-text {
            margin: 0 auto;
            min-width: 80px;
            max-width: 120px;
            display: inline-block;            
        }
        .language-dropbox {
            display: inline-block;
            position: fixed;
            margin: 0 auto;
            padding: 1px;
            top: 45px;
            right: 5px;
            background-color: #333;
            color:whitesmoke;
            max-height: calc(100vh - 50px - 20px);
            overflow: hidden;
            overflow-y: auto;
            display: none;
        }
        .language-dropbox.show {
            display: inline-block;
            z-index: 99999;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;

        //#endregion

        //#region content variables and methods

        let updatecontent = () => {
            self.update();
        }

        //#endregion

        //#region controls variables and methods

        let flags, dropItems;
        let initCtrls = () => {
            flags = self.refs['flags'];
            dropItems = self.refs['dropItems'];
        }
        let freeCtrls = () => {
            dropItems = null;
            flags = null;
        }

        this.isMultiple = () => { 
            return lang && lang.languages && lang.languages.length > 1
        }

        //#endregion

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            flags.addEventListener('click', toggle);
            window.addEventListener('click', checkClickPosition);
        }
        let unbindEvents = () => {
            window.removeEventListener('click', checkClickPosition);
            flags.removeEventListener('click', toggle);
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

        let onLanguageChanged = (e) => { updatecontent(); }

        //#endregion

        //#region local inline event handlers

        this.selectItem = (e) => {
            toggle(); // toggle off
            let selLang = e.item.item;
            lang.change(selLang.langId);

            e.preventDefault();
            e.stopPropagation();
        }

        //#endregion

        //#region private methods

        let toggle = () => {
            dropItems.classList.toggle('show');
            updatecontent();
        }
        let isInClassList = (elem, classList) => {
            let len = classList.length;
            let found = false;
            for (let i = 0; i < len; i++) {
                if (elem.matches(classList[i])) {
                    found = true;
                    break;
                }
            }
            return found;
        }
        let checkClickPosition = (e) => {
            // Close the dropdown menu if the user clicks outside of it
            let classList = ['.flag-combo', '.flag-css', '.flag-text', '.drop-synbol'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }

        //#endregion
    </script>
</language-menu>