<app>
    <navibar class="navibar"></navibar>
    <div class="scrarea">
        <yield/>
    </div>
    <page-footer class="footer"></page-footer>
    <style>
        :scope {
            margin: 0 auto;
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas: 
                'scrarea';
            overflow: hidden;
        }
        .navibar { display: none }
        .footer { display: none }

        :scope[navibar][footer] {
            grid-template-columns: 1fr;
            grid-template-rows: 40px 1fr 22px;
            grid-template-areas:
                'navibar'
                'scrarea'
                'footer';
            overflow: hidden;
        }
        :scope[navibar][footer] .navibar { display: grid; }
        :scope[navibar][footer] .footer { display: grid;}

        :scope[navibar] {
            grid-template-columns: 1fr;
            grid-template-rows: 40px 1fr;
            grid-template-areas:
                'navibar'
                'scrarea';
            overflow: hidden;
        }
        :scope[navibar] .navibar { display: grid; }

        :scope[footer] {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 22px;
            grid-template-areas:
                'scrarea'
                'footer';
            overflow: hidden;
        }
        :scope[footer] .footer { display: grid; }

        .navibar {
            grid-area: navibar;
            padding: 5px;
            overflow: hidden;
        }
        .scrarea { 
            grid-area: scrarea;
            margin: 0;
            padding: 0;
            overflow: auto;
        }
        .footer {
            grid-area: footer;
            padding: 2px 3px 2px 3px;
            overflow: hidden;
        }
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
    </script>
</app>