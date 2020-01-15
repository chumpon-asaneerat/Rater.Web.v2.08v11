<ncheckedtree>
    <div class="ntree-container">
        <div ref="tree" class="tree"></div>
    </div>
    <label>{ opts.title }</label>
    <style>
        :scope {
            margin: 0;
            margin-top: 5px;
            padding: 10px;
            font-size: 14px;
            display: inline-block;
            position: relative;
            height: auto;
            width: 100%;
            /* background: rgba(255, 255, 255, .2); */
            /* background: white; */
            background: transparent;
            /* border: 1px solid rgba(0, 0, 0, .1); */
            box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2);
        }
        :scope .ntree-container {
            display: block;
            padding: 20px 0 10px 0;
            margin-bottom: 0px;
            width: calc(100% - 25px);
            /* background-color: rgba(255, 255, 255, 0); */
            background-color: whitesmoke;

            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            border: none;
            font-size: 14px;
            /* box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.2) inset; */
            box-shadow: 0 0 0px 1000px white inset;

            border-radius: 2px;
            border-bottom: 2px solid cornflowerblue;
            overflow: hidden;
        }
        :scope .ntree-container .tree {
            width: 100%;
            border: 1px solid silver;
            border-radius: 2px;

            height: 100px;
            min-height: 100px;
            max-height: 100px;

            overflow: auto;
        }
        :scope label {
            position: absolute;
            top: 5px;
            left: 10px;
            transition: .2s;
            pointer-events: none;
            color: cornflowerblue;
            font-weight: bold;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let fldmap = { valueField:'id', textField:'text', parentField: '#' }
        let selectItemsCallback;

        //#endregion

        //#region controls variables and methods

        let tree, clear;

        let initCtrls = () => {
            tree = self.refs['tree'];
            self.setup();
        }
        let freeCtrls = () => {
            tree = null;
        }
        let clearInputs = () => {
            if (tree) {
                $(tree).jstree().deselect_node(this);
            }
        }

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
            clearInputs();
        });

        //#endregion

        //#region public methods

        this.clear = () => { clearInputs(); }
        this.focus = () => { if (tree) tree.focus(); }

        let hasValue = (val) => {
            return (val !== undefined && val !== null);
        }
        let setSelectedItems = (items) => {
            if (tree && items && items.length > 0) {
                let map = items.map(item => { return item.id })
                $(tree).jstree(true).check_node(map)
            }
        }        
        let getSelectedItems = () => {
            let ret = [];
            if (tree) {
                ret = $(tree).jstree(true).get_checked(true);
            }
            return ret;
        }        
        this.selectedItems = (items) => {
            let ret;
            if (tree) {
                if (hasValue(items)) {
                    setSelectedItems(items);
                }
                else {
                    ret = getSelectedItems();
                }
            }
            return ret;
        }
        this.setup = (values, fldMap) => {
            if (tree) {
                fldmap = fldMap;
                let data = [];
                if (values) {
                    values.forEach(val => {
                        let item = {
                            id: String(val[fldmap.valueField]),
                            text: val[fldmap.textField],
                            parent: '#'                          
                        }
                        if (fldmap.parentField && val[fldmap.parentField]) {
                            // set parent id.
                            item.parent = val[fldmap.parentField];
                        }
                        item.data = val;
                        data.push(item);
                    });
                }
                /*
                $(tree).on('changed.jstree', (e, data) => {
                    let i, j, r = [];
                    for (i = 0, j = data.selected.length; i < j; i++) {
                        r.push(data.instance.get_node(data.selected[i]).text);
                    }
                    console.log('selected items:', r)
                });
                */
                //console.log(data)
                $(tree).jstree("destroy");
                $(tree).jstree({
                    'core': { 
                        data: data,
                        "multiple" : true
                    },
                    "checkbox" : { "keep_selected_style" : false, two_state: true },
                    "plugins" : [ "wholerow", "checkbox", "json_data" ]           
                }).on('ready.jstree', () => {
                    $(tree).jstree("open_all");
                    $(tree).on('changed.jstree', (e, data) => {
                        let i, j, r = [];
                        for (i = 0, j = data.selected.length; i < j; i++) {
                            //r.push(data.instance.get_node(data.selected[i]).text);
                            r.push(data.instance.get_node(data.selected[i]));
                        }
                        //console.log('selected items:', r)
                        //console.log('has callback:', selectItemsCallback ? 'yes' : 'no')
                        if (selectItemsCallback && r.length > 0) { 
                            selectItemsCallback(r)
                        }
                    });
                });
            }
            self.update();
        }

        //#endregion

        this.onSelectItems = (callback) => { 
            //console.log('set callback: ', callback)
            selectItemsCallback = callback
            //console.log('has callback:', selectItemsCallback ? 'yes' : 'no')
        }
    </script>
</ncheckedtree>
