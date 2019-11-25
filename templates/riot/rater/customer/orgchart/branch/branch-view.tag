<branch-view>
    <div ref="title" class="titlearea">
        <button class="addnew" onclick="{ addnew }">
            <span class="fas fa-plus-circle">&nbsp;</span>
        </button>
        <button class="refresh" onclick="{ refresh }">
            <span class="fas fa-sync">&nbsp;</span>
        </button>
    </div>
    <div ref="container" class="scrarea">
        <div ref="grid"></div>
        <!--
        <div ref="grid" id="gridbranch"></div>
        -->
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 30px 1fr;
            grid-template-areas: 
                'titlearea'
                'scrarea';
        }
        :scope .titlearea {
            grid-area: titlearea;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            max-width: 800px;
            height: 100%;
            overflow: hidden;
            border-radius: 3px;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope .titlearea .addnew {
            margin: 0 auto;
            padding: 2px;
            height: 100%;
            width: 50px;
            color: darkgreen;
        }
        :scope .titlearea .refresh {
            margin: 0 auto;
            padding: 2px;
            height: 100%;
            width: 50px;
            color: darkgreen;
        }
        :scope .scrarea {
            grid-area: scrarea;
            margin: 0 auto;
            padding: 0;
            margin-top: 3px;
            width: 100%;
            max-width: 800px;
            /* height: calc(100% - 50px); */
            height: 100%;
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
            //console.log('init grid:', data)
            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);
            //console.log('opts', opts)            
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
            //console.log('setup columns:', self.content)
            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = branchmanager.current;
            //console.log(data)
            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;            
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                //console.log('branch view update content:', self.content)
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
                branchName: 'New Branch'
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