<exclusive-home>
    <!--
    <h3>{ content.title }</h3>
    -->
    <div class="client-area">
        <div class="info-panel">
            <div class="info-box">
                <div class="info-data">
                    <div class="info-data-value">3.82</div>
                </div>
                <div class="info-caption">
                    <div class="info-caption-icon">
                        <span class="fas fa-calendar"></span>
                    </div>
                    <div class="info-caption-text">
                        Average
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="info-data">
                    <div class="info-data-value">87%</div>
                </div>
                <div class="info-caption">
                    <div class="info-caption-icon">
                        <span class="fas fa-calendar"></span>
                    </div>
                    <div class="info-caption-text">
                        Average %
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="info-data">
                    <div class="info-data-value">200 K+</div>
                </div>
                <div class="info-caption">
                    <div class="info-caption-icon">
                        <span class="fas fa-calendar"></span>
                    </div>
                    <div class="info-caption-text">
                        Total Votes
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="info-data">
                    <div class="info-data-value">30</div>
                </div>
                <div class="info-caption">
                    <div class="info-caption-icon">
                        <span class="fas fa-calendar"></span>
                    </div>
                    <div class="info-caption-text">
                        Wait list
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-panel">
            <div class="bar-chart">
                <div class="chart-box" ref="bar1"></div>
            </div>
            <div class="pie-chart">
                <div class="chart-box" ref="pie1"></div>
            </div>
        </div>
        <!--
        <div class="data-panel">
            <h3>DATA</h3>
        </div>
        -->
    </div>
    <style>
        :scope {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'client-area';
            margin: 0 auto;
            padding: 0;
            /* text-align: center; */
            width: 100%;
            height: 100%;
            /* overflow: hidden; */
        }
        :scope>.client-area {
            grid-area: client-area;
            display: grid;
            grid-auto-flow: row;
            grid-auto-rows: max-content;
            grid-gap: 10px;

            margin: 0;
            padding: 5px;
            width: 100%;
            height: 100%;
            border: 1px dotted navy;
            overflow: auto;
        }
        :scope>.client-area .chart-panel {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            grid-gap: 10px;
            grid-auto-rows: minmax(200px, max-content);

            margin: 0;
            padding: 5px;
            width: 100%;
            height: auto;
            /* border: 1px dotted green; */
        }

        :scope>.client-area .bar-chart {
            position: relative;
            display: block;
            margin: 0;
            padding: 5px;
            width: 100%;
            height: 100%;

            background: whitesmoke;

            border: 1px dotted orchid;
            border-radius: 5px;
            box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4);
        }
        :scope>.client-area .bar-chart .chart-box {
            display: block;
            position: absolute;
            margin: 0;
            padding: 5px;
            width: 100%;
            height: 100%;
            min-width: 100px;
        }
        .bar-chart .chart-box .highcharts-background {
            /* fill: rgba(200, 200, 200, .5); */
            fill: rgba(250, 250, 250, .1);
        }

        :scope>.client-area .pie-chart {
            position: relative;
            display: block;
            margin: 0;
            padding: 5px;
            width: 100%;
            height: 100%;

            /* background: azure; */
            background: whitesmoke;

            border: 1px dotted skyblue;
            border-radius: 5px;
            box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4);
        }
        :scope>.client-area .pie-chart .chart-box {
            display: block;
            margin: 0 auto;
            padding: 5px;
            width: 100%;
            height: 100%;
        }
        :scope>.client-area .pie-chart .chart-box .highcharts-background {
            /* fill: rgba(200, 200, 200, .5); */
            fill: rgba(250, 250, 250, .1);
        }

        :scope>.client-area .info-panel {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 10px;
            grid-auto-rows: max-content;

            margin: 0;
            padding: 5px;
            width: 100%;
            height: auto;
            /* border: 1px dotted green; */
        }
        :scope>.client-area .info-box {
            display: inline-block;
            margin: 0;
            padding: 5px;
            /* width: 20%; */
            height: fit-content;
            /*
            width: fit-content;
            height: fit-content;
            */
            font-size: 1rem;

            background: wheat;
            border: 1px dotted chocolate;
            border-radius: 5px;
            box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4);
        }

        /* Small devices (portrait tablets and large phones, 600px and up) */
        @media only screen and (min-width: 400px) {
            :scope>.client-area .info-box { 
                /* width: 100%; */
                background: olive;
            }
        }

        /* Medium devices (landscape tablets, 768px and up) */
        @media only screen and (min-width: 600px) {
            :scope>.client-area .info-box { 
                /* width: 50%; */
                background: hotpink;
            }
        }

        /* Large devices (laptops/desktops, 992px and up) */
        @media only screen and (min-width: 800px) {
            :scope>.client-area .info-box { 
                /* width: 33.3%; */
                background: fuchsia;
            }
        }

        /* Extra large devices (large laptops and desktops, 1200px and up) */
        @media only screen and (min-width: 1000px) {
            :scope>.client-area .info-box { 
                /* width: 25%; */
                background: grey; 
            }
        }

        :scope>.client-area .info-box .info-data-value {
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: auto;

            font-size: 2.5em;
            font-weight: bold;
            text-align: center;
        }
        :scope>.client-area .info-box .info-caption {
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: auto;

            text-align: center;
        }
        :scope>.client-area .info-box .info-caption-icon {
            display: inline-block;
            margin: 0;
            padding: 0;
            height: auto;

            font-size: 0.7em;
            font-weight: normal;
        }
        :scope>.client-area .info-box .info-caption-text {
            display: inline-block;
            margin: 0;
            padding: 0;
            height: auto;

            font-size: 0.7em;
            font-weight: normal;
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;
        let screenId = 'exclusive-home';

        //#endregion

        let data1 = [
            { name: 'EDL', y: 3.5 },
            { name: 'Sale', y: 3.8 },
            { name: 'Engineer', y: 3.2 },
            { name: 'Supports', y: 2.9 },
            { name: 'Finance', y: 3.7 }
        ];
        let xlabels = [
            'EDL',
            'Sale',
            'Engineer',
            'Supports',
            'Finance'
        ];

        let chartTitle = 'EDL';
        let data2 = [
            { name: 'Excellent', y: 30 },
            { name: 'Good', y: 21 },
            { name: 'Fair', y: 24 },
            { name: 'Poor', y: 15 }
        ];

        //#region content variables and methods

        let defaultContent = {
            title: 'Exclusive Home Page.'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;            
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                updateBar()
                updatePie()

                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let bar1, pie1;
        let initCtrls = () => {
            bar1 = self.refs['bar1']
            pie1 = self.refs['pie1']
        }
        let freeCtrls = () => {
            pie1 = null
            bar1 = null
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
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent(); 
            }
        }
        let onScreenChanged = (e) => { 
            let scrId = screens.current.screenId;      
            if (screenId === scrId) {
                updatecontent();
            }
        }

        //#endregion

        let updateBar = () => {
            Highcharts.chart(bar1, {
                credits: {
                    enabled: false
                },
                chart: {                      
                    type: 'column'
                },
                title: { 
                    text: 'Vote Summary Bar graph'
                },
                subtitle: {
                    //text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
                },
                xAxis: { 
                    //type: 'Organization',
                    categories: xlabels
                },
                yAxis: { 
                    title: { text: 'Average' }
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
                    data: data1
                }]
            });
        }
         
        let updatePie = () => {
            Highcharts.chart(pie1, {
                credits: {
                    enabled: false
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: chartTitle
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                        }
                    }
                },
                series: [{
                    name: 'Choice',
                    colorByPoint: true,
                    data: data2
                }]
            });
        }
    </script>
</exclusive-home>
