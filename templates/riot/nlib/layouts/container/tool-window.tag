<tool-window>
    <div class="window-container">
        <div class="window-header">
            <div ref="dragger" class="header-block">
                <label>{ opts.caption }</label>
            </div>
        </div>
        <div ref="content" class="window-body">
            <yield/>
        </div>
    </div>
    <style>
        :scope {
            display: block;
            position: absolute;
            z-index: 9;
            margin: 0;
            width: 25%;
            min-width: 100px;
            height: 90%;
            /* max-height: 90%; */
            /* resize: both; */
            overflow: none;
        }
        :scope .window-container {
            grid-area: panel-container;
            /* position: relative; */
            width: 100%;
            height: 100%;
            padding: 5px;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 30px auto;
            grid-template-areas: 
                'panel-header'
                'panel-body';
            overflow: none;
        }
        :scope .window-container .window-header {
            grid-area: panel-header;
            display: grid;
            margin: 0;
            padding: 0;
            padding-left: 3px;
            padding-right: 3px;
            width: 100%;
            height: 100%;
            grid-template-columns: auto 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'collapse-button header-block';
            color: white;
            border-radius: 5px 5px 0 0;
            background-color: cornflowerblue;
            overflow: none;
        }
        :scope .window-header .collapse-button {
            grid-area: collapse-button;
            align-self: center;
            margin: 0;
            padding: 0;
            width: 100%;
            cursor: pointer;
        }
        :scope .window-header .collapse-button:hover { color: yellow; }
        :scope .window-header .header-block {
            grid-area: header-block;
            align-self: center;
            align-content: center;
            margin: 0;
            padding: 0;
            padding-left: 3px;
            width: 100%;
            cursor: none;
        }
        :scope .window-header .header-block:hover { color: yellow; }
        :scope .window-header .header-block label {
            /* display: block; */
            margin-top: 3px;
            padding: 0;
            width: 100%;
            height: 100%;
            user-select: none;
        }
        :scope .window-container .window-body {
            grid-area: panel-body;
            margin: 0;
            padding: 3px;
            padding-top: 5px;
            padding-bottom: 5px;
            width: 100%;
            height: 100%;
            background-color: white;
            border: 1px solid cornflowerblue;
            overflow: auto;
        }
        :scope .window-container .window-body.collapsed { display: none; }
    </style>
    <script>
        //#region local variables

        let self = this;
        let collapsed = false;

        let selfEl;

        let contentPanel, dragger;

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            contentPanel = self.refs['content'];
            dragger = self.refs['dragger'];
            selfEl = self.root;
            dragElement();
        });
        this.on('unmount', () => {
            selfEl = null;
            contentPanel = null;
            dragger = null;
        });

        //#endregion

        //#region inline event handlers

        this.collapseClick = (e) => {
            //console.log('Collapse')            
            if (contentPanel) {
                contentPanel.classList.toggle('collapsed')                
                if (contentPanel.classList.contains('collapsed')) 
                    self.collapsed = true;
                else self.collapsed = false;
            }            
        };

        //#endregion

        //#region drag move method

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        let dragElement = () => {
            if (dragger) {
                dragger.onmousedown = dragMouseDown;
            }
        }

        let dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        let elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            selfEl.style.top = (selfEl.offsetTop - pos2) + "px";
            selfEl.style.left = (selfEl.offsetLeft - pos1) + "px";
        }

        let closeDragElement = () => {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }

        //#endregion
    </script>
</tool-window>