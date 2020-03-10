<norgtree>
    <div class="org-tree-container" ref="orgtree"></div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        :scope .org-tree-container {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        :scope .org-tree-container .orgchart {
            position: relative;
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
        }
    </style>
    <script>
        let self = this;
        let datasource = {
            'name': 'Lao Lao',
            'title': 'general manager',
            'children': [
                {
                    'name': 'Bo Miao', 'title': 'department manager', 'collapsed': true,
                    'children': [
                        { 'name': 'Li Jing', 'title': 'senior engineer', 'className': 'slide-up' },
                        {
                            'name': 'Li Xin', 'title': 'senior engineer', 'collapsed': true, 'className': 'slide-up',
                            'children': [
                                { 'name': 'To To', 'title': 'engineer', 'className': 'slide-up' },
                                { 'name': 'Fei Fei', 'title': 'engineer', 'className': 'slide-up' },
                                { 'name': 'Xuan Xuan', 'title': 'engineer', 'className': 'slide-up' }
                            ]
                        }
                    ]
                },
                {
                    'name': 'Su Miao', 'title': 'department manager',
                    'children': [
                        { 'name': 'Pang Pang', 'title': 'senior engineer' },
                        {
                            'name': 'Hei Hei', 'title': 'senior engineer', 'collapsed': true,
                            'children': [
                                { 'name': 'Xiang Xiang', 'title': 'UE engineer', 'className': 'slide-up' },
                                { 'name': 'Dan Dan', 'title': 'engineer', 'className': 'slide-up' },
                                { 'name': 'Zai Zai', 'title': 'engineer', 'className': 'slide-up' }
                            ]
                        }
                    ]
                }
            ]
        };
        let updatecontent = () => {
            if (orgtree) {
                $(orgtree).orgchart({
                    'data': datasource,
                    'nodeContent': 'title'
                });
            }
            else {
                //console.log('orgtree not init.')
            }
            self.update();
        }

        //#region controls variables and methods

        let orgtree;

        let initCtrls = () => {
            orgtree = self.refs['orgtree'];

            self.refresh()
        }
        let freeCtrls = () => {
            orgtree = null;
        }

        //#endregion

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            //addEvt(events.name.LanguageChanged, onLanguageChanged)
            //addEvt(events.name.ContentChanged, onContentChanged)
        }
        let unbindEvents = () => {
            //delEvt(events.name.ContentChanged, onContentChanged)
            //delEvt(events.name.LanguageChanged, onLanguageChanged)
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

        //#region public methods

        this.refresh = () => {
            updatecontent()
        }
        
        //#endregion
    </script>
</norgtree>