<branch-view>
    <div ref="container" class="scrarea">
        <div ref="tool" class="toolarea">
            <button class="float-button" onclick="{ addnew }">
                <span class="fas fa-plus">&nbsp;</span>
            </button>
            <button class="float-button" onclick="{ refresh }">
                <span class="fas fa-sync">&nbsp;</span>
            </button>
        </div>
        <div ref="grid" class="gridarea"></div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 20px 1fr 20px;
            grid-template-areas: 
                '.'
                'scrarea'
                '.'
        }
        :scope>.scrarea {
            grid-area: scrarea;
            display: grid;
            grid-template-columns: 5px auto 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                '. toolarea gridarea';
            margin: 0 auto;
            padding: 0;
            margin-top: 3px;
            width: 100%;
            max-width: 800px;
            height: 100%;
        }
        :scope>.scrarea>.toolarea {
            grid-area: toolarea;
            margin: 0 auto;
            margin-right: 5px;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope>.scrarea>.toolarea .float-button {
            display: block;
            margin: 0 auto;
            margin-bottom: 5px;
            padding: 3px;
            padding-right: 1px;
            height: 40px;
            width: 40px;
            color: whitesmoke;
            background: silver;
            border: none;
            outline: none;
            border-radius: 50%;
            cursor: pointer;
        }
        :scope>.scrarea>.toolarea .float-button:hover {
            color: whitesmoke;
            background: forestgreen;
        }
        :scope>.scrarea>.gridarea {
            grid-area: gridarea;
            margin: 0 auto;
            padding: 0;
            height: 100%;
            width: 100%;
        }
        :scope .tabulator-row button {
            margin: 0 auto;
            padding: 0px;
            width: 100%;
            font-size: small;
            color: inherit;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
        }
        :scope .tabulator-row button:hover {
            color: forestgreen;
        }
        :scope .tabulator-row button>span {
            margin: 0 auto;
            padding: 0;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let table;
        let screenId = 'branch-manage';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Branch Management',
            columns: []
        }
        this.content = defaultContent;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {
            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);
            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44, 
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44, 
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]
            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = branchmanager.current;
            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;            
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
                if (table) table.redraw(true);
            }
        }

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }

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
            addEvt(events.name.BranchListChanged, onBranchListChanged)
            addEvt(events.name.EndEditBranch, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditBranch, onEndEdit)
            delEvt(events.name.BranchListChanged, onBranchListChanged)
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
                syncData(); 
            }
        }
        let onScreenChanged = (e) => { 
            let scrId = screens.current.screenId;      
            if (screenId === scrId) {
                updatecontent();
                branchmanager.load();
            }
        }
        let onBranchListChanged = (e) => { 
            let scrId = screens.current.screenId;            
            if (screenId === scrId) {
                updatecontent();
                syncData(); 
            }
        }

        //#endregion

        //#region grid handler

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            events.raise(events.name.BeginEditBranch, { item: data })
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();
            //events.raise(events.name.DeleteBranch, { item: data })
            /*
            evt = new CustomEvent('entry:delete', { detail: { entry: entryId, item: data } })
            document.dispatchEvent(evt);
            */
        }
        let onEndEdit = (e) => {
            syncData();        
            table.redraw(true);
        }

        //#endregion

        //#region public methods

        this.addnew = (e) => {
            let data = { 
                branchId: null, 
                branchName: null
            };
            events.raise(events.name.BeginEditBranch, { item: data })
        }

        this.refresh = (e) => { 
            branchmanager.load();
            updatecontent();
        }

        //#endregion
    </script>
</branch-view>