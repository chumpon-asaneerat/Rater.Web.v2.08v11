<bar-votesummary-org>
    <div ref="chart" class="chart-box"></div>
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
        :scope .chart-box {
            display: block;
            position: absolute;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            min-width: 600px;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'bar-votesummary-manage';
        let defaultContent = {
            barchart: {
                title: 'Bar graph vote summary.',
                yAxis: 'Average'
            }
        }
        self.content = defaultContent

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
            }

            let data = [];
            let xlabels = []
            self.opts.orgs.forEach(item => {
                xlabels.push(item.OrgName)
                data.push({ name: item.OrgName, y: item.AvgTot })
            })

            Highcharts.chart(chart, {
                credits: {
                    enabled: false
                },
                chart: { type: 'column' },
                title: { 
                    text: self.content.barchart.title
                },
                subtitle: {
                    //text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
                },
                xAxis: { 
                    //type: 'Organization',
                    categories: xlabels
                },
                yAxis: { 
                    title: { text: self.content.barchart.yAxis }
                },
                legend: { enabled: false },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.2f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    headerFormat: '',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
                    pointFormat: '<span>{point.name}</span>: <b>{point.y:.2f}</b><br/>'
                },
                series: [{
                    name: "Organization",
                    colorByPoint: true,
                    data: data
                }]
            });
            self.update();
        }

        //#region controls variables and methods

        let chart;
        let initCtrls = () => {
            chart = self.refs['chart']
            updatecontent();
        }
        let freeCtrls = () => {
            chart = null;
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
</bar-votesummary-org>