<ntree>
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
        let selectItemCallback;

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
        let setSelectedItem = (item) => {
            console.log('set selected item.')
            if (tree && item) {
                //console.log('item to select:', item)
                //console.log('get item:', $(tree).jstree(true).get_node(item))
                $(tree).jstree(true).select_node(item);                
                //console.log('select item:', getSelectedItem())
            }
        }        
        let getSelectedItem = () => {
            let ret = null;
            if (tree) {
                let selectitems = $(tree).jstree(true).get_selected();
                ret = (selectitems && selectitems.length > 0) ? selectitems[0] : null;
            }
            return ret;
        }        
        this.selectedItem = (item) => {
            let ret;
            if (tree) {
                if (hasValue(item)) {
                    setSelectedItem(item);
                }
                else {
                    ret = getSelectedItem();
                }
            }
            return ret;
        }
        this.setup = (values, fldMap, lastValue) => {
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
                        if (lastValue) {
                            item.state = { selected: true }
                        }
                        if (fldmap.parentField && val[fldmap.parentField]) {
                            // set parent id.
                            item.parent = val[fldmap.parentField];
                        }
                        item.data = val;
                        data.push(item);
                    });
                }
                //console.log(data)
                $(tree).jstree("destroy");
                $(tree).jstree({
                    'core': { 
                        data: data,
                        "multiple" : false
                    },
                    //"checkbox" : { "keep_selected_style" : false, two_state: true },
                    //"plugins" : [ "wholerow", "checkbox", "json_data" ]           
                    "plugins" : [ "wholerow", "json_data" ]
                }).on('ready.jstree', () => {
                    $(tree).jstree("open_all");
                    $(tree).on('changed.jstree', (e, data) => {
                        let i, j, r = [];
                        for (i = 0, j = data.selected.length; i < j; i++) {
                            //r.push(data.instance.get_node(data.selected[i]).text);
                            r.push(data.instance.get_node(data.selected[i]));
                        }
                        //console.log('selected items:', r)
                        //console.log('has callback:', selectItemCallback ? 'yes' : 'no')
                        if (selectItemCallback && r.length > 0) { 
                            selectItemCallback(r[0])
                        }
                    });
                });
            }
            self.update();
        }

        //#endregion

        this.onSelectItem = (callback) => { 
            //console.log('set callback: ', callback)
            selectItemCallback = callback
            //console.log('has callback:', selectItemCallback ? 'yes' : 'no')
        }
    </script>
</ntree>
