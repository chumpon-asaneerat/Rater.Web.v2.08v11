<flip-screen>
    <div class="auto-container">
        <div ref="flipper" class="flipper">
            <div class="viewer-block">
                <div class="content">
                    <yield from="viewer"></yield>
                </div>
            </div>
            <div class="entry-block">
                <div class="content">
                    <yield from="entry"></yield>
                </div>
            </div>
        </div>
    </div>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'auto-container';
            overflow: hidden;
        }
        .auto-container {
            margin: 0;
            padding: 0;
            grid-area: auto-container;
            border: 1px solid #f1f1f1;
            /* Remove this if you don't want the 3D effect */
            /* perspective: 30000px; */
        }
        .flipper {
            margin: 0;
            padding: 0;
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.5s;
            transform-style: preserve-3d;
        }
        .auto-container .flipper.toggle {
            transform: rotateY(180deg);
        }
        .viewer-block {
            position: absolute;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transform: rotateY(0deg);
        }
        .entry-block {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            /* background-color: dimgray; */
            /* color: white; */
        }
        .content {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let flipper;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {}

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

        //#region public methods

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }

        //#endregion
    </script>
</flip-screen>