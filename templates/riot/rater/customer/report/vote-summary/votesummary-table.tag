<votesummary-table>
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
        let screenId = 'votesummary-manage';
        let defaultContent = {
            columns: {
                organization: "Organization",
                branch: 'Branch',
                totalCnt: 'Count<br>(Total)',
                totalAvg: 'Avg<br>(Total)',
                totalPct: 'Percent<br>(Total)',
                eachCnt: 'Count',
                eachPct: 'Percent',
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
            }

            let data = [];
            let columns = [
                { title: self.content.columns.organization, field: 'OrgName', headerSort:false },
                { title: self.content.columns.branch, field: 'BranchName', headerSort:false },
                { title: self.content.columns.totalCnt, field: 'TotCnt', align: 'center', headerSort:false },
                { title: self.content.columns.totalAvg, field: 'AvgTot', align: 'center', headerSort:false },
                { title: self.content.columns.totalPct, field: 'AvgPct', align: 'center', headerSort:false }
            ]
            // create group columm for each choices
            self.opts.choices.forEach(choice => {            
                let group = {
                    title: choice.text + ' (' + choice.choice + ')',
                    columns: [
                        { title: self.content.columns.eachCnt, field: 'Cnt-' + String(choice.choice), align: 'center', headerSort:false },
                        { title: self.content.columns.eachPct, field: 'Pct-' + String(choice.choice), align: 'center', headerSort:false }
                    ]
                }
                columns.push(group)
            })
            self.opts.orgs.forEach(item => {
                let obj = { 
                    OrgName: item.OrgName,
                    BranchName: item.BranchName,
                    TotCnt: item.TotCnt, 
                    AvgPct: item.AvgPct,
                    AvgTot: item.AvgTot,
                }
                item.choices.forEach(choice => {
                    // construct chocie verticle on same row.
                    obj['Cnt-' + String(choice.choice)] = choice.Cnt,
                    obj['Pct-' + String(choice.choice)] = choice.Pct
                })
                data.push(obj)
            });
            // define table
            if (grid) {
                let table = new Tabulator(grid, {
                    layout: 'fitDataFill',
                    columnVertAlign: 'middle', //align header contents to middle of cell
                    data: data,
                    columns: columns
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
</votesummary-table>