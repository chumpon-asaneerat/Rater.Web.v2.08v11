<collapse-panel>
    <div class="panel-container">
        <div class="panel-header">
            <div class="collapse-button" onclick="{collapseClick}">
                <virtual if={!collapsed}>
                    <span class="fas fa-sort-down" style="padding-left: 2px; transform: translate(0px, -3px);"></span>
                </virtual>
                <virtual if={collapsed}>
                    <span class="fas fa-caret-right" style="padding-left: 4px;"></span>
                </virtual>                    
            </div>
            <div class="header-block">
                <label>{ opts.caption }</label>
            </div>
            <virtual if={ 'removable' in opts }>
                <div class="close-button" onclick="{closeClick}">
                    <span class="far fa-times-circle" style="transform: translate(5px, 0);"></span>
                </div>
            </virtual>
        </div>
        <div ref="content" class="panel-body">
            <yield/>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            font-size: smaller;
        }
        :scope .panel-container {
            margin: 0;
            padding: 2px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            grid-template-areas: 
                'panel-header'
                'panel-body';
        }
        :scope .panel-header {
            grid-area: panel-header;
            display: grid;
            margin: 0;
            padding: 0;
            padding-left: 3px;
            padding-right: 3px;
            width: 100%;
            /* height: 100%; */
            grid-template-columns: 22px 1fr 20px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'collapse-button header-block close-button';
            color: white;
            /* font-size: inherit; */
            align-self: center;
            border-radius: 5px 5px 0 0;
            background-color: cornflowerblue;
        }
        :scope .panel-header .collapse-button {
            grid-area: collapse-button;
            align-self: center;
            margin: 0;
            padding: 0;
            width: 100%;
            cursor: pointer;
        }
        :scope .panel-header .collapse-button:hover {
            color: yellow;
        }
        :scope .panel-header .header-block {
            grid-area: header-block;
            align-self: center;
            align-content: center;
            margin: 0;
            padding: 0;
            width: 100%;
            cursor: none;
        }
        :scope .panel-header .header-block:hover {
            color: yellow;
        }
        :scope .panel-header .header-block label {
            /* display: block; */
            /* font-size: inherit; */
            margin: 0;
            /* margin-top: 1px; */
            margin-bottom: 1px;
            padding: 0;
            width: 100%;
            /* height: 100%; */
            user-select: none;
        }
        :scope .panel-header .close-button {
            grid-area: close-button;
            align-self: center;
            margin: 0;
            padding: 0;
            width: 100%;
            cursor: pointer;
        }
        :scope .panel-header .close-button:hover {
            color: orangered;
        }
        :scope .panel-body {
            grid-area: panel-body;
            display: inline-block;
            margin: 0;
            padding: 3px;
            padding-top: 3px;
            padding-bottom: 3px;
            width: 100%;
            background-color: white;
            border: 1px solid cornflowerblue;
        }
        :scope .panel-container .panel-body.collapsed {
            display: none;
        }
    </style>
    <script>
        let self = this;
        let collapsed = false;
        let contentPanel;
        this.collapseClick = (e) => {
            //console.log('Collapse')
            contentPanel = self.refs['content'];
            if (contentPanel) {
                contentPanel.classList.toggle('collapsed')                
                if (contentPanel.classList.contains('collapsed')) 
                    self.collapsed = true;
                else self.collapsed = false;
            }            
        };
        this.closeClick = (e) => {
            let tagEl = self.root;
            let parentEl = (tagEl) ? tagEl.parentElement : null;
            if (parentEl) {
                parentEl.removeChild(tagEl)
            }
        };
    </script>
</collapse-panel>