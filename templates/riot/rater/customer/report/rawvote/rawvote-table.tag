<rawvote-table>
    <div ref="grid" class="grid-box"></div>
    <style>
        :scope {
            display: block;
            position: relative;
            margin: 0 auto;
            padding: 3px;
            border: 1px solid silver;
            border-radius: 3px;
            overflow: auto;
        }
        :scope .grid-box {
            display: block;
            position: absolute;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            /* max-width: 600px; */
            height: 100%;
        }
        /* hack tabulator to center text in column headers */
        :scope .grid-box .tabulator-col-title {
            text-align: center;
        }
    </style>
    <script>
        let self = this;

        let updatecontent = () => {
            let data = self.opts.votes;
            //console.log('data:', data)
            let columns = [
                { title: 'Date', field: 'VoteDate', headerSort:false },
                { title: 'Choice', field: 'VoteText', headerSort:false },
                { title: 'Device', field: 'DeviceId', align: 'center', headerSort:false },
                { title: 'User', field: 'FullName', align: 'left', headerSort:false }
            ]
            // define table
            if (grid) {
                let table = new Tabulator(grid, {
                    layout: 'fitDataFill',
                    columnVertAlign: 'middle', //align header contents to middle of cell
                    data: data,
                    columns: columns,
                    groupBy: "DeviceId",
                });
            }

            self.update();
        }

        //#region controls variables and methods

        let grid;
        let initCtrls = () => {
            grid = self.refs['grid']
            updatecontent();
        }
        let freeCtrls = () => {
            grid = null;
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
    </script>
</rawvote-table>