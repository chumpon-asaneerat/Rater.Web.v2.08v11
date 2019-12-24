<branch-entry>
    <ninput ref="branchName" title="{ content.entry.branchName }" type="text" name="branchName"></ninput>
    <div class="padtop"></div>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope .padtop {
            display: block;
            margin: 0 auto;
            width: 100%;
            min-height: 10px;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'branch-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        //#region content variables and methods
        
        let defaultContent = {
            entry: { 
                branchName: 'Branch Name'
            }
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

        let branchName;

        let initCtrls = () => {
            branchName = self.refs['branchName'];
        }
        let freeCtrls = () => {
            branchName = null;
        }
        let clearInputs = () => {
            branchName.clear();
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

        //#region public methods

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {
                //console.log('ctrlToObj:', editObj)
                if (branchName) editObj.branchName = branchName.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {
                //console.log('objToCtrl:', editObj)
                if (branchName) branchName.value(editObj.branchName);
            }
        }

        this.setup = (item) => {
            clearInputs();
            
            origObj = clone(item);
            editObj = clone(item);
            //console.log('branch entry edit obj:', editObj)
            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();
            //console.log('getItem:', editObj)
            let hasId = (editObj.branchId !== undefined && editObj.branchId != null)
            let isDirty = !hasId || !equals(origObj, editObj);
            //console.log(editObj)
            return (isDirty) ? editObj : null;
        }

        //#endregion
    </script>
</branch-entry>
