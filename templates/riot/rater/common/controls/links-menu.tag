<links-menu class="{ (menus && menus.length > 0) ? '' : 'hide' }">
    <div class="menu">
        <a ref="links" class="link-combo" href="javascript:;">
            <span ref="showlinks" class="burger fas fa-bars"></span>
        </a>
    </div>
    <div ref="dropItems" class="links-dropbox">
        <div each={ item in menus }>
            <virtual if={ isShown(item) }>
                <a class="link-item" href="javascript:;" onclick="{ selectItem }">
                    &nbsp;
                    <span class="link-css { item.icon }" ref="css-icon">&nbsp;</span>
                    <div class="link-text">&nbsp;{ item.text }</div>
                    &nbsp;&nbsp;&nbsp;
                </a>
            </virtual>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0 3px;
            user-select: none;
            width: 40px;
        }
        :scope.hide {
            display: none;
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
        .link-combo {
            margin: 0 auto;
        }
        .link-item {
            margin: 0px auto;
            padding: 2px;
            padding-left: 5px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .link-item:hover {
            color: yellow;
            background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%);
            background-color:#77a809;
            cursor: pointer;
        }
        .link-item.selected {
            background-color: darkorange;
        }
        .link-item .link-css {
            margin: 0px auto;
            /* padding-top: 1px; */
            width: 25px;
            display: inline-block;
        }
        .link-item .link-text {
            margin: 0 auto;
            min-width: 80px;
            max-width: 125px;
            display: inline-block;
        }
        .links-dropbox {
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
        .links-dropbox.show {
            display: inline-block;
            z-index: 99999;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;

        //#endregion

        //#region content variables and methods

        this.menus = [];
        let updatecontent = () => {
            self.menus = (contents && contents.current) ? contents.current.links : [];
            self.update();
        }
        this.isShown = (item) => {
            let ret = true;
            let linkType = (item.type) ? item.type.toLowerCase() : '';
            if (linkType === 'screen' || linkType === 'url') {
                //ret = item.ref !== screens.current.screenId;
                ret = item.id !== screens.current.screenId;
            }
            return ret;
        }

        //#endregion

        //#region controls variables and methods

        let links, dropItems;
        let initCtrls = () => {
            links = self.refs['links'];
            dropItems = self.refs['dropItems'];
        }
        let freeCtrls = () => {
            dropItems = null;
            links = null;
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

            links.addEventListener('click', toggle);
            window.addEventListener('click', checkClickPosition);
        }
        let unbindEvents = () => {
            window.removeEventListener('click', checkClickPosition);
            links.removeEventListener('click', toggle);

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

        let onLanguageChanged = (e) =>  { updatecontent(); }
        let onContentChanged = (e) => { updatecontent();  }
        let onScreenChanged = (e) =>  { updatecontent(); }

        //#endregion

        //#region local inline event handlers

        this.selectItem = (e) => {
            toggle(); // toggle off
            let selLink = e.item.item;
            let linkType = (selLink.type) ? selLink.type.toLowerCase() : '';
            if (linkType  === 'screen') {
                screens.show(selLink.id);
            }
            else if (linkType === 'url') {
                //secure.postUrl(selLink.ref);
                secure.nav(selLink.ref)
            }
            else if (linkType === 'cmd') {
                if (selLink.ref.toLowerCase() === 'signout') {
                    secure.signout();
                } 
                else if (selLink.ref.toLowerCase() === 'exit') {
                    if (selLink.ref.toLowerCase() === 'exit')
                    secure.changeCustomer();
                }
            }
            else {
                console.log('Not implements type, data:', selLink);
            }
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
            let classList = ['.link-combo', '.burger'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }

        //#endregion
    </script>
</links-menu>