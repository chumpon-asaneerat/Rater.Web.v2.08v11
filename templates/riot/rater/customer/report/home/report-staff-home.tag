<report-staff-home>
    <div class="report-home-main">
        <div class="report-item">
            <button onclick="{ showvotesummary }">
                <span class="icon fa-3x fas fa-table cr1"></span>
                <span class="text">Vote Summary</span>
            </button>
        </div>
        <div class="report-item">
            <button onclick="{ showpiesummary }">
                <span class="icon fa-3x fas fa-chart-pie cr2"></span>
                <span class="text">Pie Chart</span>
            </button>
        </div>
        <div class="report-item">
            <button onclick="{ showbarsummary }">
                <span class="icon fa-3x fas fa-chart-bar cr3"></span>
                <span class="text">Bar Chart</span>
            </button>
        </div>
        <div class="report-item">
            <button onclick="{ showstaffcompare }">
                <span class="icon fa-3x fas fa-chalkboard-teacher cr6"></span>
                <span class="text">Staff Compare</span>
            </button>
        </div>
        <div class="report-item">
            <button onclick="{ showrawvote }">
                <span class="icon fa-3x fas fa-table cr4"></span>
                <span class="text">Raw Vote</span>
            </button>
        </div>
        <div class="report-item">
            <button onclick="{ showstaffperf }">
                <span class="icon fa-3x far fa-id-card cr5"></span>
                <span class="text">Staff Performance</span>
            </button>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            padding-top: 20px;
            padding-bottom: 20px;
            width: 100%;
            height: 100%;
            display: block;
            overflow: auto;
            background-color: bisque;
        }
        @media (min-width: 620px) {
            :scope .report-home-main {
                column-count: 2;
                column-gap: 20px;
            }
        }
        @media (min-width: 960px) {
            :scope .report-home-main {
                column-count: 3;
                column-gap: 20px;
            }
        }
        :scope .report-home-main {
            margin: 0 auto;
            padding: 20px;
            /* max-width: 1200px; */
            max-width: 1000px;
            /* background-color: aliceblue; */
        }
        :scope .report-home-main {
            display: block;
            margin: 0 auto;
            padding: 10px;
        }
        :scope .report-home-main .report-item {
            margin: 2px auto;
            padding: 0;
            margin-bottom: 20px;
            height: 100px;
            /* background-color: aquamarine; */
            break-inside: avoid;
        }
        :scope .report-home-main .report-item button {
            margin: 0 auto;
            padding: 0;
            display: grid;
            width: 100%;
            height: 100%;
        }
        :scope .report-home-main .report-item button .icon {
            justify-self: center;
            align-self: center;
        }
        :scope .report-home-main .report-item button .text {
            justify-self: center;
            align-self: center;
            font-size: 1rem;
            font-weight: bold;
        }
        :scope .report-home-main .report-item button .icon.cr1 { color: chocolate; }
        :scope .report-home-main .report-item button .icon.cr2 { color: cornflowerblue; }
        :scope .report-home-main .report-item button .icon.cr3 { color: olivedrab; }
        :scope .report-home-main .report-item button .icon.cr4 { color: darkorchid; }
        :scope .report-home-main .report-item button .icon.cr5 { color: sandybrown; }
        :scope .report-home-main .report-item button .icon.cr6 { color: navy; }
    </style>
    <script>
        //#region Internal Variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => {}
        let freeCtrls = () => {}

        //#endregion

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {}
        let unbindEvents = () => {}

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

        this.showpiesummary = () => { 
            let url = 'http://localhost:3000/customer/staff/report/pie-votesummary';
            secure.nav(url)
            //screens.show('pie-votesummary-manage') 
        }
        this.showbarsummary = () => { 
            let url = 'http://localhost:3000/customer/staff/report/bar-votesummary';
            secure.nav(url)
            //screens.show('bar-votesummary-manage') 
        }
        this.showvotesummary = () => { 
            let url = 'http://localhost:3000/customer/staff/report/votesummary';
            secure.nav(url)
            //screens.show('votesummary-manage') 
        }
        this.showrawvote = () => { 
            let url = 'http://localhost:3000/customer/staff/report/raw-vote';
            secure.nav(url)
            //screens.show('rawvote-manage') 
        }
        this.showstaffcompare = () => { 
            let url = 'http://localhost:3000/customer/staff/report/staff-compare';
            secure.nav(url)
            //screens.show('staff-compare-manage') 
        }
        this.showstaffperf = () => {             
            let url = 'http://localhost:3000/customer/staff/report/staff-perf';
            secure.nav(url)
            //screens.show('staff-perf-manage') 
        }
    </script>
</report-staff-home>