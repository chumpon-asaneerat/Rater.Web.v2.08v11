riot.tag2('ninput', '<input ref="input" type="{opts.type}" name="{opts.name}" riot-value="{opts.value}" required="" autocomplete="off"> <div ref="clear" class="clear">x</div> <label>{opts.title}</label>', 'ninput,[data-is="ninput"]{ margin: 0; margin-top: 5px; padding: 10px; font-size: 14px; display: inline-block; position: relative; height: auto; width: 100%; background: transparent; box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2); } ninput input,[data-is="ninput"] input{ display: inline-block; padding: 20px 0 10px 0; margin-bottom: 0px; width: calc(100% - 25px); background-color: whitesmoke; box-sizing: border-box; box-shadow: none; outline: none; border: none; font-size: 14px; box-shadow: 0 0 0px 1000px white inset; border-bottom: 2px solid #999; } ninput .clear,[data-is="ninput"] .clear{ display: inline-block; margin: 0; padding: 0px 6px; font-size: 12px; font-weight: bold; width: 21px; height: 21px; color: white; cursor: pointer; user-select: none; border: 1px solid red; border-radius: 50%; background: rgba(255, 100, 100, .75); } ninput .clear:hover,[data-is="ninput"] .clear:hover{ color: yellow; background: rgba(255, 0, 0, .8); } ninput input:-webkit-autofill,[data-is="ninput"] input:-webkit-autofill,ninput input:-webkit-autofill:hover,[data-is="ninput"] input:-webkit-autofill:hover,ninput input:-webkit-autofill:focus,[data-is="ninput"] input:-webkit-autofill:focus{ font-size: 14px; transition: background-color 5000s ease-in-out 0s; } ninput label,[data-is="ninput"] label{ position: absolute; top: 30px; left: 14px; color: #555; transition: .2s; pointer-events: none; } ninput input:focus ~ label,[data-is="ninput"] input:focus ~ label{ top: 5px; left: 10px; color: #f7497d; font-weight: bold; } ninput input:-webkit-autofill ~ label,[data-is="ninput"] input:-webkit-autofill ~ label,ninput input:valid ~ label,[data-is="ninput"] input:valid ~ label{ top: 5px; left: 10px; color: cornflowerblue; font-weight: bold; } ninput input:focus,[data-is="ninput"] input:focus{ border-bottom: 2px solid #f7497d; } ninput input:valid,[data-is="ninput"] input:valid{ border-bottom: 2px solid cornflowerblue; }', '', function(opts) {


        let self = this;

        let input, clear;

        let initCtrls = () => {
            input = self.refs['input'];
            clear = self.refs['clear'];
            checkOnBlur();
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {
            input = null;
            clear = null;
        }

        let bindEvents = () => {
            input.addEventListener('focus', checkOnFocus);
            input.addEventListener('blur', checkOnBlur);
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
            input.removeEventListener('blur', checkOnBlur);
            input.removeEventListener('focus', checkOnFocus);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            clearInputs();
        });

        let oType;
        let checkOnFocus = () => {
            if (input) {

                if (!oType) {
                    oType = input.type;
                    if (self.opts.type === 'date') {

                        input.value = moment().format('YYYY-MM-DD');
                    }
                }
                if (oType === 'date' && self.opts.type === 'date') {
                    if (input.value === '') {
                        input.type = 'date'
                    }
                }
            }
        }
        let checkOnBlur = () => {
            if (input) {

                if (!oType) {
                    oType = input.type;
                    if (self.opts.type === 'date') {

                        input.value = moment().format('YYYY-MM-DD');
                    }
                }
                if (oType === 'date' && self.opts.type === 'date') {
                    if (input.value === '') {
                        input.type = 'text'
                    }
                }
            }
        }
        let onClear = () => {
            if (input) input.value = '';
            checkOnBlur();
        }

        this.clear = () => { if (input) input.value = ''; }
        this.focus = () => { if (input) input.focus(); }
        this.value = (text) => {
            let ret;
            if (input) {
                if (text !== undefined && text !== null) {
                    input.value = text;
                    checkOnBlur();
                }
                else {
                    ret = input.value;
                }
            }
            return ret;
        }

});
riot.tag2('nselect', '<select ref="input"> <option each="{item in items}" riot-value="{item.value}">{item.text}</option> </select> <div ref="clear" class="clear">x</div> <label>{opts.title}</label>', 'nselect,[data-is="nselect"]{ margin: 0; margin-top: 5px; padding: 10px; font-size: 14px; display: inline-block; position: relative; height: auto; width: 100%; background: transparent; box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2); } nselect select,[data-is="nselect"] select{ display: inline-block; padding: 20px 0 10px 0; margin-bottom: 0px; width: calc(100% - 25px); background-color: whitesmoke; box-sizing: border-box; box-shadow: none; outline: none; border: none; font-size: 14px; box-shadow: 0 0 0px 1000px white inset; border-bottom: 2px solid #999; -webkit-appearance: none; -moz-appearance: none; background-image: url("data:image/svg+xml;utf8,<svg fill=\'black\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>"); background-repeat: no-repeat; background-position-x: 100%; background-position-y: 20px; border-radius: 2px; } nselect .clear,[data-is="nselect"] .clear{ display: inline-block; margin: 0; padding: 0px 6px; font-size: 12px; font-weight: bold; width: 21px; height: 21px; color: white; cursor: pointer; user-select: none; border: 1px solid red; border-radius: 50%; background: rgba(255, 100, 100, .75); } nselect .clear:hover,[data-is="nselect"] .clear:hover{ color: yellow; background: rgba(255, 0, 0, .8); } nselect select:-webkit-autofill,[data-is="nselect"] select:-webkit-autofill,nselect select:-webkit-autofill:hover,[data-is="nselect"] select:-webkit-autofill:hover,nselect select:-webkit-autofill:focus,[data-is="nselect"] select:-webkit-autofill:focus{ font-size: 14px; transition: background-color 5000s ease-in-out 0s; } nselect label,[data-is="nselect"] label{ position: absolute; top: 30px; left: 14px; color: #555; transition: .2s; pointer-events: none; } nselect select:focus ~ label,[data-is="nselect"] select:focus ~ label{ top: 5px; left: 10px; color: #f7497d; font-weight: bold; } nselect select:-webkit-autofill ~ label,[data-is="nselect"] select:-webkit-autofill ~ label,nselect select:valid ~ label,[data-is="nselect"] select:valid ~ label{ top: 5px; left: 10px; color: cornflowerblue; font-weight: bold; } nselect select:focus,[data-is="nselect"] select:focus{ border-bottom: 2px solid #f7497d; } nselect select:valid,[data-is="nselect"] select:valid{ border-bottom: 2px solid cornflowerblue; }', '', function(opts) {


        let self = this;
        let fldmap = { valueField:'code', textField:'name' }
        let defaultItem = {
            value: '',
            text: '-',
            source: null
        };
        this.items = [];
        this.items.push(defaultItem);

        let input, clear;

        let initCtrls = () => {
            input = self.refs['input'];
            clear = self.refs['clear'];
            disableFirstOption();
        }
        let freeCtrls = () => {
            input = null;
            clear = null;
        }
        let clearInputs = () => {
            if (input) {
                input.selectedIndex = 0;
            }
        }
        let disableFirstOption = () => {
            if (input && input.options[0]) {
                let opt = input.options[0];
                opt.setAttribute('disable', '')
                opt.setAttribute('selected', '')
                opt.style.display = 'none';
            }
        }

        let bindEvents = () => {
            input.addEventListener('change', onSelection);
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
            input.removeEventListener('change', onSelection);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            clearInputs();
        });

        let onChangeCallback;
        let onClear = () => {
            clearInputs();
        }
        let onSelection = (e) => {
            if (input) {
                let idx = input.selectedIndex
                let val = input.options[input.selectedIndex].value;

                if (onChangeCallback) onChangeCallback();
            }
        }

        this.clear = () => { clearInputs(); }
        this.focus = () => { if (input) input.focus(); }

        let hasValue = (val) => {
            return (val !== undefined && val !== null);
        }
        let getSelectedIndexByValue = (val) => {
            let sVal = val.toString();
            let opt, idx = 0;
            for (let i = 0; i < input.options.length; i++) {
                opt = input.options[i];
                if (opt.value.toString() === sVal) {

                    idx = i
                    break;
                }
            }
            return idx;
        }
        let getSelectedValue = () => {
            let idx = input.selectedIndex
            let ret = (idx > 0) ? input.options[input.selectedIndex].value : null;
            return ret;
        }
        this.value = (val) => {
            let ret;
            if (input) {
                if (hasValue(val)) {
                    input.selectedIndex = getSelectedIndexByValue(val);
                }
                else {
                    ret = getSelectedValue();
                }
            }
            return ret;
        }
        this.setup = (values, fldMap, callback) => {
            fldmap = fldMap;
            onChangeCallback = callback;
            self.items = [];
            self.items.push(defaultItem);
            values.forEach(val => {
                let item = {
                    value: val[fldmap.valueField],
                    text: val[fldmap.textField],
                    source: val
                }
                self.items.push(item);
            })
            disableFirstOption();
            self.update();
        }

});

riot.tag2('ndialog', '<div class="modal-content"> <span ref="closeBtn" class="close">&times;</span> <p>Some text in the Modal..</p> </div>', 'ndialog,[data-is="ndialog"]{ display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); } ndialog .modal-content,[data-is="ndialog"] .modal-content{ background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; } ndialog .close,[data-is="ndialog"] .close{ color: #aaa; float: right; font-size: 28px; font-weight: bold; } ndialog .close:hover,[data-is="ndialog"] .close:hover,ndialog .close:focus,[data-is="ndialog"] .close:focus{ color: black; text-decoration: none; cursor: pointer; }', '', function(opts) {


        let self = this;

        let closeBtn;
        let initCtrls = () => {
            closeBtn = self.refs['closeBtn']
        }
        let freeCtrls = () => {
            closeBtn = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {

            window.addEventListener('click', windowClick)
            closeBtn.addEventListener('click', closeClick)
        }
        let unbindEvents = () => {
            closeBtn.removeEventListener('click', closeClick)
            window.removeEventListener('click', windowClick)

        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let windowClick = (evt) => {

            if (evt.target === self.root) {
                console.log('target:', evt.target)
                self.hide()
            }
        }
        let closeClick = (evt) => {
            self.hide()
        }
        this.show = () => {
            self.root.style.display = "block";
        }
        this.hide = () => {
            self.root.style.display = "none";
        }
});
riot.tag2('osd', '<div ref="osd-ctrl" class="osd error"> <label style="margin: 0 auto; padding: 0;"></label> </div>', 'osd,[data-is="osd"]{ display: inline-block; position: absolute; margin: 0 auto; padding: 0; left: 50px; right: 50px; bottom: 50px; z-index: 1000; background-color: transparent; } osd .osd,[data-is="osd"] .osd{ display: block; position: relative; margin: 0 auto; padding: 5px; height: auto; width: 200px; color: white; background-color: rgba(0, 0, 0, .7); text-align: center; border: 1; border-color: rgba(0, 0, 0, 1); border-radius: 8px; user-select: none; visibility: hidden; } osd .osd.show,[data-is="osd"] .osd.show{ visibility: visible; } osd .osd.show.info,[data-is="osd"] .osd.show.info{ color: whitesmoke; background-color: rgba(0, 0, 0, .7); border-color: rgba(0, 0, 0, 1); } osd .osd.show.warn,[data-is="osd"] .osd.show.warn{ color: black; background-color: rgba(255, 255, 0, .7); border-color: rgba(255, 255, 0, 1); } osd .osd.show.error,[data-is="osd"] .osd.show.error{ color: yellow; background-color: rgba(255, 0, 0, .7); border-color: rgba(255, 0, 0, 1); }', '', function(opts) {


        let self = this;

        let ctrl;
        let initCtrls = () => {
            ctrl = self.refs['osd-ctrl']
        }
        let freeCtrls = () => {
            ctrl = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.ShowOsd, showOsd)
            addEvt(events.name.UpdateOsd, updateOsd)
            addEvt(events.name.HideOsd, hideOsd)
        }
        let unbindEvents = () => {
            delEvt(events.name.HideOsd, hideOsd)
            delEvt(events.name.UpdateOsd, updateOsd)
            delEvt(events.name.ShowOsd, showOsd)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let showOsd = () => {
            ctrl.classList.add('show')
            self.update();
        }
        let updateOsd = (e) => {
            let data = e.detail.data;
            ctrl.innerHTML = data.msg;
            if (data.type === 'warn') {
                ctrl.classList.remove('info')
                ctrl.classList.add('warn')
                ctrl.classList.remove('error')
            }
            else if (data.type === 'error') {
                ctrl.classList.remove('info')
                ctrl.classList.remove('warn')
                ctrl.classList.add('error')
            }
            else {
                ctrl.classList.add('info')
                ctrl.classList.remove('warn')
                ctrl.classList.remove('error')
            }
            self.update();
        }
        let hideOsd = () => {
            ctrl.innerHTML = '';
            ctrl.classList.remove('info')
            ctrl.classList.remove('warn')
            ctrl.classList.remove('error')
            ctrl.classList.remove('show')
            self.update();
        }
});
riot.tag2('tabcontrol', '', 'tabcontrol,[data-is="tabcontrol"]{ position: relative; display: grid; grid-template-columns: 1fr; grid-template-rows: auto 1fr; grid-template-areas: \'tab-headers\' \'tab-pages\'; margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; } tabcontrol tabheaders:first-child,[data-is="tabcontrol"] tabheaders:first-child{ grid-area: tab-headers; display: block; } tabcontrol :not(tabheaders:first-child),[data-is="tabcontrol"] :not(tabheaders:first-child){ display: none; } tabcontrol tabpages:last-child,[data-is="tabcontrol"] tabpages:last-child{ grid-area: tab-pages; display: block; } tabcontrol :not(tabpages:last-child),[data-is="tabcontrol"] :not(tabpages:last-child){ display: none; }', '', function(opts) {
        let self = this;
        let headers = null;
        let panels = null;

        let initCtrls = () => {
            headers = self.tags['tabheaders']
            panels = self.tags['tabpages']
        }
        let freeCtrls = () => {
            panels = null;
            headers = null;
        }

        this.on('mount', () => { initCtrls(); });
        this.on('unmount', () => { freeCtrls(); });

        updateHeaders = (tabName) => {

            if (headers) {
                headers.show(tabName)
            }
        }

        updatePanels = (tabName) => {

            if (panels) {
                panels.show(tabName)
            }
        }

        this.setActiveTab = (tabName) => {
            updateHeaders(tabName);
            updatePanels(tabName);
        }
});

riot.tag2('tabheader', '<yield></yield>', 'tabheader,[data-is="tabheader"]{ float: left; margin: 0 auto; padding: 4px 16px; margin-top: 2px; vertical-align: baseline; border: 0px solid silver; border-bottom: 0px; border-radius: 6px 6px 0 0; color: navy; background: silver; cursor: pointer; transition: 0.3s; user-select: none; white-space: nowrap; overflow: hidden; } tabheader:hover,[data-is="tabheader"]:hover{ color: whitesmoke; background: forestgreen; border-color: green; } tabheader.active,[data-is="tabheader"].active{ color: whitesmoke; background: cornflowerblue; border-color: royalblue; }', '', function(opts) {
        let self = this;

        let bindEvents = () => {
            self.root.addEventListener('click', headerClick)
        }
        let unbindEvents = () => {
            self.root.removeEventListener('click', headerClick)
        }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        let headerClick = (evt) => {
            let tabName = self.getTabName();
            self.parent.setActiveTab(tabName)
        }

        this.getTabName = () => {
            let ret = self.root.getAttribute('for').toLowerCase().trim()
            return ret
        }
        this.show = () => {
            self.root.classList.add('active')
        }
        this.hide = () => {
            self.root.classList.remove('active')
        }
});
riot.tag2('tabheaders', '<yield></yield>', 'tabheaders,[data-is="tabheaders"]{ position: relative; display: flex; align-items: baseline; justify-content: space-between; margin: 0; padding: 0; width: 100%; height: auto; border: none; background-color: transparent; overflow: hidden; } tabheaders>:not(tabheader),[data-is="tabheaders"]>:not(tabheader){ display: none; }', '', function(opts) {
        let self = this;
        let headers = null;

        let initCtrls = () => {
            headers = self.tags['tabheader']
            if (headers && headers.length > 0) headers[0].show();
        }
        let freeCtrls = () => { headers = null; }

        this.on('mount', () => { initCtrls(); });
        this.on('unmount', () => { freeCtrls(); });

        this.show = (tabName) => {
            let activeHeader = null;
            let activeName = tabName.toLowerCase().trim();

            for (i = 0; i < headers.length; i++) {
                let headerName = headers[i].getTabName()
                if (headerName === activeName) {
                    headers[i].show();
                }
                else {
                    headers[i].hide();
                }
            }
        }

        this.setActiveTab = (tabName) => {
            self.parent.setActiveTab(tabName)
        }
});
riot.tag2('tabpage', '<yield></yield>', 'tabpage,[data-is="tabpage"]{ display: none; margin: 0; padding: 0; width: 100%; height: 100%; border: 0 solid silver; overflow: auto; animation: fadeEffect 2s; } @keyframes fadeEffect { from { opacity: 0; } to { opacity: 1; } } tabpage.active,[data-is="tabpage"].active{ display: block; }', '', function(opts) {
        let self = this;

        this.getTabName = () => {
            let ret = self.root.getAttribute('name').toLowerCase().trim()
            return ret
        }
        this.show = () => { self.root.classList.add('active') }
        this.hide = () => { self.root.classList.remove('active') }
});

riot.tag2('tabpages', '<yield></yield>', 'tabpages,[data-is="tabpages"]{ display: none; margin: 0; padding: 0; padding-top: 2px; width: 100%; height: 100%; border: 1px solid silver; overflow: hidden; } tabpages.active,[data-is="tabpages"].active{ display: block; } tabpages>:not(tabpage),[data-is="tabpages"]>:not(tabpage){ display: none; }', '', function(opts) {
        let self = this;
        let panels = null;

        let initCtrls = () => {
            panels = self.tags['tabpage']
            if (panels && panels.length > 0) panels[0].show();
        }
        let freeCtrls = () => { panels = null; }

        this.on('mount', () => { initCtrls(); });
        this.on('unmount', () => { freeCtrls(); });

        this.show = (tabName) => {
            let activeName = tabName.toLowerCase().trim();

            for (i = 0; i < panels.length; i++) {
                let panelName = panels[i].getTabName()
                if (panelName === activeName) {
                    panels[i].show();
                }
                else {
                    panels[i].hide();
                }
            }
        }
});
riot.tag2('ncheckedtree', '<div class="ntree-container"> <div ref="tree" class="tree"></div> </div> <label>{opts.title}</label>', 'ncheckedtree,[data-is="ncheckedtree"]{ margin: 0; margin-top: 5px; padding: 10px; font-size: 14px; display: inline-block; position: relative; height: auto; width: 100%; background: transparent; box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2); } ncheckedtree .ntree-container,[data-is="ncheckedtree"] .ntree-container{ display: block; padding: 20px 0 10px 0; margin-bottom: 0px; width: calc(100% - 25px); background-color: whitesmoke; box-sizing: border-box; box-shadow: none; outline: none; border: none; font-size: 14px; box-shadow: 0 0 0px 1000px white inset; border-radius: 2px; border-bottom: 2px solid cornflowerblue; overflow: hidden; } ncheckedtree .ntree-container .tree,[data-is="ncheckedtree"] .ntree-container .tree{ width: 100%; border: 1px solid silver; border-radius: 2px; height: 100px; min-height: 100px; max-height: 100px; overflow: auto; } ncheckedtree label,[data-is="ncheckedtree"] label{ position: absolute; top: 5px; left: 10px; transition: .2s; pointer-events: none; color: cornflowerblue; font-weight: bold; }', '', function(opts) {


        let self = this;
        let fldmap = { valueField:'id', textField:'text', parentField: '#' }
        let selectItemsCallback;

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

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            clearInputs();
        });

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

                            item.parent = val[fldmap.parentField];
                        }
                        item.data = val;
                        data.push(item);
                    });
                }

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

                            r.push(data.instance.get_node(data.selected[i]));
                        }

                        if (selectItemsCallback && r.length > 0) {
                            selectItemsCallback(r)
                        }
                    });
                });
            }
            self.update();
        }

        this.onSelectItems = (callback) => {

            selectItemsCallback = callback

        }
});

riot.tag2('norgtree', '<div class="org-tree-container" ref="orgtree"></div>', 'norgtree,[data-is="norgtree"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } norgtree .org-tree-container,[data-is="norgtree"] .org-tree-container{ margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } norgtree .org-tree-container .orgchart,[data-is="norgtree"] .org-tree-container .orgchart{ position: relative; display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {
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

            }
            self.update();
        }

        let orgtree;

        let initCtrls = () => {
            orgtree = self.refs['orgtree'];

            self.refresh()
        }
        let freeCtrls = () => {
            orgtree = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {

        }
        let unbindEvents = () => {

        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.refresh = () => {
            updatecontent()
        }

});
riot.tag2('ntree', '<div class="ntree-container"> <div ref="tree" class="tree"></div> </div> <label>{opts.title}</label>', 'ntree,[data-is="ntree"]{ margin: 0; margin-top: 5px; padding: 10px; font-size: 14px; display: inline-block; position: relative; height: auto; width: 100%; background: transparent; box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2); } ntree .ntree-container,[data-is="ntree"] .ntree-container{ display: block; padding: 20px 0 10px 0; margin-bottom: 0px; width: calc(100% - 25px); background-color: whitesmoke; box-sizing: border-box; box-shadow: none; outline: none; border: none; font-size: 14px; box-shadow: 0 0 0px 1000px white inset; border-radius: 2px; border-bottom: 2px solid cornflowerblue; overflow: hidden; } ntree .ntree-container .tree,[data-is="ntree"] .ntree-container .tree{ width: 100%; border: 1px solid silver; border-radius: 2px; height: 100px; min-height: 100px; max-height: 100px; overflow: auto; } ntree label,[data-is="ntree"] label{ position: absolute; top: 5px; left: 10px; transition: .2s; pointer-events: none; color: cornflowerblue; font-weight: bold; }', '', function(opts) {


        let self = this;
        let fldmap = { valueField:'id', textField:'text', parentField: '#' }
        let selectItemCallback;

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

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            clearInputs();
        });

        this.clear = () => { clearInputs(); }
        this.focus = () => { if (tree) tree.focus(); }

        let hasValue = (val) => {
            return (val !== undefined && val !== null);
        }
        let setSelectedItem = (item) => {
            console.log('set selected item.')
            if (tree && item) {

                $(tree).jstree(true).select_node(item);

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

                            item.parent = val[fldmap.parentField];
                        }
                        item.data = val;
                        data.push(item);
                    });
                }

                $(tree).jstree("destroy");
                $(tree).jstree({
                    'core': {
                        data: data,
                        "multiple" : false
                    },

                    "plugins" : [ "wholerow", "json_data" ]
                }).on('ready.jstree', () => {
                    $(tree).jstree("open_all");
                    $(tree).on('changed.jstree', (e, data) => {
                        let i, j, r = [];
                        for (i = 0, j = data.selected.length; i < j; i++) {

                            r.push(data.instance.get_node(data.selected[i]));
                        }

                        if (selectItemCallback && r.length > 0) {
                            selectItemCallback(r[0])
                        }
                    });
                });
            }
            self.update();
        }

        this.onSelectItem = (callback) => {

            selectItemCallback = callback

        }
});

riot.tag2('collapse-panel', '<div class="panel-container"> <div class="panel-header"> <div class="collapse-button" onclick="{collapseClick}"> <virtual if="{!collapsed}"> <span class="fas fa-sort-down" style="padding-left: 2px; transform: translate(0px, -3px);"></span> </virtual> <virtual if="{collapsed}"> <span class="fas fa-caret-right" style="padding-left: 4px;"></span> </virtual> </div> <div class="header-block"> <label>{opts.caption}</label> </div> <virtual if="{\'removable\' in opts}"> <div class="close-button" onclick="{closeClick}"> <span class="far fa-times-circle" style="transform: translate(5px, 0);"></span> </div> </virtual> </div> <div ref="content" class="panel-body"> <yield></yield> </div> </div>', 'collapse-panel,[data-is="collapse-panel"]{ margin: 0 auto; padding: 0; width: 100%; font-size: smaller; } collapse-panel .panel-container,[data-is="collapse-panel"] .panel-container{ margin: 0; padding: 2px; width: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: auto 1fr; grid-template-areas: \'panel-header\' \'panel-body\'; } collapse-panel .panel-header,[data-is="collapse-panel"] .panel-header{ grid-area: panel-header; display: grid; margin: 0; padding: 0; padding-left: 3px; padding-right: 3px; width: 100%; grid-template-columns: 22px 1fr 20px; grid-template-rows: 1fr; grid-template-areas: \'collapse-button header-block close-button\'; color: white; align-self: center; border-radius: 5px 5px 0 0; background-color: cornflowerblue; } collapse-panel .panel-header .collapse-button,[data-is="collapse-panel"] .panel-header .collapse-button{ grid-area: collapse-button; align-self: center; margin: 0; padding: 0; width: 100%; cursor: pointer; } collapse-panel .panel-header .collapse-button:hover,[data-is="collapse-panel"] .panel-header .collapse-button:hover{ color: yellow; } collapse-panel .panel-header .header-block,[data-is="collapse-panel"] .panel-header .header-block{ grid-area: header-block; align-self: center; align-content: center; margin: 0; padding: 0; width: 100%; cursor: none; } collapse-panel .panel-header .header-block:hover,[data-is="collapse-panel"] .panel-header .header-block:hover{ color: yellow; } collapse-panel .panel-header .header-block label,[data-is="collapse-panel"] .panel-header .header-block label{ margin: 0; margin-bottom: 1px; padding: 0; width: 100%; user-select: none; } collapse-panel .panel-header .close-button,[data-is="collapse-panel"] .panel-header .close-button{ grid-area: close-button; align-self: center; margin: 0; padding: 0; width: 100%; cursor: pointer; } collapse-panel .panel-header .close-button:hover,[data-is="collapse-panel"] .panel-header .close-button:hover{ color: orangered; } collapse-panel .panel-body,[data-is="collapse-panel"] .panel-body{ grid-area: panel-body; display: inline-block; margin: 0; padding: 3px; padding-top: 3px; padding-bottom: 3px; width: 100%; background-color: white; border: 1px solid cornflowerblue; } collapse-panel .panel-container .panel-body.collapsed,[data-is="collapse-panel"] .panel-container .panel-body.collapsed{ display: none; }', '', function(opts) {
        let self = this;
        let collapsed = false;
        let contentPanel;
        this.collapseClick = (e) => {

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
});
riot.tag2('napp', '<div class="app-area"> <yield></yield> </div>', 'napp,[data-is="napp"]{ display: grid; margin: 0 auto; padding: 0; height: 100vh; width: 100vw; grid-template-areas: \'app-area\'; background: inherit; overflow: hidden; } napp>.app-area,[data-is="napp"]>.app-area{ grid-area: app-area; position: relative; display: grid; grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; grid-template-areas: \'navi-area\' \'scrn-area\' \'stat-area\'; margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; } napp>.app-area>:not(navibar):not(screen):not(statusbar),[data-is="napp"]>.app-area>:not(navibar):not(screen):not(statusbar){ display: none; } napp>.app-area navibar:first-child,[data-is="napp"]>.app-area navibar:first-child{ grid-area: navi-area; } napp>.app-area navibar:not(:first-child),[data-is="napp"]>.app-area navibar:not(:first-child){ grid-area: navi-area; display: none; } napp>.app-area screen,[data-is="napp"]>.app-area screen{ grid-area: scrn-area; } napp>.app-area statusbar:last-child,[data-is="napp"]>.app-area statusbar:last-child{ grid-area: stat-area; } napp>.app-area statusbar:not(:last-child),[data-is="napp"]>.app-area statusbar:not(:last-child){ grid-area: stat-area; display: none; }', '', function(opts) {
});
riot.tag2('screen', '<div class="content-area"> <yield></yield> </div>', 'screen,[data-is="screen"]{ margin: 0 auto; padding: 0; display: none; width: 100%; height: 100%; } screen.active,[data-is="screen"].active,screen.show,[data-is="screen"].show{ display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'content-area\'; } screen .content-area,[data-is="screen"] .content-area{ width: 100%; height: 100%; overflow: hidden; }', '', function(opts) {


        let self = this;

        let hide = () => { self.root.classList.remove('show') }
        let show = () => { self.root.classList.add('show') }

        let updatecontent = () => {
            if (screens.current.screenId !== self.opts.screenid) {
                hide();
            }
            else {
                show();
            }
            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.ScreenChanged, onScreenChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.ScreenChanged, onScreenChanged)
        }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('tool-window', '<div class="window-container"> <div class="window-header"> <div ref="dragger" class="header-block"> <label>{opts.caption}</label> </div> </div> <div ref="content" class="window-body"> <yield></yield> </div> </div>', 'tool-window,[data-is="tool-window"]{ display: block; position: absolute; z-index: 9; margin: 0; width: 25%; min-width: 100px; height: 90%; overflow: none; } tool-window .window-container,[data-is="tool-window"] .window-container{ grid-area: panel-container; width: 100%; height: 100%; padding: 5px; display: grid; grid-template-columns: 1fr; grid-template-rows: 30px auto; grid-template-areas: \'panel-header\' \'panel-body\'; overflow: none; } tool-window .window-container .window-header,[data-is="tool-window"] .window-container .window-header{ grid-area: panel-header; display: grid; margin: 0; padding: 0; padding-left: 3px; padding-right: 3px; width: 100%; height: 100%; grid-template-columns: auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'collapse-button header-block\'; color: white; border-radius: 5px 5px 0 0; background-color: cornflowerblue; overflow: none; } tool-window .window-header .collapse-button,[data-is="tool-window"] .window-header .collapse-button{ grid-area: collapse-button; align-self: center; margin: 0; padding: 0; width: 100%; cursor: pointer; } tool-window .window-header .collapse-button:hover,[data-is="tool-window"] .window-header .collapse-button:hover{ color: yellow; } tool-window .window-header .header-block,[data-is="tool-window"] .window-header .header-block{ grid-area: header-block; align-self: center; align-content: center; margin: 0; padding: 0; padding-left: 3px; width: 100%; cursor: none; } tool-window .window-header .header-block:hover,[data-is="tool-window"] .window-header .header-block:hover{ color: yellow; } tool-window .window-header .header-block label,[data-is="tool-window"] .window-header .header-block label{ margin-top: 3px; padding: 0; width: 100%; height: 100%; user-select: none; } tool-window .window-container .window-body,[data-is="tool-window"] .window-container .window-body{ grid-area: panel-body; margin: 0; padding: 3px; padding-top: 5px; padding-bottom: 5px; width: 100%; height: 100%; background-color: white; border: 1px solid cornflowerblue; overflow: auto; } tool-window .window-container .window-body.collapsed,[data-is="tool-window"] .window-container .window-body.collapsed{ display: none; }', '', function(opts) {


        let self = this;
        let collapsed = false;

        let selfEl;

        let contentPanel, dragger;

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

        this.collapseClick = (e) => {

            if (contentPanel) {
                contentPanel.classList.toggle('collapsed')
                if (contentPanel.classList.contains('collapsed'))
                    self.collapsed = true;
                else self.collapsed = false;
            }
        };

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        let dragElement = () => {
            if (dragger) {
                dragger.onmousedown = dragMouseDown;
            }
        }

        let dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;

            document.onmousemove = elementDrag;
        }

        let elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            selfEl.style.top = (selfEl.offsetTop - pos2) + "px";
            selfEl.style.left = (selfEl.offsetLeft - pos1) + "px";
        }

        let closeDragElement = () => {

            document.onmouseup = null;
            document.onmousemove = null;
        }

});
riot.tag2('navi-item', '<yield></yield>', 'navi-item,[data-is="navi-item"]{ position: relative; display: inline-block; margin: 2px; padding: 2px; font-size: 1.1rem; vertical-align: baseline; cursor: default; user-select: none; white-space: nowrap; overflow: hidden; } navi-item.center,[data-is="navi-item"].center{ flex-grow: 1; text-align: center; } navi-item.right,[data-is="navi-item"].right{ justify-self: flex-end; }', '', function(opts) {
});
riot.tag2('navibar', '<yield></yield>', 'navibar,[data-is="navibar"]{ position: relative; display: flex; align-items: baseline; justify-content: space-between; margin: 0; padding: 1px 4px; width: 100%; color: white; background: cornflowerblue; overflow: hidden; }', '', function(opts) {
});
riot.tag2('statusbar', '<yield></yield>', 'statusbar,[data-is="statusbar"]{ position: relative; display: block; margin: 0; padding: 0; width: 100%; user-select: none; white-space: nowrap; overflow: hidden; }', '', function(opts) {
});
riot.tag2('language-menu', '<div class="menu"> <a ref="flags" class="flag-combo" href="javascript:;"> <span class="flag-css flag-icon flag-icon-{lang.current.flagId.toLowerCase()}" ref="css-icon"></span> <div class="flag-text">&nbsp;{lang.langId}&nbsp;</div> <virtual if="{isMultiple()}"> <span class="drop-synbol fas fa-caret-down"></span> </virtual> </a> </div> <div ref="dropItems" class="language-dropbox"> <div each="{item in lang.languages}"> <a class="flag-item {(lang.langId === item.langId) ? \'selected\' : \'\'}" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}" ref="css-icon"></span> &nbsp; <div class="flag-text">{item.Description}</div> &nbsp;&nbsp;&nbsp; </a> </div> </div>', 'language-menu,[data-is="language-menu"]{ margin: 0 auto; padding: 0, 2px; user-select: none; } language-menu .menu,[data-is="language-menu"] .menu{ margin: 0 auto; padding: 0; } language-menu a,[data-is="language-menu"] a{ margin: 0 auto; color: whitesmoke; } language-menu a:link,[data-is="language-menu"] a:link,language-menu a:visited,[data-is="language-menu"] a:visited{ text-decoration: none; } language-menu a:hover,[data-is="language-menu"] a:hover,language-menu a:active,[data-is="language-menu"] a:active{ color: yellow; text-decoration: none; } language-menu .flag-combo,[data-is="language-menu"] .flag-combo{ margin: 0 auto; } language-menu .flag-combo .flag-css,[data-is="language-menu"] .flag-combo .flag-css{ margin: 0px auto; padding-top: 1px; display: inline-block; } language-menu .flag-combo .flag-text,[data-is="language-menu"] .flag-combo .flag-text{ margin: 0 auto; display: inline-block; } language-menu .flag-combo .drop-symbol,[data-is="language-menu"] .flag-combo .drop-symbol{ margin: 0 auto; display: inline-block; } language-menu .flag-item,[data-is="language-menu"] .flag-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } language-menu .flag-item:hover,[data-is="language-menu"] .flag-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } language-menu .flag-item.selected,[data-is="language-menu"] .flag-item.selected{ background-color: darkorange; } language-menu .flag-item .flag-css,[data-is="language-menu"] .flag-item .flag-css{ margin: 0px auto; padding-top: 1px; width: 25px; display: inline-block; } language-menu .flag-item .flag-text,[data-is="language-menu"] .flag-item .flag-text{ margin: 0 auto; min-width: 80px; max-width: 120px; display: inline-block; } language-menu .language-dropbox,[data-is="language-menu"] .language-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } language-menu .language-dropbox.show,[data-is="language-menu"] .language-dropbox.show{ display: inline-block; z-index: 99999; }', '', function(opts) {


        let self = this;

        let updatecontent = () => {
            self.update();
        }

        let flags, dropItems;
        let initCtrls = () => {
            flags = self.refs['flags'];
            dropItems = self.refs['dropItems'];
        }
        let freeCtrls = () => {
            dropItems = null;
            flags = null;
        }

        this.isMultiple = () => {
            return lang && lang.languages && lang.languages.length > 1
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            flags.addEventListener('click', toggle);
            window.addEventListener('click', checkClickPosition);
        }
        let unbindEvents = () => {
            window.removeEventListener('click', checkClickPosition);
            flags.removeEventListener('click', toggle);
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onLanguageChanged = (e) => { updatecontent(); }

        this.selectItem = (e) => {
            toggle();
            let selLang = e.item.item;
            lang.change(selLang.langId);

            e.preventDefault();
            e.stopPropagation();
        }

        let toggle = () => {
            dropItems.classList.toggle('show');
            updatecontent();
        }
        let isInClassList = (elem, classList) => {
            let len = classList.length;
            let found = false;
            for (let i = 0; i < len; i++) {
                if (elem.matches(classList[i])) {
                    found = true;
                    break;
                }
            }
            return found;
        }
        let checkClickPosition = (e) => {

            let classList = ['.flag-combo', '.flag-css', '.flag-text', '.drop-synbol'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }

});
riot.tag2('links-menu', '<div class="menu"> <a ref="links" class="link-combo" href="javascript:;"> <span ref="showlinks" class="burger fas fa-bars"></span> </a> </div> <div ref="dropItems" class="links-dropbox"> <div each="{item in menus}"> <virtual if="{isShown(item)}"> <a class="link-item" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="link-css {item.icon}" ref="css-icon">&nbsp;</span> <div class="link-text">&nbsp;{item.text}</div> &nbsp;&nbsp;&nbsp; </a> </virtual> </div> </div>', 'links-menu,[data-is="links-menu"]{ margin: 0 auto; padding: 0 3px; user-select: none; width: 40px; } links-menu.hide,[data-is="links-menu"].hide{ display: none; } links-menu .menu,[data-is="links-menu"] .menu{ margin: 0 auto; padding: 0; } links-menu a,[data-is="links-menu"] a{ margin: 0 auto; color: whitesmoke; } links-menu a:link,[data-is="links-menu"] a:link,links-menu a:visited,[data-is="links-menu"] a:visited{ text-decoration: none; } links-menu a:hover,[data-is="links-menu"] a:hover,links-menu a:active,[data-is="links-menu"] a:active{ color: yellow; text-decoration: none; } links-menu .link-combo,[data-is="links-menu"] .link-combo{ margin: 0 auto; } links-menu .link-item,[data-is="links-menu"] .link-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } links-menu .link-item:hover,[data-is="links-menu"] .link-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } links-menu .link-item.selected,[data-is="links-menu"] .link-item.selected{ background-color: darkorange; } links-menu .link-item .link-css,[data-is="links-menu"] .link-item .link-css{ margin: 0px auto; width: 25px; display: inline-block; } links-menu .link-item .link-text,[data-is="links-menu"] .link-item .link-text{ margin: 0 auto; min-width: 80px; max-width: 125px; display: inline-block; } links-menu .links-dropbox,[data-is="links-menu"] .links-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } links-menu .links-dropbox.show,[data-is="links-menu"] .links-dropbox.show{ display: inline-block; z-index: 99999; }', 'class="{(menus && menus.length > 0) ? \'\' : \'hide\'}"', function(opts) {


        let self = this;

        this.menus = [];
        let updatecontent = () => {
            self.menus = (contents && contents.current) ? contents.current.links : [];
            self.update();
        }
        this.isShown = (item) => {
            let ret = true;
            let linkType = (item.type) ? item.type.toLowerCase() : '';
            if (linkType === 'screen' || linkType === 'url') {

                ret = item.id !== screens.current.screenId;
            }
            return ret;
        }

        let links, dropItems;
        let initCtrls = () => {
            links = self.refs['links'];
            dropItems = self.refs['dropItems'];
        }
        let freeCtrls = () => {
            dropItems = null;
            links = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)

            links.addEventListener('click', toggle);
            window.addEventListener('click', checkClickPosition);
        }
        let unbindEvents = () => {
            window.removeEventListener('click', checkClickPosition);
            links.removeEventListener('click', toggle);

            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onLanguageChanged = (e) =>  { updatecontent(); }
        let onContentChanged = (e) => { updatecontent();  }
        let onScreenChanged = (e) =>  { updatecontent(); }

        this.selectItem = (e) => {
            toggle();
            let selLink = e.item.item;
            let linkType = (selLink.type) ? selLink.type.toLowerCase() : '';
            if (linkType  === 'screen') {
                screens.show(selLink.id);
            }
            else if (linkType === 'url') {

                secure.nav(selLink.ref)
            }
            else if (linkType === 'cmd') {
                if (selLink.ref.toLowerCase() === 'signout') {
                    secure.signout();
                }
                else if (selLink.ref.toLowerCase() === 'exit') {
                    if (selLink.ref.toLowerCase() === 'exit')
                    secure.changeCustomer();
                }
            }
            else {
                console.log('Not implements type, data:', selLink);
            }
            e.preventDefault();
            e.stopPropagation();
        }

        let toggle = () => {
            dropItems.classList.toggle('show');
            updatecontent();
        }

        let isInClassList = (elem, classList) => {
            let len = classList.length;
            let found = false;
            for (let i = 0; i < len; i++) {
                if (elem.matches(classList[i])) {
                    found = true;
                    break;
                }
            }
            return found;
        }
        let checkClickPosition = (e) => {

            let classList = ['.link-combo', '.burger'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }

});
riot.tag2('flip-screen', '<div class="auto-container"> <div ref="flipper" class="flipper"> <div class="viewer-block"> <div class="content"> <yield from="viewer"></yield> </div> </div> <div class="entry-block"> <div class="content"> <yield from="entry"></yield> </div> </div> </div> </div>', 'flip-screen,[data-is="flip-screen"]{ margin: 0; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'auto-container\'; overflow: hidden; } flip-screen .auto-container,[data-is="flip-screen"] .auto-container{ margin: 0; padding: 0; grid-area: auto-container; border: 1px solid #f1f1f1; } flip-screen .flipper,[data-is="flip-screen"] .flipper{ margin: 0; padding: 0; position: relative; width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d; } flip-screen .auto-container .flipper.toggle,[data-is="flip-screen"] .auto-container .flipper.toggle{ transform: rotateY(180deg); } flip-screen .viewer-block,[data-is="flip-screen"] .viewer-block{ position: absolute; margin: 0; padding: 0; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(0deg); } flip-screen .entry-block,[data-is="flip-screen"] .entry-block{ position: absolute; width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); } flip-screen .content,[data-is="flip-screen"] .content{ position: relative; display: block; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;

        let flipper;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {}

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }

});
riot.tag2('rater-device-app', '<napp> <yield></yield> </napp>', 'rater-device-app,[data-is="rater-device-app"]{ position: relative; display: block; margin: 0; padding: 0; width: auto; height: auto; overflow: hidden; }', '', function(opts) {
});
riot.tag2('rater-web-app', '<napp> <navibar> <navi-item> <div class="banner"> <div class="caption">My Choice Rater Web{(content && content.title) ? \'&nbsp;-&nbsp;\' : \'&nbsp;\'}</div> <div class="title ">{(content && content.title) ? content.title : \'\'}</div> </div> </navi-item> <navi-item class="center"></navi-item> <navi-item class="right"><language-menu></language-menu></navi-item> <navi-item class="right"><links-menu></links-menu></navi-item> </navibar> <yield></yield> <statusbar></statusbar> </napp>', 'rater-web-app,[data-is="rater-web-app"]{ position: relative; display: block; margin: 0; padding: 0; width: auto; height: auto; overflow: hidden; } rater-web-app .banner .title,[data-is="rater-web-app"] .banner .title{ margin: 0; padding: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.2rem; } rater-web-app .banner .caption,[data-is="rater-web-app"] .banner .caption{ margin: 0; padding: 0; width: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.2rem; } @media only screen and (max-width: 700px) { rater-web-app .banner .caption,[data-is="rater-web-app"] .banner .caption{ width: 0; visibility: hidden; } } rater-web-app language-menu,[data-is="rater-web-app"] language-menu{ display: flex; margin: 0 auto; padding: 0; align-items: center; justify-content: stretch; } rater-web-app links-menu,[data-is="rater-web-app"] links-menu{ display: flex; margin: 0 auto; padding: 0; align-items: center; justify-content: stretch; }', '', function(opts) {


        let self = this;
        this.content = {
            title: ''
        }
        this.hasContent = () => { return (this.content !== undefined && this.content != null) }

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : { title: '' };
            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('branch-editor', '<div class="entry"> <tabcontrol class="tabs" content="{opts.content}"> <tabheaders content="{opts.content}"> <tabheader for="default" content="{opts.content}"> <span class="fas fa-cog"></span> {opts.content.entry.tabDefault} </tabheader> <tabheader for="miltilang" content="{opts.content}"> <span class="fas fa-globe-americas"></span> {opts.content.entry.tabMultiLang} </tabheader> </tabheaders> <tabpages> <tabpage name="default"> <branch-entry ref="EN" langid=""></branch-entry> </tabpage> <tabpage name="miltilang"> <virtual if="{lang.languages}"> <virtual each="{item in lang.languages}"> <virtual if="{item.langId !== \'EN\'}"> <div class="panel-header" langid="{item.langId}"> &nbsp;&nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}"></span> &nbsp;{item.Description}&nbsp; </div> <div class="panel-body" langid="{item.langId}"> <branch-entry ref="{item.langId}" langid="{item.langId}"></branch-entry> </div> </virtual> </virtual> </virtual> </tabpage> </tabpages> </tabcontrol> <div class="tool"> <button class="float-button save" onclick="{save}"><span class="fas fa-save"></span></button> <button class="float-button cancel" onclick="{cancel}"><span class="fas fa-times"></span></button> </div> </div>', 'branch-editor,[data-is="branch-editor"]{ margin: 0 auto; padding: 0; width: 100%; max-width: 800px; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'entry\'; background-color: white; overflow: hidden; } branch-editor>.entry,[data-is="branch-editor"]>.entry{ grid-area: entry; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } branch-editor>.entry .tabs,[data-is="branch-editor"]>.entry .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } branch-editor>.entry .tool,[data-is="branch-editor"]>.entry .tool{ grid-area: tool; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto; grid-template-areas: \'. .\' \'btn-cancel .\' \'btn-save .\'; margin: 0 auto; margin-left: 3px; padding: 0; width: 100%; height: 100%; overflow: hidden; } branch-editor>.entry .tool .float-button,[data-is="branch-editor"]>.entry .tool .float-button{ margin: 0 auto; padding: 0; border: none; outline: none; border-radius: 50%; height: 40px; width: 40px; color: whitesmoke; background: silver; cursor: pointer; } branch-editor>.entry .tool .float-button:hover,[data-is="branch-editor"]>.entry .tool .float-button:hover{ color: whitesmoke; background: forestgreen; } branch-editor>.entry .tool .float-button.save,[data-is="branch-editor"]>.entry .tool .float-button.save{ grid-area: btn-save; } branch-editor>.entry .tool .float-button.cancel,[data-is="branch-editor"]>.entry .tool .float-button.cancel{ grid-area: btn-cancel; } branch-editor .panel-header,[data-is="branch-editor"] .panel-header{ margin: 0 auto; padding: 0; padding-top: 3px; width: 100%; height: 30px; color: white; background: cornflowerblue; border-radius: 5px 5px 0 0; } branch-editor .panel-body,[data-is="branch-editor"] .panel-body{ margin: 0 auto; margin-bottom: 5px; padding: 2px; width: 100%; border: 1px solid cornflowerblue; }', '', function(opts) {


        let self = this;
        let screenId = 'branch-manage';

        let branchId = '';
        let ctrls = [];

        let defaultContent = {
            entry: {
                tabDefault: 'Default',
                tabMultiLang: 'Languages'
            }
        }
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        this.save = (e) => {
            let item;
            let items = [];
            ctrls.forEach(oRef => {
                item = (oRef.entry) ? oRef.entry.getItem() : null;
                if (item) {
                    item.langId = oRef.langId;
                    items.push(item)
                }
            });
            branchmanager.save(items);
            events.raise(events.name.EndEditBranch)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditBranch)
        }

        findCtrl = (langId) => {
            let ctrl;
            let tabpages = self.tags['tabcontrol'].tags['tabpages'].tags['tabpage'];
            for (let i = 0; i < tabpages.length; i++) {
                let tp = tabpages[i];
                ctrl = tp.refs[langId];
                if (ctrl) break;
            }
            return ctrl;
        }

        this.setup = (item) => {
            let isNew = false;
            branchId = item.branchId;
            if (branchId === undefined || branchId === null || branchId.trim() === '') {
                isNew = true;
            }
            ctrls = [];

            let loader = window.branchmanager;

            lang.languages.forEach(lg => {
                let ctrl = findCtrl(lg.langId)
                let original = (isNew) ? clone(item) : loader.find(lg.langId, branchId);

                if (ctrl) {
                    let obj = {
                        langId: lg.langId,
                        entry: ctrl,
                        scrObj: original
                    }
                    ctrl.setup(original);
                    ctrls.push(obj)
                }
            });
        }

});
riot.tag2('branch-entry', '<ninput ref="branchName" title="{content.entry.branchName}" type="text" name="branchName"></ninput> <div class="padtop"></div>', 'branch-entry,[data-is="branch-entry"]{ margin: 0; padding: 0; width: 100%; height: 100%; } branch-entry .padtop,[data-is="branch-entry"] .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; }', '', function(opts) {
        let self = this;
        let screenId = 'branch-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        let defaultContent = {
            entry: {
                branchName: 'Branch Name'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        let branchName;

        let initCtrls = () => {
            branchName = self.refs['branchName'];
        }
        let freeCtrls = () => {
            branchName = null;
        }
        let clearInputs = () => {
            branchName.clear();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {

                if (branchName) editObj.branchName = branchName.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {

                if (branchName) branchName.value(editObj.branchName);
            }
        }

        this.setup = (item) => {
            clearInputs();

            origObj = clone(item);
            editObj = clone(item);

            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();

            let hasId = (editObj.branchId !== undefined && editObj.branchId != null)
            let isDirty = !hasId || !equals(origObj, editObj);

            return (isDirty) ? editObj : null;
        }

});

riot.tag2('branch-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <branch-view ref="viewer" class="view"></branch-view> </yield> <yield to="entry"> <branch-editor ref="entry" class="entry"></branch-editor> </yield> </flip-screen>', 'branch-manage,[data-is="branch-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } branch-manage .view,[data-is="branch-manage"] .view,branch-manage .entry,[data-is="branch-manage"] .entry{ margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; overflow: hidden; } branch-manage .entry,[data-is="branch-manage"] .entry{ margin: 0 auto; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Title'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {
            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BeginEditBranch, onBeginEdit)
            addEvt(events.name.EndEditBranch, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditBranch, onEndEdit)
            delEvt(events.name.BeginEditBranch, onBeginEdit)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onBeginEdit = (e) => {
            if (flipper) {
                flipper.toggle();
                let item = e.detail.data.item;
                if (entry) entry.setup(item);
            }

        }
        let onEndEdit = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});
riot.tag2('branch-view', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{addnew}"> <span class="fas fa-plus">&nbsp;</span> </button> <button class="float-button" onclick="{refresh}"> <span class="fas fa-sync">&nbsp;</span> </button> </div> <div ref="grid" class="gridarea"></div> </div>', 'branch-view,[data-is="branch-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } branch-view>.scrarea,[data-is="branch-view"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea gridarea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } branch-view>.scrarea>.toolarea,[data-is="branch-view"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } branch-view>.scrarea>.toolarea .float-button,[data-is="branch-view"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } branch-view>.scrarea>.toolarea .float-button:hover,[data-is="branch-view"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } branch-view>.scrarea>.gridarea,[data-is="branch-view"]>.scrarea>.gridarea{ grid-area: gridarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } branch-view .tabulator-row button,[data-is="branch-view"] .tabulator-row button{ margin: 0 auto; padding: 0px; width: 100%; font-size: small; color: inherit; background: transparent; border: none; outline: none; cursor: pointer; } branch-view .tabulator-row button:hover,[data-is="branch-view"] .tabulator-row button:hover{ color: forestgreen; } branch-view .tabulator-row button>span,[data-is="branch-view"] .tabulator-row button>span{ margin: 0 auto; padding: 0; }', '', function(opts) {


        let self = this;
        let table;
        let screenId = 'branch-manage';

        let defaultContent = {
            title: 'Branch Management',
            columns: []
        }
        this.content = defaultContent;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {
            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);
            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]
            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = branchmanager.current;
            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
                if (table) table.redraw(true);
            }
        }

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BranchListChanged, onBranchListChanged)
            addEvt(events.name.EndEditBranch, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditBranch, onEndEdit)
            delEvt(events.name.BranchListChanged, onBranchListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }
        let onScreenChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                branchmanager.load();
            }
        }
        let onBranchListChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            events.raise(events.name.BeginEditBranch, { item: data })
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();

        }
        let onEndEdit = (e) => {
            syncData();
            table.redraw(true);
        }

        this.addnew = (e) => {
            let data = {
                branchId: null,
                branchName: null
            };
            events.raise(events.name.BeginEditBranch, { item: data })
        }

        this.refresh = (e) => {
            branchmanager.load();
            updatecontent();
        }

});
riot.tag2('device-editor', '<div class="entry"> <tabcontrol class="tabs" content="{opts.content}"> <tabheaders content="{opts.content}"> <tabheader for="default" content="{opts.content}"> <span class="fas fa-cog"></span> {opts.content.entry.tabDefault} </tabheader> <tabheader for="miltilang" content="{opts.content}"> <span class="fas fa-globe-americas"></span> {opts.content.entry.tabMultiLang} </tabheader> </tabheaders> <tabpages> <tabpage name="default"> <device-entry ref="EN" langid=""></device-entry> </tabpage> <tabpage name="miltilang"> <virtual if="{lang.languages}"> <virtual each="{item in lang.languages}"> <virtual if="{item.langId !==\'EN\'}"> <div class="panel-header" langid="{item.langId}"> &nbsp;&nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}"></span> &nbsp;{item.Description}&nbsp; </div> <div class="panel-body" langid="{item.langId}"> <device-entry ref="{item.langId}" langid="{item.langId}"></device-entry> </div> </virtual> </virtual> </virtual> </tabpage> </tabpages> </tabcontrol> <div class="tool"> <button class="float-button save" onclick="{save}"><span class="fas fa-save"></span></button> <button class="float-button cancel" onclick="{cancel}"><span class="fas fa-times"></span></button> </div> </div>', 'device-editor,[data-is="device-editor"]{ margin: 0 auto; padding: 0; width: 100%; max-width: 800px; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'entry\'; background-color: white; overflow: hidden; } device-editor>.entry,[data-is="device-editor"]>.entry{ grid-area: entry; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } device-editor>.entry .tabs,[data-is="device-editor"]>.entry .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } device-editor>.entry .tool,[data-is="device-editor"]>.entry .tool{ grid-area: tool; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto; grid-template-areas: \'. .\' \'btn-cancel .\' \'btn-save .\'; margin: 0 auto; margin-left: 3px; padding: 0; width: 100%; height: 100%; overflow: hidden; } device-editor>.entry .tool .float-button,[data-is="device-editor"]>.entry .tool .float-button{ margin: 0 auto; padding: 0; border: none; outline: none; border-radius: 50%; height: 40px; width: 40px; color: whitesmoke; background: silver; cursor: pointer; } device-editor>.entry .tool .float-button:hover,[data-is="device-editor"]>.entry .tool .float-button:hover{ color: whitesmoke; background: forestgreen; } device-editor>.entry .tool .float-button.save,[data-is="device-editor"]>.entry .tool .float-button.save{ grid-area: btn-save; } device-editor>.entry .tool .float-button.cancel,[data-is="device-editor"]>.entry .tool .float-button.cancel{ grid-area: btn-cancel; } device-editor .panel-header,[data-is="device-editor"] .panel-header{ margin: 0 auto; padding: 0; padding-top: 3px; width: 100%; height: 30px; color: white; background: cornflowerblue; border-radius: 5px 5px 0 0; } device-editor .panel-body,[data-is="device-editor"] .panel-body{ margin: 0 auto; margin-bottom: 5px; padding: 2px; width: 100%; border: 1px solid cornflowerblue; }', '', function(opts) {


        let self = this;
        let screenId = 'device-manage';

        let deviceId = '';
        let ctrls = [];

        let defaultContent = {
            entry: {
                tabDefault: 'Default',
                tabMultiLang: 'Languages'
            }
        }
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        this.save = (e) => {
            let item;
            let items = [];
            ctrls.forEach(oRef => {
                item = (oRef.entry) ? oRef.entry.getItem() : null;
                if (item) {
                    item.langId = oRef.langId;
                    items.push(item)
                }
            });
            devicemanager.save(items);
            events.raise(events.name.EndEditDevice)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditDevice)
        }

        findCtrl = (langId) => {
            let ctrl;
            let tabpages = self.tags['tabcontrol'].tags['tabpages'].tags['tabpage'];
            for (let i = 0; i < tabpages.length; i++) {
                let tp = tabpages[i];
                ctrl = tp.refs[langId];
                if (ctrl) break;
            }
            return ctrl;
        }

        this.setup = (item) => {
            let isNew = false;

            deviceId = item.deviceId;
            if (deviceId === undefined || deviceId === null || deviceId.trim() === '') {
                isNew = true;
            }
            ctrls = [];

            let loader = window.devicemanager;

            lang.languages.forEach(lg => {
                let ctrl = findCtrl(lg.langId);
                let original = (isNew) ? clone(item) : loader.find(lg.langId, deviceId);

                if (ctrl) {
                    let obj = {
                        langId: lg.langId,
                        entry: ctrl,
                        scrObj: original
                    }
                    ctrl.setup(original);
                    ctrls.push(obj)
                }
            });
        }

});
riot.tag2('device-entry', '<div class="padtop"></div> <div class="padtop"></div> <ninput ref="deviceName" title="{content.entry.deviceName}" type="text" name="deviceName"></ninput> <ninput ref="location" title="{content.entry.location}" type="text" name="location"></ninput> <virtual if="{isDefault()}"> <nselect ref="deviceTypes" title="{content.entry.deviceTypeId}"></nselect> </virtual>', 'device-entry,[data-is="device-entry"]{ margin: 0; padding: 0; width: 100%; height: 100%; } device-entry .padtop,[data-is="device-entry"] .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; }', '', function(opts) {
        let self = this;
        let screenId = 'device-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        let defaultContent = {
            entry: {
                deviceName: 'Device Name',
                deviceTypeId: 'Device Type',
                location: 'Location'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        let deviceName, location;
        let deviceTypes;

        let initCtrls = () => {
            deviceName = self.refs['deviceName'];
            deviceTypes = self.refs['deviceTypes'];
            location = self.refs['location'];
        }
        let freeCtrls = () => {
            location = null;
            deviceTypes = null;
            deviceName = null;
        }
        let clearInputs = () => {
            location.clear();

            if (deviceTypes) deviceTypes.clear();
            deviceName.clear();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.DeviceTypeListChanged, onDeviceTypeListChanged)
            addEvt(events.name.OrgListChanged, onOrgListChanged);
        }
        let unbindEvents = () => {
            delEvt(events.name.OrgListChanged, onOrgListChanged);
            delEvt(events.name.DeviceTypeListChanged, onDeviceTypeListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let onDeviceTypeListChanged = (e) => { updatecontent(); }
        let onOrgListChanged = (e) => {
        }

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {

                if (deviceName) editObj.DeviceName = deviceName.value();
                if (location) editObj.Location = location.value();
                if (deviceTypes) editObj.deviceTypeId = deviceTypes.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {

                if (deviceName) deviceName.value(editObj.DeviceName);
                if (location) location.value(editObj.Location);
                if (deviceTypes && editObj.deviceTypeId) {
                    deviceTypes.value(editObj.deviceTypeId.toString());
                }
            }
        }

        this.setup = (item) => {
            clearInputs();

            if (deviceTypes) {
                deviceTypes.setup(master.devicetypes.current, { valueField:'deviceTypeId', textField:'Type' });
            }

            origObj = clone(item);
            editObj = clone(item);

            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();

            let hasId = (editObj.deviceId !== undefined && editObj.deviceId != null)
            let isDirty = !hasId || !equals(origObj, editObj);

            return (isDirty) ? editObj : null;
        }

});
riot.tag2('device-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <device-view ref="viewer" class="view"></device-view> </yield> <yield to="entry"> <device-editor ref="entry" class="entry"></device-editor> </yield> </flip-screen>', 'device-manage,[data-is="device-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } device-manage .view,[data-is="device-manage"] .view,device-manage .entry,[data-is="device-manage"] .entry{ margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; overflow: hidden; } device-manage .entry,[data-is="device-manage"] .entry{ margin: 0 auto; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Title'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BeginEditDevice, onBeginEdit)
            addEvt(events.name.EndEditDevice, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditDevice, onEndEdit)
            delEvt(events.name.BeginEditDevice, onBeginEdit)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onBeginEdit = (e) => {

            if (flipper) {
                flipper.toggle();
                let item = e.detail.data.item;

                if (entry) entry.setup(item);
            }

        }
        let onEndEdit = (e) => {

            if (flipper) {
                flipper.toggle();
            }
        }

});
riot.tag2('device-view', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{addnew}"> <span class="fas fa-plus">&nbsp;</span> </button> <button class="float-button" onclick="{refresh}"> <span class="fas fa-sync">&nbsp;</span> </button> </div> <div ref="grid" class="gridarea"></div> </div>', 'device-view,[data-is="device-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } device-view>.scrarea,[data-is="device-view"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea gridarea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } device-view>.scrarea>.toolarea,[data-is="device-view"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } device-view>.scrarea>.toolarea .float-button,[data-is="device-view"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } device-view>.scrarea>.toolarea .float-button:hover,[data-is="device-view"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } device-view>.scrarea>.gridarea,[data-is="device-view"]>.scrarea>.gridarea{ grid-area: gridarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } device-view .tabulator-row button,[data-is="device-view"] .tabulator-row button{ margin: 0 auto; padding: 0px; width: 100%; font-size: small; color: inherit; background: transparent; border: none; outline: none; cursor: pointer; } device-view .tabulator-row button:hover,[data-is="device-view"] .tabulator-row button:hover{ color: forestgreen; } device-view .tabulator-row button>span,[data-is="device-view"] .tabulator-row button>span{ margin: 0 auto; padding: 0; }', '', function(opts) {


        let self = this;
        let table;
        let screenId = 'device-manage';

        let defaultContent = {
            title: 'Device Management',
            columns: []
        }
        this.content = defaultContent;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {

            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);

            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]

            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = devicemanager.current;
            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                self.update();
                if (table) table.redraw(true);
            }
        }

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.DeviceListChanged, onDeviceListChanged)
            addEvt(events.name.EndEditDevice, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditDevice, onEndEdit)
            delEvt(events.name.DeviceListChanged, onDeviceListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }
        let onScreenChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                devicemanager.load();
            }
        }
        let onDeviceListChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            events.raise(events.name.BeginEditDevice, { item: data })
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();

        }
        let onEndEdit = (e) => {
            syncData();
            table.redraw(true);
        }

        this.addnew = (e) => {
            let data = {
                deviceId: null,
                memberId: null,
                deviceName: null,
                location: null,
                deviceTypeId: null
            };
            events.raise(events.name.BeginEditDevice, { item: data })
        }
        this.refresh = (e) => {
            devicemanager.load();
            updatecontent();
        }

});
riot.tag2('admin-home', '<div class="client-area"> <div class="info-panel"> <div class="info-box"> <div class="info-data"> <div class="info-data-value">3.82</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Average </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">87%</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Average % </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">200 K+</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Total Votes </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">30</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Wait list </div> </div> </div> </div> <div class="chart-panel"> <div class="bar-chart"> <div class="chart-box" ref="bar1"></div> </div> <div class="pie-chart"> <div class="chart-box" ref="pie1"></div> </div> </div> </div>', 'admin-home,[data-is="admin-home"]{ display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'client-area\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } admin-home>.client-area,[data-is="admin-home"]>.client-area{ grid-area: client-area; display: grid; grid-auto-flow: row; grid-auto-rows: max-content; grid-gap: 10px; margin: 0; padding: 5px; width: 100%; height: 100%; border: 1px dotted navy; overflow: auto; } admin-home>.client-area .chart-panel,[data-is="admin-home"]>.client-area .chart-panel{ display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); grid-gap: 10px; grid-auto-rows: minmax(200px, max-content); margin: 0; padding: 5px; width: 100%; height: auto; } admin-home>.client-area .bar-chart,[data-is="admin-home"]>.client-area .bar-chart{ position: relative; display: block; margin: 0; padding: 5px; width: 100%; height: 100%; background: whitesmoke; border: 1px dotted orchid; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } admin-home>.client-area .bar-chart .chart-box,[data-is="admin-home"]>.client-area .bar-chart .chart-box{ display: block; position: absolute; margin: 0; padding: 5px; width: 100%; height: 100%; min-width: 100px; } admin-home .bar-chart .chart-box .highcharts-background,[data-is="admin-home"] .bar-chart .chart-box .highcharts-background{ fill: rgba(250, 250, 250, .1); } admin-home>.client-area .pie-chart,[data-is="admin-home"]>.client-area .pie-chart{ position: relative; display: block; margin: 0; padding: 5px; width: 100%; height: 100%; background: whitesmoke; border: 1px dotted skyblue; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } admin-home>.client-area .pie-chart .chart-box,[data-is="admin-home"]>.client-area .pie-chart .chart-box{ display: block; margin: 0 auto; padding: 5px; width: 100%; height: 100%; } admin-home>.client-area .pie-chart .chart-box .highcharts-background,[data-is="admin-home"]>.client-area .pie-chart .chart-box .highcharts-background{ fill: rgba(250, 250, 250, .1); } admin-home>.client-area .info-panel,[data-is="admin-home"]>.client-area .info-panel{ display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); grid-gap: 10px; grid-auto-rows: max-content; margin: 0; padding: 5px; width: 100%; height: auto; } admin-home>.client-area .info-box,[data-is="admin-home"]>.client-area .info-box{ display: inline-block; margin: 0; padding: 5px; height: fit-content; font-size: 1rem; background: wheat; border: 1px dotted chocolate; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } @media only screen and (min-width: 400px) { admin-home>.client-area .info-box,[data-is="admin-home"]>.client-area .info-box{ background: olive; } } @media only screen and (min-width: 600px) { admin-home>.client-area .info-box,[data-is="admin-home"]>.client-area .info-box{ background: hotpink; } } @media only screen and (min-width: 800px) { admin-home>.client-area .info-box,[data-is="admin-home"]>.client-area .info-box{ background: fuchsia; } } @media only screen and (min-width: 1000px) { admin-home>.client-area .info-box,[data-is="admin-home"]>.client-area .info-box{ background: grey; } } admin-home>.client-area .info-box .info-data-value,[data-is="admin-home"]>.client-area .info-box .info-data-value{ display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: auto; font-size: 2.5em; font-weight: bold; text-align: center; } admin-home>.client-area .info-box .info-caption,[data-is="admin-home"]>.client-area .info-box .info-caption{ display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: auto; text-align: center; } admin-home>.client-area .info-box .info-caption-icon,[data-is="admin-home"]>.client-area .info-box .info-caption-icon{ display: inline-block; margin: 0; padding: 0; height: auto; font-size: 0.7em; font-weight: normal; } admin-home>.client-area .info-box .info-caption-text,[data-is="admin-home"]>.client-area .info-box .info-caption-text{ display: inline-block; margin: 0; padding: 0; height: auto; font-size: 0.7em; font-weight: normal; }', '', function(opts) {


        let self = this;
        let screenId = 'admin-home';

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

        let defaultContent = {
            title: 'Admin Home Page.'
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

        let bar1, pie1;
        let initCtrls = () => {
            bar1 = self.refs['bar1']
            pie1 = self.refs['pie1']
        }
        let freeCtrls = () => {
            pie1 = null
            bar1 = null
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

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

                },
                xAxis: {

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

                    headerFormat: '',

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
});
riot.tag2('avg-monitor', '', 'avg-monitor,[data-is="avg-monitor"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
        let self = this;

        let defaultContent = {
            title: 'Admin Home Page.'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;

            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }

        this.refresh = () => {
            updatecontent()
        }

});

riot.tag2('avg-pct-monitor', '', 'avg-pct-monitor,[data-is="avg-pct-monitor"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
        let self = this;

        let defaultContent = {
            title: 'Admin Home Page.'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;

            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }

        this.refresh = () => {
            updatecontent()
        }

});
riot.tag2('count-monitor', '', 'count-monitor,[data-is="count-monitor"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
        let self = this;

        let defaultContent = {
            title: 'Admin Home Page.'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;

            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }

        this.refresh = () => {
            updatecontent()
        }

});
riot.tag2('exclusive-home', '<div class="client-area"> <div class="info-panel"> <div class="info-box"> <div class="info-data"> <div class="info-data-value">3.82</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Average </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">87%</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Average % </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">200 K+</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Total Votes </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">30</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Wait list </div> </div> </div> </div> <div class="chart-panel"> <div class="bar-chart"> <div class="chart-box" ref="bar1"></div> </div> <div class="pie-chart"> <div class="chart-box" ref="pie1"></div> </div> </div> </div>', 'exclusive-home,[data-is="exclusive-home"]{ display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'client-area\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } exclusive-home>.client-area,[data-is="exclusive-home"]>.client-area{ grid-area: client-area; display: grid; grid-auto-flow: row; grid-auto-rows: max-content; grid-gap: 10px; margin: 0; padding: 5px; width: 100%; height: 100%; border: 1px dotted navy; overflow: auto; } exclusive-home>.client-area .chart-panel,[data-is="exclusive-home"]>.client-area .chart-panel{ display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); grid-gap: 10px; grid-auto-rows: minmax(200px, max-content); margin: 0; padding: 5px; width: 100%; height: auto; } exclusive-home>.client-area .bar-chart,[data-is="exclusive-home"]>.client-area .bar-chart{ position: relative; display: block; margin: 0; padding: 5px; width: 100%; height: 100%; background: whitesmoke; border: 1px dotted orchid; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } exclusive-home>.client-area .bar-chart .chart-box,[data-is="exclusive-home"]>.client-area .bar-chart .chart-box{ display: block; position: absolute; margin: 0; padding: 5px; width: 100%; height: 100%; min-width: 100px; } exclusive-home .bar-chart .chart-box .highcharts-background,[data-is="exclusive-home"] .bar-chart .chart-box .highcharts-background{ fill: rgba(250, 250, 250, .1); } exclusive-home>.client-area .pie-chart,[data-is="exclusive-home"]>.client-area .pie-chart{ position: relative; display: block; margin: 0; padding: 5px; width: 100%; height: 100%; background: whitesmoke; border: 1px dotted skyblue; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } exclusive-home>.client-area .pie-chart .chart-box,[data-is="exclusive-home"]>.client-area .pie-chart .chart-box{ display: block; margin: 0 auto; padding: 5px; width: 100%; height: 100%; } exclusive-home>.client-area .pie-chart .chart-box .highcharts-background,[data-is="exclusive-home"]>.client-area .pie-chart .chart-box .highcharts-background{ fill: rgba(250, 250, 250, .1); } exclusive-home>.client-area .info-panel,[data-is="exclusive-home"]>.client-area .info-panel{ display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); grid-gap: 10px; grid-auto-rows: max-content; margin: 0; padding: 5px; width: 100%; height: auto; } exclusive-home>.client-area .info-box,[data-is="exclusive-home"]>.client-area .info-box{ display: inline-block; margin: 0; padding: 5px; height: fit-content; font-size: 1rem; background: wheat; border: 1px dotted chocolate; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } @media only screen and (min-width: 400px) { exclusive-home>.client-area .info-box,[data-is="exclusive-home"]>.client-area .info-box{ background: olive; } } @media only screen and (min-width: 600px) { exclusive-home>.client-area .info-box,[data-is="exclusive-home"]>.client-area .info-box{ background: hotpink; } } @media only screen and (min-width: 800px) { exclusive-home>.client-area .info-box,[data-is="exclusive-home"]>.client-area .info-box{ background: fuchsia; } } @media only screen and (min-width: 1000px) { exclusive-home>.client-area .info-box,[data-is="exclusive-home"]>.client-area .info-box{ background: grey; } } exclusive-home>.client-area .info-box .info-data-value,[data-is="exclusive-home"]>.client-area .info-box .info-data-value{ display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: auto; font-size: 2.5em; font-weight: bold; text-align: center; } exclusive-home>.client-area .info-box .info-caption,[data-is="exclusive-home"]>.client-area .info-box .info-caption{ display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: auto; text-align: center; } exclusive-home>.client-area .info-box .info-caption-icon,[data-is="exclusive-home"]>.client-area .info-box .info-caption-icon{ display: inline-block; margin: 0; padding: 0; height: auto; font-size: 0.7em; font-weight: normal; } exclusive-home>.client-area .info-box .info-caption-text,[data-is="exclusive-home"]>.client-area .info-box .info-caption-text{ display: inline-block; margin: 0; padding: 0; height: auto; font-size: 0.7em; font-weight: normal; }', '', function(opts) {


        let self = this;
        let screenId = 'exclusive-home';

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

        let bar1, pie1;
        let initCtrls = () => {
            bar1 = self.refs['bar1']
            pie1 = self.refs['pie1']
        }
        let freeCtrls = () => {
            pie1 = null
            bar1 = null
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

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

                },
                xAxis: {

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

                    headerFormat: '',

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
});

riot.tag2('staff-home', '<div class="client-area"> <div class="info-panel"> <div class="info-box"> <div class="info-data"> <div class="info-data-value">3.82</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Average </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">87%</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Average % </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">200 K+</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Total Votes </div> </div> </div> <div class="info-box"> <div class="info-data"> <div class="info-data-value">30</div> </div> <div class="info-caption"> <div class="info-caption-icon"> <span class="fas fa-calendar"></span> </div> <div class="info-caption-text"> Wait list </div> </div> </div> </div> <div class="chart-panel"> <div class="bar-chart"> <div class="chart-box" ref="bar1"></div> </div> <div class="pie-chart"> <div class="chart-box" ref="pie1"></div> </div> </div> </div>', 'staff-home,[data-is="staff-home"]{ display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'client-area\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-home>.client-area,[data-is="staff-home"]>.client-area{ grid-area: client-area; display: grid; grid-auto-flow: row; grid-auto-rows: max-content; grid-gap: 10px; margin: 0; padding: 5px; width: 100%; height: 100%; border: 1px dotted navy; overflow: auto; } staff-home>.client-area .chart-panel,[data-is="staff-home"]>.client-area .chart-panel{ display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); grid-gap: 10px; grid-auto-rows: minmax(200px, max-content); margin: 0; padding: 5px; width: 100%; height: auto; } staff-home>.client-area .bar-chart,[data-is="staff-home"]>.client-area .bar-chart{ position: relative; display: block; margin: 0; padding: 5px; width: 100%; height: 100%; background: whitesmoke; border: 1px dotted orchid; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } staff-home>.client-area .bar-chart .chart-box,[data-is="staff-home"]>.client-area .bar-chart .chart-box{ display: block; position: absolute; margin: 0; padding: 5px; width: 100%; height: 100%; min-width: 100px; } staff-home .bar-chart .chart-box .highcharts-background,[data-is="staff-home"] .bar-chart .chart-box .highcharts-background{ fill: rgba(250, 250, 250, .1); } staff-home>.client-area .pie-chart,[data-is="staff-home"]>.client-area .pie-chart{ position: relative; display: block; margin: 0; padding: 5px; width: 100%; height: 100%; background: whitesmoke; border: 1px dotted skyblue; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } staff-home>.client-area .pie-chart .chart-box,[data-is="staff-home"]>.client-area .pie-chart .chart-box{ display: block; margin: 0 auto; padding: 5px; width: 100%; height: 100%; } staff-home>.client-area .pie-chart .chart-box .highcharts-background,[data-is="staff-home"]>.client-area .pie-chart .chart-box .highcharts-background{ fill: rgba(250, 250, 250, .1); } staff-home>.client-area .info-panel,[data-is="staff-home"]>.client-area .info-panel{ display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); grid-gap: 10px; grid-auto-rows: max-content; margin: 0; padding: 5px; width: 100%; height: auto; } staff-home>.client-area .info-box,[data-is="staff-home"]>.client-area .info-box{ display: inline-block; margin: 0; padding: 5px; height: fit-content; font-size: 1rem; background: wheat; border: 1px dotted chocolate; border-radius: 5px; box-shadow: 5px 5px 8px -3px rgba(0, 0, 0, 0.4); } @media only screen and (min-width: 400px) { staff-home>.client-area .info-box,[data-is="staff-home"]>.client-area .info-box{ background: olive; } } @media only screen and (min-width: 600px) { staff-home>.client-area .info-box,[data-is="staff-home"]>.client-area .info-box{ background: hotpink; } } @media only screen and (min-width: 800px) { staff-home>.client-area .info-box,[data-is="staff-home"]>.client-area .info-box{ background: fuchsia; } } @media only screen and (min-width: 1000px) { staff-home>.client-area .info-box,[data-is="staff-home"]>.client-area .info-box{ background: grey; } } staff-home>.client-area .info-box .info-data-value,[data-is="staff-home"]>.client-area .info-box .info-data-value{ display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: auto; font-size: 2.5em; font-weight: bold; text-align: center; } staff-home>.client-area .info-box .info-caption,[data-is="staff-home"]>.client-area .info-box .info-caption{ display: inline-block; margin: 0 auto; padding: 0; width: 100%; height: auto; text-align: center; } staff-home>.client-area .info-box .info-caption-icon,[data-is="staff-home"]>.client-area .info-box .info-caption-icon{ display: inline-block; margin: 0; padding: 0; height: auto; font-size: 0.7em; font-weight: normal; } staff-home>.client-area .info-box .info-caption-text,[data-is="staff-home"]>.client-area .info-box .info-caption-text{ display: inline-block; margin: 0; padding: 0; height: auto; font-size: 0.7em; font-weight: normal; }', '', function(opts) {


        let self = this;
        let screenId = 'staff-home';

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

        let defaultContent = {
            title: 'Staff Home Page.'
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

        let bar1, pie1;
        let initCtrls = () => {
            bar1 = self.refs['bar1']
            pie1 = self.refs['pie1']
        }
        let freeCtrls = () => {
            pie1 = null
            bar1 = null
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

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

                },
                xAxis: {

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

                    headerFormat: '',

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
});
riot.tag2('member-editor', '<div class="entry"> <tabcontrol class="tabs" content="{opts.content}"> <tabheaders content="{opts.content}"> <tabheader for="default" content="{opts.content}"> <span class="fas fa-cog"></span> {opts.content.entry.tabDefault} </tabheader> <tabheader for="miltilang" content="{opts.content}"> <span class="fas fa-globe-americas"></span> {opts.content.entry.tabMultiLang} </tabheader> </tabheaders> <tabpages> <tabpage name="default"> <member-entry ref="EN" langid=""></member-entry> </tabpage> <tabpage name="miltilang"> <virtual if="{lang.languages}"> <virtual each="{item in lang.languages}"> <virtual if="{item.langId !==\'EN\'}"> <div class="panel-header" langid="{item.langId}"> &nbsp;&nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}"></span> &nbsp;{item.Description}&nbsp; </div> <div class="panel-body" langid="{item.langId}"> <member-entry ref="{item.langId}" langid="{item.langId}"></member-entry> </div> </virtual> </virtual> </virtual> </tabpage> </tabpages> </tabcontrol> <div class="tool"> <button class="float-button save" onclick="{save}"><span class="fas fa-save"></span></button> <button class="float-button cancel" onclick="{cancel}"><span class="fas fa-times"></span></button> </div> </div>', 'member-editor,[data-is="member-editor"]{ margin: 0 auto; padding: 0; width: 100%; max-width: 800px; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'entry\'; background-color: white; overflow: hidden; } member-editor>.entry,[data-is="member-editor"]>.entry{ grid-area: entry; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } member-editor>.entry .tabs,[data-is="member-editor"]>.entry .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } member-editor>.entry .tool,[data-is="member-editor"]>.entry .tool{ grid-area: tool; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto; grid-template-areas: \'. .\' \'btn-cancel .\' \'btn-save .\'; margin: 0 auto; margin-left: 3px; padding: 0; width: 100%; height: 100%; overflow: hidden; } member-editor>.entry .tool .float-button,[data-is="member-editor"]>.entry .tool .float-button{ margin: 0 auto; padding: 0; border: none; outline: none; border-radius: 50%; height: 40px; width: 40px; color: whitesmoke; background: silver; cursor: pointer; } member-editor>.entry .tool .float-button:hover,[data-is="member-editor"]>.entry .tool .float-button:hover{ color: whitesmoke; background: forestgreen; } member-editor>.entry .tool .float-button.save,[data-is="member-editor"]>.entry .tool .float-button.save{ grid-area: btn-save; } member-editor>.entry .tool .float-button.cancel,[data-is="member-editor"]>.entry .tool .float-button.cancel{ grid-area: btn-cancel; } member-editor .panel-header,[data-is="member-editor"] .panel-header{ margin: 0 auto; padding: 0; padding-top: 3px; width: 100%; height: 30px; color: white; background: cornflowerblue; border-radius: 5px 5px 0 0; } member-editor .panel-body,[data-is="member-editor"] .panel-body{ margin: 0 auto; margin-bottom: 5px; padding: 2px; width: 100%; border: 1px solid cornflowerblue; }', '', function(opts) {


        let self = this;
        let screenId = 'member-manage';

        let memberId = '';
        let ctrls = [];

        let defaultContent = {
            entry: {
                tabDefault: 'Default',
                tabMultiLang: 'Languages'
            }
        }
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        this.save = (e) => {
            let item;
            let items = [];
            ctrls.forEach(oRef => {
                item = (oRef.entry) ? oRef.entry.getItem() : null;
                if (item) {
                    item.langId = oRef.langId;
                    items.push(item)
                }
            });
            membermanager.save(items);
            events.raise(events.name.EndEditMember)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditMember)
        }

        findCtrl = (langId) => {
            let ctrl;
            let tabpages = self.tags['tabcontrol'].tags['tabpages'].tags['tabpage'];
            for (let i = 0; i < tabpages.length; i++) {
                let tp = tabpages[i];
                ctrl = tp.refs[langId];
                if (ctrl) break;
            }
            return ctrl;
        }

        this.setup = (item) => {
            let isNew = false;

            memberId = item.memberId;
            if (memberId === undefined || memberId === null || memberId.trim() === '') {
                isNew = true;
            }
            ctrls = [];

            let loader = window.membermanager;

            lang.languages.forEach(lg => {
                let ctrl = findCtrl(lg.langId)
                let original = (isNew) ? clone(item) : loader.find(lg.langId, memberId);

                if (ctrl) {
                    let obj = {
                        langId: lg.langId,
                        entry: ctrl,
                        scrObj: original
                    }
                    ctrl.setup(original);
                    ctrls.push(obj)
                }
            });
        }

});
riot.tag2('member-entry', '<div class="padtop"></div> <div class="padtop"></div> <ninput ref="prefix" title="{content.entry.prefix}" type="text" name="prefix"></ninput> <ninput ref="firstName" title="{content.entry.firstName}" type="text" name="firstName"></ninput> <ninput ref="lastName" title="{content.entry.lastName}" type="text" name="lastName"></ninput> <virtual if="{isDefault()}"> <ninput ref="userName" title="{content.entry.userName}" type="text" name="userName"></ninput> <ninput ref="passWord" title="{content.entry.passWord}" type="password" name="passWord"></ninput> <nselect ref="memberTypes" title="{content.entry.memberType}"></nselect> </virtual>', 'member-entry,[data-is="member-entry"]{ margin: 0; padding: 0; width: 100%; height: 100%; } member-entry .padtop,[data-is="member-entry"] .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; }', '', function(opts) {
        let self = this;
        let screenId = 'member-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        let defaultContent = {
            entry: {
                prefix: 'Prefix Name',
                firstName: 'First Name',
                lastName: 'Last Name',
                userName: 'User Name',
                passWord: 'Password',
                memberType: 'Member Type',
                tagId: 'Tag ID',
                idCard: 'ID Card',
                employeeCode: 'Employee Code',
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        let prefix, firstName, lastName, userName, passWord;

        let memberTypes;

        let initCtrls = () => {
            prefix = self.refs['prefix'];
            firstName = self.refs['firstName'];
            lastName = self.refs['lastName'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];

            memberTypes = self.refs['memberTypes'];

        }
        let freeCtrls = () => {
            prefix = null;
            firstName = null;
            lastName = null;
            userName = null;
            passWord = null;
            memberTypes = null;

        }
        let clearInputs = () => {
            prefix.clear()
            firstName.clear()
            lastName.clear()
            userName.clear()
            passWord.clear()

            if (memberTypes) memberTypes.clear();

        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.MemberTypeListChanged, onMemberTypeListChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.MemberTypeListChanged, onMemberTypeListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let onMemberTypeListChanged = (e) => { updatecontent(); }

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {
                if (prefix) editObj.Prefix = prefix.value();
                if (firstName) editObj.FirstName = firstName.value();
                if (lastName) editObj.LastName = lastName.value();
                if (userName) editObj.UserName = userName.value();
                if (passWord) editObj.Password = passWord.value();

                if (memberTypes) editObj.MemberType = memberTypes.value();

            }
        }
        let objToCtrl = () => {
            if (editObj) {

                if (prefix) prefix.value(editObj.Prefix);
                if (firstName) firstName.value(editObj.FirstName);
                if (lastName) lastName.value(editObj.LastName);
                if (userName) userName.value(editObj.UserName);
                if (passWord) passWord.value(editObj.Password);

                if (memberTypes && editObj.MemberType) {
                    memberTypes.value(editObj.MemberType.toString());
                }

            }
        }

        this.setup = (item) => {
            clearInputs();

            if (memberTypes) {
                memberTypes.setup(master.membertypes.current, { valueField:'memberTypeId', textField:'Description' });
            }

            origObj = clone(item);
            editObj = clone(item);

            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();

            let hasId = (editObj.memberId !== undefined && editObj.memberId != null)
            let isDirty = !hasId || !equals(origObj, editObj);

            return (isDirty) ? editObj : null;
        }

});
riot.tag2('member-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <member-view ref="viewer" class="view"></member-view> </yield> <yield to="entry"> <member-editor ref="entry" class="entry"></member-editor> </yield> </flip-screen>', 'member-manage,[data-is="member-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } member-manage .view,[data-is="member-manage"] .view,member-manage .entry,[data-is="member-manage"] .entry{ margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; overflow: hidden; } member-manage .entry,[data-is="member-manage"] .entry{ margin: 0 auto; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Title'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BeginEditMember, onBeginEdit)
            addEvt(events.name.EndEditMember, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditMember, onEndEdit)
            delEvt(events.name.BeginEditMember, onBeginEdit)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onBeginEdit = (e) => {

            if (flipper) {
                flipper.toggle();
                let item = e.detail.data.item;

                if (entry) entry.setup(item);
            }

        }
        let onEndEdit = (e) => {

            if (flipper) {
                flipper.toggle();
            }
        }

});
riot.tag2('member-view', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{addnew}"> <span class="fas fa-plus">&nbsp;</span> </button> <button class="float-button" onclick="{refresh}"> <span class="fas fa-sync">&nbsp;</span> </button> </div> <div ref="grid" class="gridarea"></div> </div>', 'member-view,[data-is="member-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } member-view>.scrarea,[data-is="member-view"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea gridarea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } member-view>.scrarea>.toolarea,[data-is="member-view"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } member-view>.scrarea>.toolarea .float-button,[data-is="member-view"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } member-view>.scrarea>.toolarea .float-button:hover,[data-is="member-view"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } member-view>.scrarea>.gridarea,[data-is="member-view"]>.scrarea>.gridarea{ grid-area: gridarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } member-view .tabulator-row button,[data-is="member-view"] .tabulator-row button{ margin: 0 auto; padding: 0px; width: 100%; font-size: small; color: inherit; background: transparent; border: none; outline: none; cursor: pointer; } member-view .tabulator-row button:hover,[data-is="member-view"] .tabulator-row button:hover{ color: forestgreen; } member-view .tabulator-row button>span,[data-is="member-view"] .tabulator-row button>span{ margin: 0 auto; padding: 0; }', '', function(opts) {


        let self = this;
        let table;
        let screenId = 'member-manage';

        let defaultContent = {
            title: 'Member Management',
            columns: []
        }
        this.content = defaultContent;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {

            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);

            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]

            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = membermanager.current;
            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                self.update();
                if (table) table.redraw(true);
            }
        }

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.MemberListChanged, onMemberListChanged)
            addEvt(events.name.EndEditMember, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditMember, onEndEdit)
            delEvt(events.name.MemberListChanged, onMemberListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }
        let onScreenChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                membermanager.load();
            }
        }
        let onMemberListChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            events.raise(events.name.BeginEditMember, { item: data })
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();

        }
        let onEndEdit = (e) => {
            syncData();
            table.redraw(true);
        }

        this.addnew = (e) => {
            let data = {
                memberId: null,
                Prefix: null,
                FirstName: null,
                LastName: null,
                UserName: null,
                Password: null,
                MemberType: 280,
                TagId: null,
                IDCard: null,
                EmployeeCode: null,
            };
            events.raise(events.name.BeginEditMember, { item: data })
        }
        this.refresh = (e) => {
            membermanager.load();
            updatecontent();
        }

});
riot.tag2('org-editor', '<div class="entry"> <tabcontrol class="tabs" content="{opts.content}"> <tabheaders content="{opts.content}"> <tabheader for="default" content="{opts.content}"> <span class="fas fa-cog"></span> {opts.content.entry.tabDefault} </tabheader> <tabheader for="miltilang" content="{opts.content}"> <span class="fas fa-globe-americas"></span> {opts.content.entry.tabMultiLang} </tabheader> </tabheaders> <tabpages> <tabpage name="default"> <org-entry ref="EN" langid=""></org-entry> </tabpage> <tabpage name="miltilang"> <virtual if="{lang.languages}"> <virtual each="{item in lang.languages}"> <virtual if="{item.langId !==\'EN\'}"> <div class="panel-header" langid="{item.langId}"> &nbsp;&nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}"></span> &nbsp;{item.Description}&nbsp; </div> <div class="panel-body" langid="{item.langId}"> <org-entry ref="{item.langId}" langid="{item.langId}"></org-entry> </div> </virtual> </virtual> </virtual> </tabpage> </tabpages> </tabcontrol> <div class="tool"> <button class="float-button save" onclick="{save}"><span class="fas fa-save"></span></button> <button class="float-button cancel" onclick="{cancel}"><span class="fas fa-times"></span></button> </div> </div> </style>', 'org-editor,[data-is="org-editor"]{ margin: 0 auto; padding: 0; width: 100%; max-width: 800px; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'entry\'; background-color: white; overflow: hidden; } org-editor>.entry,[data-is="org-editor"]>.entry{ grid-area: entry; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } org-editor>.entry .tabs,[data-is="org-editor"]>.entry .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: hidden; } org-editor>.entry .tool,[data-is="org-editor"]>.entry .tool{ grid-area: tool; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto; grid-template-areas: \'. .\' \'btn-cancel .\' \'btn-save .\'; margin: 0 auto; margin-left: 3px; padding: 0; width: 100%; height: 100%; overflow: hidden; } org-editor>.entry .tool .float-button,[data-is="org-editor"]>.entry .tool .float-button{ margin: 0 auto; padding: 0; border: none; outline: none; border-radius: 50%; height: 40px; width: 40px; color: whitesmoke; background: silver; cursor: pointer; } org-editor>.entry .tool .float-button:hover,[data-is="org-editor"]>.entry .tool .float-button:hover{ color: whitesmoke; background: forestgreen; } org-editor>.entry .tool .float-button.save,[data-is="org-editor"]>.entry .tool .float-button.save{ grid-area: btn-save; } org-editor>.entry .tool .float-button.cancel,[data-is="org-editor"]>.entry .tool .float-button.cancel{ grid-area: btn-cancel; } org-editor .panel-header,[data-is="org-editor"] .panel-header{ margin: 0 auto; padding: 0; padding-top: 3px; width: 100%; height: 30px; color: white; background: cornflowerblue; border-radius: 5px 5px 0 0; } org-editor .panel-body,[data-is="org-editor"] .panel-body{ margin: 0 auto; margin-bottom: 5px; padding: 2px; width: 100%; border: 1px solid cornflowerblue; }', '', function(opts) {


        let self = this;
        let screenId = 'org-manage';

        let orgId = '';
        let ctrls = [];

        let defaultContent = {
            entry: {
                tabDefault: 'Default',
                tabMultiLang: 'Languages'
            }
        }
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        this.save = (e) => {
            let item;
            let items = [];
            ctrls.forEach(oRef => {
                item = (oRef.entry) ? oRef.entry.getItem() : null;
                if (item) {
                    item.langId = oRef.langId;
                    items.push(item)
                }
            });
            orgmanager.save(items);
            events.raise(events.name.EndEditOrg)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditOrg)
        }

        findCtrl = (langId) => {
            let ctrl;
            let tabpages = self.tags['tabcontrol'].tags['tabpages'].tags['tabpage'];
            for (let i = 0; i < tabpages.length; i++) {
                let tp = tabpages[i];
                ctrl = tp.refs[langId];
                if (ctrl) break;
            }
            return ctrl;
        }

        this.setup = (item) => {
            let isNew = false;
            orgId = item.orgId;
            if (orgId === undefined || orgId === null || orgId.trim() === '') {
                isNew = true;
            }
            ctrls = [];

            let loader = window.orgmanager;

            lang.languages.forEach(lg => {
                let ctrl = findCtrl(lg.langId)
                let original = (isNew) ? clone(item) : loader.find(lg.langId, orgId);

                if (ctrl) {
                    let obj = {
                        langId: lg.langId,
                        entry: ctrl,
                        scrObj: original
                    }
                    ctrl.setup(original);
                    ctrls.push(obj)
                }
            });
        }

});
riot.tag2('org-entry', '<div class="padtop"></div> <div class="padtop"></div> <ninput ref="orgName" title="{content.entry.orgName}" type="text" name="orgName"></ninput> <virtual if="{isDefault()}"> <ninput ref="parentId" title="{content.entry.parentId}" type="text" name="parentId"></ninput> <ninput ref="branchId" title="{content.entry.branchId}" type="text" name="branchId"></ninput> </virtual>', 'org-entry,[data-is="org-entry"]{ margin: 0; padding: 0; width: 100%; height: 100%; } org-entry .padtop,[data-is="org-entry"] .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; }', '', function(opts) {
        let self = this;
        let screenId = 'org-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        let defaultContent = {
            entry: {
                orgName: 'Org Name',
                parentId: 'Parent Org',
                branchId: 'Branch'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        let orgName, parentId, branchId;

        let initCtrls = () => {
            orgName = self.refs['orgName'];
            parentId = self.refs['parentId'];
            branchId = self.refs['branchId'];
        }
        let freeCtrls = () => {
            orgName = null;
            parentId = null;
            branchId = null;
        }
        let clearInputs = () => {

            if (branchId) branchId.clear();

            if (branchId) parentId.clear();
            orgName.clear();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BranchListChanged, onBranchListChanged)
            addEvt(events.name.OrgListChanged, onOrgListChanged);
        }
        let unbindEvents = () => {
            delEvt(events.name.OrgListChanged, onOrgListChanged);
            delEvt(events.name.BranchListChanged, onBranchListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let onBranchListChanged = (e) => { updatecontent(); }
        let onOrgListChanged = (e) => { }

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {

                if (orgName) editObj.OrgName = orgName.value();
                if (parentId) editObj.parentId = parentId.value();
                if (branchId) editObj.branchId = branchId.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {

                if (orgName) orgName.value(editObj.OrgName);
                if (parentId) parentId.value(editObj.parentId);
                if (branchId) branchId.value(editObj.branchId);
            }
        }

        this.setup = (item) => {
            clearInputs();

            origObj = clone(item);
            editObj = clone(item);

            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();

            let hasId = (editObj.orgId !== undefined && editObj.orgId != null)
            let isDirty = !hasId || !equals(origObj, editObj);

            return (isDirty) ? editObj : null;
        }

});
riot.tag2('org-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <org-view ref="viewer" class="view"></org-view> </yield> <yield to="entry"> <org-editor ref="entry" class="entry"></org-editor> </yield> </flip-screen>', 'org-manage,[data-is="org-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } org-manage .view,[data-is="org-manage"] .view,org-manage .entry,[data-is="org-manage"] .entry{ margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; overflow: hidden; } org-manage .entry,[data-is="org-manage"] .entry{ margin: 0 auto; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Title'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BeginEditOrg, onBeginEdit)
            addEvt(events.name.EndEditOrg, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditOrg, onEndEdit)
            delEvt(events.name.BeginEditOrg, onBeginEdit)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onBeginEdit = (e) => {

            if (flipper) {
                flipper.toggle();
                let item = e.detail.data.item;

                if (entry) entry.setup(item);
            }

        }
        let onEndEdit = (e) => {

            if (flipper) {
                flipper.toggle();
            }
        }

});
riot.tag2('org-view-tree', '<h3>Org View</h3>', '', '', function(opts) {
});
riot.tag2('org-view', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{addnew}"> <span class="fas fa-plus">&nbsp;</span> </button> <button class="float-button" onclick="{refresh}"> <span class="fas fa-sync">&nbsp;</span> </button> </div> <div ref="grid" class="gridarea"></div> </div>', 'org-view,[data-is="org-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } org-view>.scrarea,[data-is="org-view"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea gridarea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } org-view>.scrarea>.toolarea,[data-is="org-view"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } org-view>.scrarea>.toolarea .float-button,[data-is="org-view"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } org-view>.scrarea>.toolarea .float-button:hover,[data-is="org-view"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } org-view>.scrarea>.gridarea,[data-is="org-view"]>.scrarea>.gridarea{ grid-area: gridarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } org-view .tabulator-row button,[data-is="org-view"] .tabulator-row button{ margin: 0 auto; padding: 0px; width: 100%; font-size: small; color: inherit; background: transparent; border: none; outline: none; cursor: pointer; } org-view .tabulator-row button:hover,[data-is="org-view"] .tabulator-row button:hover{ color: forestgreen; } org-view .tabulator-row button>span,[data-is="org-view"] .tabulator-row button>span{ margin: 0 auto; padding: 0; }', '', function(opts) {


        let self = this;
        let table;
        let screenId = 'org-manage';

        let defaultContent = {
            title: 'Org Management',
            columns: []
        }
        this.content = defaultContent;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {

            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);

            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]

            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = orgmanager.current;
            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                self.update();
                if (table) table.redraw(true);
            }
        }

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.OrgListChanged, onOrgListChanged)
            addEvt(events.name.EndEditOrg, onEndEdit)
        }
        let unbindEvents = () => {
            delEvt(events.name.EndEditOrg, onEndEdit)
            delEvt(events.name.OrgListChanged, onOrgListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }
        let onScreenChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                orgmanager.load();
            }
        }
        let onOrgListChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            events.raise(events.name.BeginEditOrg, { item: data })
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();

        }
        let onEndEdit = (e) => {
            syncData();
            table.redraw(true);
        }

        this.addnew = (e) => {
            let data = {
                orgId: null,
                OrgName: null,
                parentId: 'O0001',
                branchId: 'B0001'
            };
            events.raise(events.name.BeginEditOrg, { item: data })
        }
        this.refresh = (e) => {
            orgmanager.load();
            updatecontent();
        }

});
riot.tag2('rating-device-home', '<h2>{(content) ? content.title : \'Rating Device Home\'}</h2> <a href="/rating/orgs">Orgs</a> <a href="/rating/register">Register.</a> <a href="/rating/question">Question.</a>', 'rating-device-home,[data-is="rating-device-home"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
        let self = this;
        let screenId = 'rating-device-home';
        let defaultContent = {
            title: 'Rating Device Home'
        };
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});

riot.tag2('rating-org', '<div ref="container" class="scrarea"> <div class="title">{(content) ? content.title : \'Device Organization Setup\'}</div> <div class="current-org">{content.entry.currentOrg}: {(register) ? \'( \' + register.orgName + \' )\' : \'-\'}</div> <nselect ref="orgNames" title="{content.entry.orgName}"></nselect> <br> <div class="toolbars"> <button class="float-button" onclick="{gohome}"> <span class="fas fa-home">&nbsp;</span> </button> <button class="float-button" onclick="{save}"> <span class="fas fa-save">&nbsp;</span> </button> </div> </div>', 'rating-org,[data-is="rating-org"]{ margin: 0 auto; padding: 0; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } rating-org>.scrarea,[data-is="rating-org"]>.scrarea{ grid-area: scrarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; max-width: 800px; } rating-org>.scrarea>.title,[data-is="rating-org"]>.scrarea>.title{ display: block; margin: 0 auto; color: cornflowerblue; text-align: center; font-size: 1.5em; width: 100%; height: auto; } rating-org>.scrarea>.current-org,[data-is="rating-org"]>.scrarea>.current-org{ display: block; margin: 0 auto; color: red; text-align: center; font-size: 0.8em; width: 100%; height: auto; } rating-org>.scrarea>.toolbars,[data-is="rating-org"]>.scrarea>.toolbars{ display: block; margin: 0 auto; margin-right: 5px; width: 100%; height: auto; text-align: center; overflow: hidden; background-color: transparent; color: whitesmoke; } rating-org>.scrarea>.toolbars .float-button,[data-is="rating-org"]>.scrarea>.toolbars .float-button{ display: inline-block; margin: 0 auto; padding: 0; border: none; outline: none; border-radius: 50%; height: 40px; width: 40px; color: whitesmoke; background: silver; cursor: pointer; } rating-org>.scrarea>.toolbars .float-button:hover,[data-is="rating-org"]>.scrarea>.toolbars .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {
        let self = this;
        let screenId = 'rating-org';
        let defaultContent = {
            title: 'Device Organization Setup',
            entry: {
                orgName: 'Organization',
                currentOrg: 'Current Organization'
            }
        };
        this.content = defaultContent;
        opts.content = this.content;
        this.register = {
            orgId: '',
            orgName: ''
        }

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updateOrgList();
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let orgNames;

        let initCtrls = () => {
            orgNames = self.refs['orgNames']
            getOrgs();
        }
        let freeCtrls = () => {
            orgNames = null
        }

        let orgId = '';
        let orgML = null;
        let orgs = null;

        let getRegisterOrgList = (callback) => {
            let opt = {}
            $.ajax({
                type: "POST",
                url: "/customer/api/rating/org/search",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    if (ret.data && ret.data.length > 0) {
                        self.register.orgId = ret.data[0].orgId;
                    }
                    if (callback) callback()
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let getOrgs = () => {
            let opt = {}
            $.ajax({
                type: "POST",
                url: "/customer/api/org/search",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    orgML = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let updateOrgList = () => {

            if (orgNames) {

                let val = orgNames.value();
                orgId = (val) ? val : self.register.orgId;
                if (orgML && orgML[lang.langId]) {
                    orgs = orgML[lang.langId]

                    orgNames.setup(orgs, { valueField:'orgId', textField:'OrgName' });
                    if (orgId) {
                        orgNames.value(orgId);
                    }

                    if (!self.register.orgId) {
                        getRegisterOrgList(updateRegisterOrg)
                    }
                    else {
                        updateRegisterOrg()
                    }
                }
            }
        }
        let updateRegisterOrg = () => {

            if (orgs) {
                if (self.register.orgId) {
                    let om = orgs.map(org => org.orgId)
                    let idx = om.indexOf(self.register.orgId)
                    self.register.orgName = (idx !== -1) ? orgs[idx].OrgName  : '';
                }

                if (orgNames) {
                    let val = orgNames.value()
                    if (val !== self.register.orgId) {
                        orgNames.value(self.register.orgId);
                    }
                }
            }
            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.save = () => {
            let selectedId = (orgNames) ? orgNames.value() : null;
            let opt = {
                orgId: selectedId
            }
            $.ajax({
                type: "POST",
                url: "/customer/api/rating/org/save",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    console.log('save success')

                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        this.gohome = () => {
            let url = '/rating';
            secure.nav(url)
        }
});
riot.tag2('rating-question', '<h2>{(content) ? content.title : \'Today Question\'}</h2> <a href="/rating">Home</a>', 'rating-question,[data-is="rating-question"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
        let self = this;
        let screenId = 'rating-question';
        let defaultContent = {
            title: 'Today Question.'
        };
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {

        }
        let unbindEvents = () => {

        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

});

riot.tag2('rating-register', '<div ref="container" class="scrarea"> <div class="title">{(content) ? content.title : \'Device Registration\'}</div> <div class="current-device">{content.entry.currentDevice}: {(register) ? \'( \' + register.deviceName + \' )\' : \'-\'}</div> <nselect ref="deviceNames" title="{content.entry.deviceName}"></nselect> <br> <div class="toolbars"> <button class="float-button" onclick="{gohome}"> <span class="fas fa-home">&nbsp;</span> </button> <button class="float-button" onclick="{save}"> <span class="fas fa-save">&nbsp;</span> </button> </div> </div>', 'rating-register,[data-is="rating-register"]{ margin: 0 auto; padding: 0; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } rating-register>.scrarea,[data-is="rating-register"]>.scrarea{ grid-area: scrarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; max-width: 800px; } rating-register>.scrarea>.title,[data-is="rating-register"]>.scrarea>.title{ display: block; margin: 0 auto; color: cornflowerblue; text-align: center; font-size: 1.5em; width: 100%; height: auto; } rating-register>.scrarea>.current-device,[data-is="rating-register"]>.scrarea>.current-device{ display: block; margin: 0 auto; color: red; text-align: center; font-size: 0.8em; width: 100%; height: auto; } rating-register>.scrarea>.toolbars,[data-is="rating-register"]>.scrarea>.toolbars{ display: block; margin: 0 auto; margin-right: 5px; width: 100%; height: auto; text-align: center; overflow: hidden; background-color: transparent; color: whitesmoke; } rating-register>.scrarea>.toolbars .float-button,[data-is="rating-register"]>.scrarea>.toolbars .float-button{ display: inline-block; margin: 0 auto; padding: 0; border: none; outline: none; border-radius: 50%; height: 40px; width: 40px; color: whitesmoke; background: silver; cursor: pointer; } rating-register>.scrarea>.toolbars .float-button:hover,[data-is="rating-register"]>.scrarea>.toolbars .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {
        let self = this;
        let screenId = 'rating-register';
        let defaultContent = {
            title: 'Device Registration',
            entry: {
                deviceName: 'Device Name',
                currentDevice: 'Current Device'
            }
        };
        this.content = defaultContent;
        opts.content = this.content;
        this.register = {
            deviceId: '',
            deviceName: ''
        }

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updateDeviceList();
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let deviceNames;

        let initCtrls = () => {
            deviceNames = self.refs['deviceNames']
            getDevices();
        }
        let freeCtrls = () => {
            deviceNames = null
        }

        let deviceId = '';
        let deviceML = null;
        let devices = null;

        let getRegisterDeviceId = (callback) => {
            let opt = {}
            $.ajax({
                type: "POST",
                url: "/customer/api/rating/device/search",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    if (ret.data) {
                        self.register.deviceId = ret.data.deviceId;
                    }
                    else {
                        self.register.deviceId = '';
                    }
                    if (callback) callback()
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let getDevices = () => {
            let opt = {}
            $.ajax({
                type: "POST",
                url: "/customer/api/device/search",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    deviceML = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let updateDeviceList = () => {

            if (deviceNames) {

                let val = deviceNames.value()
                deviceId = (val) ? val : self.register.deviceId;
                if (deviceML && deviceML[lang.langId]) {
                    devices = deviceML[lang.langId]

                    deviceNames.setup(devices, { valueField:'deviceId', textField:'DeviceName' });
                    if (deviceId) {
                        deviceNames.value(deviceId);
                    }

                    getRegisterDeviceId(updateRegisterDevice)
                }
            }
        }
        let updateRegisterDevice = () => {

            if (devices) {
                let dm = devices.map((dv) => dv.deviceId);
                if (self.register.deviceId) {
                    let idx = dm.indexOf(self.register.deviceId);
                    self.register.deviceName = (idx !== -1) ? devices[idx].DeviceName : '-';

                    if (deviceNames) {
                        let val = deviceNames.value()
                        if (val !== self.register.deviceId) {
                            deviceNames.value(self.register.deviceId);
                        }
                    }
                }
            }
            self.update();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.save = () => {
            let selectedId = (deviceNames) ? deviceNames.value() : null;
            let opt = {
                deviceId: selectedId
            }
            $.ajax({
                type: "POST",
                url: "/customer/api/rating/device/save",
                data: JSON.stringify(opt),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    console.log('save success')

                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        this.gohome = () => {
            let url = '/rating';
            secure.nav(url)
        }
});

riot.tag2('rating-signin', '<h2>{(content) ? content.title : \'Device Staff Sign In.\'}</h2> <a href="/rating">Home</a>', 'rating-signin,[data-is="rating-signin"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
        let self = this;
        let screenId = 'rating-signin';
        let defaultContent = {
            title: 'Device Staff Sign In.'
        };
        this.content = defaultContent;
        opts.content = this.content;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                opts.content = self.content;
                self.update();
            }
        }

        let initCtrls = () => { }
        let freeCtrls = () => { }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});

riot.tag2('bar-votesummary-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <bar-votesummary-search ref="viewer" class="view"></bar-votesummary-search> </yield> <yield to="entry"> <bar-votesummary-result ref="entry" class="entry"></bar-votesummary-result> </yield> </flip-screen>', 'bar-votesummary-manage,[data-is="bar-votesummary-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } bar-votesummary-manage .view,[data-is="bar-votesummary-manage"] .view,bar-votesummary-manage .entry,[data-is="bar-votesummary-manage"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Vote Summary (Bar graph)'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.BarSummarySearch, onShowSearch)
            addEvt(events.name.BarSummaryResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.BarSummaryResult, onShowResult)
            delEvt(events.name.BarSummarySearch, onShowSearch)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }

        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});

riot.tag2('bar-votesummary-org', '<div ref="chart" class="chart-box"></div>', 'bar-votesummary-org,[data-is="bar-votesummary-org"]{ display: block; position: relative; margin: 0 auto; padding: 3px; border: 1px solid silver; border-radius: 3px; overflow: auto; } bar-votesummary-org .chart-box,[data-is="bar-votesummary-org"] .chart-box{ display: block; position: absolute; margin: 0 auto; padding: 0; width: 100%; height: 100%; min-width: 600px; }', '', function(opts) {
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

                },
                xAxis: {

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

                    headerFormat: '',

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

        let chart;
        let initCtrls = () => {
            chart = self.refs['chart']
            updatecontent();
        }
        let freeCtrls = () => {
            chart = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('bar-votesummary-question-slide', '<div class="question-box"> <span class="caption">{(opts.slide) ? opts.slide.text : \'\'}</span> <div class="choice-box"> <virtual each="{choice in opts.slide.choices}"> <span class="choiceNo">{choice.choice}</span> <span class="choiceText">{choice.text}</span> </virtual> </div> <div class="content-box"> <bar-votesummary-org class="item" orgs="{opts.slide.orgs}"></bar-votesummary-org> </div> </div>', '@media (min-width: 620px) { bar-votesummary-question-slide,[data-is="bar-votesummary-question-slide"]{ max-width: 550px; } bar-votesummary-question-slide .question-box .content-box,[data-is="bar-votesummary-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 200px; } } @media (min-width: 960px) { bar-votesummary-question-slide,[data-is="bar-votesummary-question-slide"]{ max-width: 850px; } bar-votesummary-question-slide .question-box .content-box,[data-is="bar-votesummary-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 250px; } } bar-votesummary-question-slide,[data-is="bar-votesummary-question-slide"]{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; white-space: nowrap; } bar-votesummary-question-slide .question-box,[data-is="bar-votesummary-question-slide"] .question-box{ margin: 0 auto; display: block; color: white; border: 1px solid cornflowerblue; border-radius: 3px; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } bar-votesummary-question-slide .question-box .caption,[data-is="bar-votesummary-question-slide"] .question-box .caption{ display: block; margin: 0 auto; padding: 5px; background-color: cornflowerblue; } bar-votesummary-question-slide .question-box .choice-box,[data-is="bar-votesummary-question-slide"] .question-box .choice-box{ display: grid; margin: 5px; margin-bottom: 0; padding: 5px; grid-template-columns: 30px 1fr; grid-gap: 5px; background: white; border: 1px solid silver; } bar-votesummary-question-slide .question-box .choice-box .choiceNo,[data-is="bar-votesummary-question-slide"] .question-box .choice-box .choiceNo{ display: inline-block; overflow: hidden; white-space: normal; text-align: right; color: black; height: auto; } bar-votesummary-question-slide .question-box .choice-box .choiceText,[data-is="bar-votesummary-question-slide"] .question-box .choice-box .choiceText{ display: inline-block; overflow: hidden; white-space: normal; text-align: left; color: black; height: auto; } bar-votesummary-question-slide .question-box .content-box,[data-is="bar-votesummary-question-slide"] .question-box .content-box{ display: grid; margin: 0 auto; margin-bottom: 5px; padding: 5px; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 300px; } bar-votesummary-question-slide .question-box .content-box .item,[data-is="bar-votesummary-question-slide"] .question-box .content-box .item{ display: inline-block; margin: 3px auto; padding: 0; color: black; width: 100%; height: 100%; }', '', function(opts) {
});
riot.tag2('bar-votesummary-result', '<div class="result"> <div class="tabs"> <date-result caption="{(content && content.labels) ? content.labels.date : \'Date\'}" begin="{current.begin}" end="{current.end}"></date-result> <virtial if="{current.slides && current.slides.length > 0}"> <virtial each="{slide in current.slides}"> <bar-votesummary-question-slide slide="{slide}"></bar-votesummary-question-slide> </virtial> </virtial> </div> <div class="tool"> <button class="float-button" onclick="{goback}"> <span class="fas fa-times"></span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home"></span> </button> </div> </div>', 'bar-votesummary-result,[data-is="bar-votesummary-result"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'result\' \'.\'; background-color: whitesmoke; } bar-votesummary-result>.result,[data-is="bar-votesummary-result"]>.result{ grid-area: result; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } bar-votesummary-result>.result .tabs,[data-is="bar-votesummary-result"]>.result .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; } bar-votesummary-result>.result .tool,[data-is="bar-votesummary-result"]>.result .tool{ grid-area: tool; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } bar-votesummary-result>.result .tool .float-button,[data-is="bar-votesummary-result"]>.result .tool .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } bar-votesummary-result>.result .tool .float-button:hover,[data-is="bar-votesummary-result"]>.result .tool .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {


        let self = this;
        let screenId = 'bar-votesummary-manage';
        let shown = false;
        let result = null;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                if (result && result[lang.langId]) {
                    self.current = result[lang.langId]

                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;

            $.ajax({
                type: "POST",
                url: "/customer/api/report/votesummaries/search",
                data: JSON.stringify(search_opts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    result = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.goback = () => {
            shown = false;
            events.raise(events.name.BarSummarySearch)
        }

        this.setup = (criteria) => {

            search_opts = criteria;
            shown = true;
            refresh();
        }

        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('bar-votesummary-search', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{onseach}"> <span class="fas fa-search">&nbsp;</span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home">&nbsp;</span> </button> </div> <div ref="search" class="searcharea"> <div class="input-block center"> <span>{(content) ? content.title : \'Bar graph vote summary.\'}</span> </div> <div class="input-block center"> <nselect ref="ctrlQSets" title="{(content && content.labels) ? content.labels.questionSet : \'Question Set\'}"></nselect> </div> <div class="input-block center"> <ninput ref="ctrlBegin" title="{(content && content.labels) ? content.labels.beginDate : \'Begin Date\'}" type="date"></ninput> <ninput ref="ctrlEnd" title="{(content && content.labels) ? content.labels.endDate : \'End Date\'}" type="date"></ninput> </div> <div class="input-block center"> <ncheckedtree ref="ctrlQuesTree" title="{(content && content.labels) ? content.labels.question : \'Question\'}" class="tree"></ncheckedtree> </div> <div class="input-block center"> <ncheckedtree ref="ctrlOrgTree" title="{(content && content.labels) ? content.labels.organization : \'Organization\'}" class="tree"></ncheckedtree> </div> <br> </div> </div>', 'bar-votesummary-search,[data-is="bar-votesummary-search"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } bar-votesummary-search>.scrarea,[data-is="bar-votesummary-search"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea searcharea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } bar-votesummary-search>.scrarea>.toolarea,[data-is="bar-votesummary-search"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } bar-votesummary-search>.scrarea>.toolarea .float-button,[data-is="bar-votesummary-search"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } bar-votesummary-search>.scrarea>.toolarea .float-button:hover,[data-is="bar-votesummary-search"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } bar-votesummary-search>.scrarea>.searcharea,[data-is="bar-votesummary-search"]>.scrarea>.searcharea{ grid-area: searcharea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } bar-votesummary-search>.scrarea>.searcharea .input-block,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block{ display: block; margin: 0; margin-top: 10px; padding: 0; width: 100%; max-width: 800px; text-align: center; } bar-votesummary-search>.scrarea>.searcharea .input-block.center,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block.center{ margin: auto; margin-top: 10px; } bar-votesummary-search>.scrarea>.searcharea .input-block span,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block span,bar-votesummary-search>.scrarea>.searcharea .input-block button,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block button{ display: inline-block; margin: 0 auto; padding: 0; width: 50%; font-size: 1rem; font-size: bold; } bar-votesummary-search>.scrarea>.searcharea .input-block span.label,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block span.label{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } bar-votesummary-search>.scrarea>.searcharea .input-block span input,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block span input{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } bar-votesummary-search>.scrarea>.searcharea .input-block .tree,[data-is="bar-votesummary-search"]>.scrarea>.searcharea .input-block .tree{ text-align: left; }', '', function(opts) {


        let self = this;
        let screenId = 'bar-votesummary-manage';
        let qsetModel;
        let quesModel;
        let orgModel;

        let defaultContent = {
            title: 'Bar graph vote summary.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();
                updateOrgs();
                self.update();
            }
        }

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();

                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value();

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);

                ctrlQSets.value(lastValue);
            }
        }

        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }

        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValues = ctrlQuesTree.selectedItems();

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;

                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);

                ctrlQuesTree.selectedItems(lastValues);
            }
        }

        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearOrgs = () => {
            if (ctrlOrgTree) {
                ctrlOrgTree.clear();
            }
        }

        let updateOrgs = () => {
            if (ctrlOrgTree && orgModel) {
                let lastValues = ctrlOrgTree.selectedItems();

                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);

                ctrlOrgTree.selectedItems(lastValues);
            }
        }

        let loadOrgs = (qsetid) => {
            let criteria = { }
            if (ctrlOrgTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/org/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        orgModel = ret.data;
                        updateOrgs();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            ctrlOrgTree = self.refs['ctrlOrgTree']

            loadQSets();

            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlOrgTree = null;
            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.onseach = () => {
            let qsetid = ctrlQSets.value();
            let beginDT = String(ctrlBegin.value());
            let endDT = String(ctrlEnd.value());

            let slides = [];
            let quesmap = ctrlQuesTree.selectedItems().map(item => item.id );
            quesmap.forEach(quesId => {
                slides.push({ qSeq: quesId })
            });
            let orgs = []
            let orgmap = ctrlOrgTree.selectedItems().map(item => item.id );
            orgmap.forEach(orgId => {
                orgs.push({ orgId: orgId })
            });

            let criteria = {
                qsetId: qsetid,
                beginDate: beginDT,
                endDate: endDT,
                slides: slides,
                orgs: orgs
            }

            events.raise(events.name.BarSummaryResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('date-result', '<div class="date-range"> <span class="label"> {(opts.caption) ? opts.caption : \'Date\'}:&nbsp; {(opts.begin) ? opts.begin : \'\'} &nbsp;-&nbsp; {(opts.end) ? opts.end : \'\'} </span> </div>', '@media (min-width: 620px) { date-result,[data-is="date-result"]{ max-width: 550px; } } @media (min-width: 960px) { date-result,[data-is="date-result"]{ max-width: 850px; } } date-result,[data-is="date-result"]{ display: block; margin: 0 auto; padding: 5px; padding-bottom: 1px; max-width: 1000px; } date-result .date-range,[data-is="date-result"] .date-range{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; overflow: hidden; white-space: nowrap; } date-result .date-range .label,[data-is="date-result"] .date-range .label{ margin: 0 auto; padding: 5px; display: block; color: cornflowerblue; font-size: 1rem; font-weight: bold; border: 0 solid cornflowerblue; border-bottom: 1px solid cornflowerblue; }', '', function(opts) {
        let updatecontent = () => {}
        this.setup = () => {}
});
riot.tag2('report-admin-home', '<div class="report-home-main"> <div class="report-item"> <button onclick="{showvotesummary}"> <span class="icon fa-3x fas fa-table cr1"></span> <span class="text">Vote Summary</span> </button> </div> <div class="report-item"> <button onclick="{showpiesummary}"> <span class="icon fa-3x fas fa-chart-pie cr2"></span> <span class="text">Pie Chart</span> </button> </div> <div class="report-item"> <button onclick="{showbarsummary}"> <span class="icon fa-3x fas fa-chart-bar cr3"></span> <span class="text">Bar Chart</span> </button> </div> <div class="report-item"> <button onclick="{showstaffcompare}"> <span class="icon fa-3x fas fa-chalkboard-teacher cr6"></span> <span class="text">Staff Compare</span> </button> </div> <div class="report-item"> <button onclick="{showrawvote}"> <span class="icon fa-3x fas fa-table cr4"></span> <span class="text">Raw Vote</span> </button> </div> <div class="report-item"> <button onclick="{showstaffperf}"> <span class="icon fa-3x far fa-id-card cr5"></span> <span class="text">Staff Performance</span> </button> </div> </div>', 'report-admin-home,[data-is="report-admin-home"]{ margin: 0 auto; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; display: block; overflow: auto; } @media (min-width: 620px) { report-admin-home .report-home-main,[data-is="report-admin-home"] .report-home-main{ column-count: 2; column-gap: 20px; } } @media (min-width: 960px) { report-admin-home .report-home-main,[data-is="report-admin-home"] .report-home-main{ column-count: 3; column-gap: 20px; } } report-admin-home .report-home-main,[data-is="report-admin-home"] .report-home-main{ margin: 0 auto; padding: 20px; max-width: 1000px; } report-admin-home .report-home-main,[data-is="report-admin-home"] .report-home-main{ display: block; margin: 0 auto; padding: 10px; } report-admin-home .report-home-main .report-item,[data-is="report-admin-home"] .report-home-main .report-item{ margin: 2px auto; padding: 0; margin-bottom: 20px; height: 100px; break-inside: avoid; } report-admin-home .report-home-main .report-item button,[data-is="report-admin-home"] .report-home-main .report-item button{ margin: 0 auto; padding: 0; display: grid; width: 100%; height: 100%; } report-admin-home .report-home-main .report-item button .icon,[data-is="report-admin-home"] .report-home-main .report-item button .icon{ justify-self: center; align-self: center; } report-admin-home .report-home-main .report-item button .text,[data-is="report-admin-home"] .report-home-main .report-item button .text{ justify-self: center; align-self: center; font-size: 1rem; font-weight: bold; } report-admin-home .report-home-main .report-item button .icon.cr1,[data-is="report-admin-home"] .report-home-main .report-item button .icon.cr1{ color: chocolate; } report-admin-home .report-home-main .report-item button .icon.cr2,[data-is="report-admin-home"] .report-home-main .report-item button .icon.cr2{ color: cornflowerblue; } report-admin-home .report-home-main .report-item button .icon.cr3,[data-is="report-admin-home"] .report-home-main .report-item button .icon.cr3{ color: olivedrab; } report-admin-home .report-home-main .report-item button .icon.cr4,[data-is="report-admin-home"] .report-home-main .report-item button .icon.cr4{ color: darkorchid; } report-admin-home .report-home-main .report-item button .icon.cr5,[data-is="report-admin-home"] .report-home-main .report-item button .icon.cr5{ color: sandybrown; } report-admin-home .report-home-main .report-item button .icon.cr6,[data-is="report-admin-home"] .report-home-main .report-item button .icon.cr6{ color: navy; }', '', function(opts) {


        let self = this;

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.showpiesummary = () => {
            let url = '/customer/admin/report/pie-votesummary';
            secure.nav(url)

        }
        this.showbarsummary = () => {
            let url = '/customer/admin/report/bar-votesummary';
            secure.nav(url)

        }
        this.showvotesummary = () => {
            let url = '/customer/admin/report/votesummary';
            secure.nav(url)

        }
        this.showrawvote = () => {
            let url = '/customer/admin/report/raw-vote';
            secure.nav(url)

        }
        this.showstaffcompare = () => {
            let url = '/customer/admin/report/staff-compare';
            secure.nav(url)

        }
        this.showstaffperf = () => {
            let url = '/customer/admin/report/staff-perf';
            secure.nav(url)

        }
});
riot.tag2('report-exclusive-home', '<div class="report-home-main"> <div class="report-item"> <button onclick="{showvotesummary}"> <span class="icon fa-3x fas fa-table cr1"></span> <span class="text">Vote Summary</span> </button> </div> <div class="report-item"> <button onclick="{showpiesummary}"> <span class="icon fa-3x fas fa-chart-pie cr2"></span> <span class="text">Pie Chart</span> </button> </div> <div class="report-item"> <button onclick="{showbarsummary}"> <span class="icon fa-3x fas fa-chart-bar cr3"></span> <span class="text">Bar Chart</span> </button> </div> <div class="report-item"> <button onclick="{showstaffcompare}"> <span class="icon fa-3x fas fa-chalkboard-teacher cr6"></span> <span class="text">Staff Compare</span> </button> </div> <div class="report-item"> <button onclick="{showrawvote}"> <span class="icon fa-3x fas fa-table cr4"></span> <span class="text">Raw Vote</span> </button> </div> <div class="report-item"> <button onclick="{showstaffperf}"> <span class="icon fa-3x far fa-id-card cr5"></span> <span class="text">Staff Performance</span> </button> </div> </div>', 'report-exclusive-home,[data-is="report-exclusive-home"]{ margin: 0 auto; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; display: block; overflow: auto; background-color: skyblue; } @media (min-width: 620px) { report-exclusive-home .report-home-main,[data-is="report-exclusive-home"] .report-home-main{ column-count: 2; column-gap: 20px; } } @media (min-width: 960px) { report-exclusive-home .report-home-main,[data-is="report-exclusive-home"] .report-home-main{ column-count: 3; column-gap: 20px; } } report-exclusive-home .report-home-main,[data-is="report-exclusive-home"] .report-home-main{ margin: 0 auto; padding: 20px; max-width: 1000px; } report-exclusive-home .report-home-main,[data-is="report-exclusive-home"] .report-home-main{ display: block; margin: 0 auto; padding: 10px; } report-exclusive-home .report-home-main .report-item,[data-is="report-exclusive-home"] .report-home-main .report-item{ margin: 2px auto; padding: 0; margin-bottom: 20px; height: 100px; break-inside: avoid; } report-exclusive-home .report-home-main .report-item button,[data-is="report-exclusive-home"] .report-home-main .report-item button{ margin: 0 auto; padding: 0; display: grid; width: 100%; height: 100%; } report-exclusive-home .report-home-main .report-item button .icon,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon{ justify-self: center; align-self: center; } report-exclusive-home .report-home-main .report-item button .text,[data-is="report-exclusive-home"] .report-home-main .report-item button .text{ justify-self: center; align-self: center; font-size: 1rem; font-weight: bold; } report-exclusive-home .report-home-main .report-item button .icon.cr1,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon.cr1{ color: chocolate; } report-exclusive-home .report-home-main .report-item button .icon.cr2,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon.cr2{ color: cornflowerblue; } report-exclusive-home .report-home-main .report-item button .icon.cr3,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon.cr3{ color: olivedrab; } report-exclusive-home .report-home-main .report-item button .icon.cr4,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon.cr4{ color: darkorchid; } report-exclusive-home .report-home-main .report-item button .icon.cr5,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon.cr5{ color: sandybrown; } report-exclusive-home .report-home-main .report-item button .icon.cr6,[data-is="report-exclusive-home"] .report-home-main .report-item button .icon.cr6{ color: navy; }', '', function(opts) {


        let self = this;

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.showpiesummary = () => {
            let url = 'http://localhost:3000/customer/exclusive/report/pie-votesummary';
            secure.nav(url)

        }
        this.showbarsummary = () => {
            let url = 'http://localhost:3000/customer/exclusive/report/bar-votesummary';
            secure.nav(url)

        }
        this.showvotesummary = () => {
            let url = 'http://localhost:3000/customer/exclusive/report/votesummary';
            secure.nav(url)

        }
        this.showrawvote = () => {
            let url = 'http://localhost:3000/customer/exclusive/report/raw-vote';
            secure.nav(url)

        }
        this.showstaffcompare = () => {
            let url = 'http://localhost:3000/customer/exclusive/report/staff-compare';
            secure.nav(url)

        }
        this.showstaffperf = () => {
            let url = 'http://localhost:3000/customer/exclusive/report/staff-perf';
            secure.nav(url)

        }
});
riot.tag2('report-staff-home', '<div class="report-home-main"> <div class="report-item"> <button onclick="{showvotesummary}"> <span class="icon fa-3x fas fa-table cr1"></span> <span class="text">Vote Summary</span> </button> </div> <div class="report-item"> <button onclick="{showpiesummary}"> <span class="icon fa-3x fas fa-chart-pie cr2"></span> <span class="text">Pie Chart</span> </button> </div> <div class="report-item"> <button onclick="{showbarsummary}"> <span class="icon fa-3x fas fa-chart-bar cr3"></span> <span class="text">Bar Chart</span> </button> </div> <div class="report-item"> <button onclick="{showstaffcompare}"> <span class="icon fa-3x fas fa-chalkboard-teacher cr6"></span> <span class="text">Staff Compare</span> </button> </div> <div class="report-item"> <button onclick="{showrawvote}"> <span class="icon fa-3x fas fa-table cr4"></span> <span class="text">Raw Vote</span> </button> </div> <div class="report-item"> <button onclick="{showstaffperf}"> <span class="icon fa-3x far fa-id-card cr5"></span> <span class="text">Staff Performance</span> </button> </div> </div>', 'report-staff-home,[data-is="report-staff-home"]{ margin: 0 auto; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; display: block; overflow: auto; background-color: bisque; } @media (min-width: 620px) { report-staff-home .report-home-main,[data-is="report-staff-home"] .report-home-main{ column-count: 2; column-gap: 20px; } } @media (min-width: 960px) { report-staff-home .report-home-main,[data-is="report-staff-home"] .report-home-main{ column-count: 3; column-gap: 20px; } } report-staff-home .report-home-main,[data-is="report-staff-home"] .report-home-main{ margin: 0 auto; padding: 20px; max-width: 1000px; } report-staff-home .report-home-main,[data-is="report-staff-home"] .report-home-main{ display: block; margin: 0 auto; padding: 10px; } report-staff-home .report-home-main .report-item,[data-is="report-staff-home"] .report-home-main .report-item{ margin: 2px auto; padding: 0; margin-bottom: 20px; height: 100px; break-inside: avoid; } report-staff-home .report-home-main .report-item button,[data-is="report-staff-home"] .report-home-main .report-item button{ margin: 0 auto; padding: 0; display: grid; width: 100%; height: 100%; } report-staff-home .report-home-main .report-item button .icon,[data-is="report-staff-home"] .report-home-main .report-item button .icon{ justify-self: center; align-self: center; } report-staff-home .report-home-main .report-item button .text,[data-is="report-staff-home"] .report-home-main .report-item button .text{ justify-self: center; align-self: center; font-size: 1rem; font-weight: bold; } report-staff-home .report-home-main .report-item button .icon.cr1,[data-is="report-staff-home"] .report-home-main .report-item button .icon.cr1{ color: chocolate; } report-staff-home .report-home-main .report-item button .icon.cr2,[data-is="report-staff-home"] .report-home-main .report-item button .icon.cr2{ color: cornflowerblue; } report-staff-home .report-home-main .report-item button .icon.cr3,[data-is="report-staff-home"] .report-home-main .report-item button .icon.cr3{ color: olivedrab; } report-staff-home .report-home-main .report-item button .icon.cr4,[data-is="report-staff-home"] .report-home-main .report-item button .icon.cr4{ color: darkorchid; } report-staff-home .report-home-main .report-item button .icon.cr5,[data-is="report-staff-home"] .report-home-main .report-item button .icon.cr5{ color: sandybrown; } report-staff-home .report-home-main .report-item button .icon.cr6,[data-is="report-staff-home"] .report-home-main .report-item button .icon.cr6{ color: navy; }', '', function(opts) {


        let self = this;

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.showpiesummary = () => {
            let url = 'http://localhost:3000/customer/staff/report/pie-votesummary';
            secure.nav(url)

        }
        this.showbarsummary = () => {
            let url = 'http://localhost:3000/customer/staff/report/bar-votesummary';
            secure.nav(url)

        }
        this.showvotesummary = () => {
            let url = 'http://localhost:3000/customer/staff/report/votesummary';
            secure.nav(url)

        }
        this.showrawvote = () => {
            let url = 'http://localhost:3000/customer/staff/report/raw-vote';
            secure.nav(url)

        }
        this.showstaffcompare = () => {
            let url = 'http://localhost:3000/customer/staff/report/staff-compare';
            secure.nav(url)

        }
        this.showstaffperf = () => {
            let url = 'http://localhost:3000/customer/staff/report/staff-perf';
            secure.nav(url)

        }
});
riot.tag2('pie-votesummary-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <pie-votesummary-search ref="viewer" class="view"></pie-votesummary-search> </yield> <yield to="entry"> <pie-votesummary-result ref="entry" class="entry"></pie-votesummary-result> </yield> </flip-screen>', 'pie-votesummary-manage,[data-is="pie-votesummary-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } pie-votesummary-manage .view,[data-is="pie-votesummary-manage"] .view,pie-votesummary-manage .entry,[data-is="pie-votesummary-manage"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Vote Summary (Pie Chart)'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.PieSummarySearch, onShowSearch)
            addEvt(events.name.PieSummaryResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.PieSummaryResult, onShowResult)
            delEvt(events.name.PieSummarySearch, onShowSearch)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }

        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});

riot.tag2('pie-votesummary-org', '<div ref="chart" class="chart-box"></div>', 'pie-votesummary-org,[data-is="pie-votesummary-org"]{ display: block; margin: 0 auto; padding: 3px; border: 1px solid silver; border-radius: 3px; } pie-votesummary-org .chart-box,[data-is="pie-votesummary-org"] .chart-box{ display: block; margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {
        let self = this;

        let updatecontent = () => {
            let data = [];
            self.opts.org.choices.forEach(item => {
                data.push({ name: item.text, y: item.Pct })
            })
            Highcharts.chart(chart, {
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
                    text: self.opts.org.OrgName
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
                    data: data
                }]
            });

            self.update();
        }

        let chart;
        let initCtrls = () => {
            chart = self.refs['chart']
            updatecontent();
        }
        let freeCtrls = () => {
            chart = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('pie-votesummary-question-slide', '<div class="question-box"> <span class="caption">{(opts.slide) ? opts.slide.text : \'\'}</span> <div class="choice-box"> <virtual each="{choice in opts.slide.choices}"> <span class="choiceNo">{choice.choice}</span> <span class="choiceText">{choice.text}</span> </virtual> </div> <div class="content-box"> <virtual each="{org in opts.slide.orgs}"> <pie-votesummary-org class="item" org="{org}"></pie-votesummary-org> </virtual> </div> </div>', '@media (min-width: 620px) { pie-votesummary-question-slide,[data-is="pie-votesummary-question-slide"]{ max-width: 550px; } pie-votesummary-question-slide .question-box .content-box,[data-is="pie-votesummary-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); grid-gap: 5px; grid-auto-rows: 100px; } } @media (min-width: 960px) { pie-votesummary-question-slide,[data-is="pie-votesummary-question-slide"]{ max-width: 850px; } pie-votesummary-question-slide .question-box .content-box,[data-is="pie-votesummary-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 5px; grid-auto-rows: 150px; } } pie-votesummary-question-slide,[data-is="pie-votesummary-question-slide"]{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; white-space: nowrap; } pie-votesummary-question-slide .question-box,[data-is="pie-votesummary-question-slide"] .question-box{ margin: 0 auto; display: block; color: white; border: 1px solid cornflowerblue; border-radius: 3px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } pie-votesummary-question-slide .question-box .caption,[data-is="pie-votesummary-question-slide"] .question-box .caption{ display: block; margin: 0 auto; padding: 5px; background-color: cornflowerblue; } pie-votesummary-question-slide .question-box .choice-box,[data-is="pie-votesummary-question-slide"] .question-box .choice-box{ display: grid; margin: 5px; margin-bottom: 0; padding: 5px; grid-template-columns: 30px 1fr; grid-gap: 5px; background: white; border: 1px solid silver; } pie-votesummary-question-slide .question-box .choice-box .choiceNo,[data-is="pie-votesummary-question-slide"] .question-box .choice-box .choiceNo{ display: inline-block; overflow: hidden; white-space: normal; text-align: right; color: black; height: auto; } pie-votesummary-question-slide .question-box .choice-box .choiceText,[data-is="pie-votesummary-question-slide"] .question-box .choice-box .choiceText{ display: inline-block; overflow: hidden; white-space: normal; text-align: left; color: black; height: auto; } pie-votesummary-question-slide .question-box .content-box,[data-is="pie-votesummary-question-slide"] .question-box .content-box{ display: grid; margin: 0 auto; margin-bottom: 5px; padding: 5px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 5px; grid-auto-rows: 200px; } pie-votesummary-question-slide .question-box .content-box .item,[data-is="pie-votesummary-question-slide"] .question-box .content-box .item{ display: inline-block; margin: 3px auto; padding: 0; color: black; width: 100%; height: 100%; }', '', function(opts) {
});
riot.tag2('pie-votesummary-result', '<div class="result"> <div class="tabs"> <date-result caption="{(content && content.labels) ? content.labels.date : \'Date\'}" begin="{current.begin}" end="{current.end}"></date-result> <virtial if="{current.slides && current.slides.length > 0}"> <virtial each="{slide in current.slides}"> <pie-votesummary-question-slide slide="{slide}"></pie-votesummary-question-slide> </virtial> </virtial> </div> <div class="tool"> <button class="float-button" onclick="{goback}"> <span class="fas fa-times"></span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home"></span> </button> </div> </div>', 'pie-votesummary-result,[data-is="pie-votesummary-result"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'result\' \'.\'; background-color: whitesmoke; } pie-votesummary-result>.result,[data-is="pie-votesummary-result"]>.result{ grid-area: result; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } pie-votesummary-result>.result .tabs,[data-is="pie-votesummary-result"]>.result .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; } pie-votesummary-result>.result .tool,[data-is="pie-votesummary-result"]>.result .tool{ grid-area: tool; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } pie-votesummary-result>.result .tool .float-button,[data-is="pie-votesummary-result"]>.result .tool .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } pie-votesummary-result>.result .tool .float-button:hover,[data-is="pie-votesummary-result"]>.result .tool .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {


        let self = this;
        let screenId = 'pie-votesummary-manage';
        let shown = false;
        let result = null;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                if (result && result[lang.langId]) {
                    self.current = result[lang.langId]

                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;

            $.ajax({
                type: "POST",
                url: "/customer/api/report/votesummaries/search",
                data: JSON.stringify(search_opts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    result = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.goback = () => {
            shown = false;
            events.raise(events.name.PieSummarySearch)
        }

        this.setup = (criteria) => {

            search_opts = criteria;
            shown = true;
            refresh();
        }

        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('pie-votesummary-search', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{onseach}"> <span class="fas fa-search">&nbsp;</span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home">&nbsp;</span> </button> </div> <div ref="search" class="searcharea"> <div class="input-block center"> <span>{(content) ? content.title : \'\'}</span> </div> <div class="input-block center"> <nselect ref="ctrlQSets" title="{(content && content.labels) ? content.labels.questionSet : \'Question Set\'}"></nselect> </div> <div class="input-block center"> <ninput ref="ctrlBegin" title="{(content && content.labels) ? content.labels.beginDate : \'Begin Date\'}" type="date"></ninput> <ninput ref="ctrlEnd" title="{(content && content.labels) ? content.labels.endDate : \'End Date\'}" type="date"></ninput> </div> <div class="input-block center"> <ncheckedtree ref="ctrlQuesTree" title="{(content && content.labels) ? content.labels.question : \'Question\'}" class="tree"></ncheckedtree> </div> <div class="input-block center"> <ncheckedtree ref="ctrlOrgTree" title="{(content && content.labels) ? content.labels.organization : \'Organization\'}" class="tree"></ncheckedtree> </div> <br> </div> </div>', 'pie-votesummary-search,[data-is="pie-votesummary-search"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } pie-votesummary-search>.scrarea,[data-is="pie-votesummary-search"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea searcharea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } pie-votesummary-search>.scrarea>.toolarea,[data-is="pie-votesummary-search"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } pie-votesummary-search>.scrarea>.toolarea .float-button,[data-is="pie-votesummary-search"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } pie-votesummary-search>.scrarea>.toolarea .float-button:hover,[data-is="pie-votesummary-search"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } pie-votesummary-search>.scrarea>.searcharea,[data-is="pie-votesummary-search"]>.scrarea>.searcharea{ grid-area: searcharea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } pie-votesummary-search>.scrarea>.searcharea .input-block,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block{ display: block; margin: 0; margin-top: 10px; padding: 0; width: 100%; max-width: 800px; text-align: center; } pie-votesummary-search>.scrarea>.searcharea .input-block.center,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block.center{ margin: auto; margin-top: 10px; } pie-votesummary-search>.scrarea>.searcharea .input-block span,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block span,pie-votesummary-search>.scrarea>.searcharea .input-block button,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block button{ display: inline-block; margin: 0 auto; padding: 0; width: 50%; font-size: 1rem; font-size: bold; } pie-votesummary-search>.scrarea>.searcharea .input-block span.label,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block span.label{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } pie-votesummary-search>.scrarea>.searcharea .input-block span input,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block span input{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } pie-votesummary-search>.scrarea>.searcharea .input-block .tree,[data-is="pie-votesummary-search"]>.scrarea>.searcharea .input-block .tree{ text-align: left; }', '', function(opts) {


        let self = this;
        let screenId = 'pie-votesummary-manage';
        let qsetModel;
        let quesModel;
        let orgModel;

        let defaultContent = {
            title: 'Pie chart vote summary.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();
                updateOrgs();
                self.update();
            }
        }

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();

                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value();

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);

                ctrlQSets.value(lastValue);
            }
        }

        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }

        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValues = ctrlQuesTree.selectedItems();

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;

                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);

                ctrlQuesTree.selectedItems(lastValues);
            }
        }

        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearOrgs = () => {
            if (ctrlOrgTree) {
                ctrlOrgTree.clear();
            }
        }

        let updateOrgs = () => {
            if (ctrlOrgTree && orgModel) {
                let lastValues = ctrlOrgTree.selectedItems();

                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);

                ctrlOrgTree.selectedItems(lastValues);
            }
        }

        let loadOrgs = (qsetid) => {
            let criteria = { }
            if (ctrlOrgTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/org/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        orgModel = ret.data;
                        updateOrgs();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            ctrlOrgTree = self.refs['ctrlOrgTree']
            loadQSets();

            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlOrgTree = null;
            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.onseach = () => {
            let qsetid = ctrlQSets.value();
            let beginDT = String(ctrlBegin.value());
            let endDT = String(ctrlEnd.value());

            let slides = [];
            let quesmap = ctrlQuesTree.selectedItems().map(item => item.id );
            quesmap.forEach(quesId => {
                slides.push({ qSeq: quesId })
            });
            let orgs = []
            let orgmap = ctrlOrgTree.selectedItems().map(item => item.id );
            orgmap.forEach(orgId => {
                orgs.push({ orgId: orgId })
            });

            let criteria = {
                qsetId: qsetid,
                beginDate: beginDT,
                endDate: endDT,
                slides: slides,
                orgs: orgs
            }

            events.raise(events.name.PieSummaryResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('rawvote-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <rawvote-search ref="viewer" class="view"></rawvote-search> </yield> <yield to="entry"> <rawvote-result ref="entry" class="entry"></rawvote-result> </yield> </flip-screen>', 'rawvote-manage,[data-is="rawvote-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } rawvote-manage .view,[data-is="rawvote-manage"] .view,rawvote-manage .entry,[data-is="rawvote-manage"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Raw Vote'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.RawVoteSearch, onShowSearch)
            addEvt(events.name.RawVoteResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.RawVoteResult, onShowResult)
            delEvt(events.name.RawVoteSearch, onShowSearch)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }

        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});

riot.tag2('rawvote-question-slide', '<div class="question-box"> <span class="caption">{(opts.slide) ? opts.slide.text : \'\'}</span> <div class="choice-box"> <virtual each="{choice in opts.slide.choices}"> <span class="choiceNo">{choice.choice}</span> <span class="choiceText">{choice.text}</span> </virtual> </div> <div class="content-box"> <rawvote-table class="item" votes="{opts.slide.votes}"></rawvote-table> </div> </div>', '@media (min-width: 620px) { rawvote-question-slide,[data-is="rawvote-question-slide"]{ max-width: 550px; } rawvote-question-slide .question-box .content-box,[data-is="rawvote-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 200px; } } @media (min-width: 960px) { rawvote-question-slide,[data-is="rawvote-question-slide"]{ max-width: 850px; } rawvote-question-slide .question-box .content-box,[data-is="rawvote-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 250px; } } rawvote-question-slide,[data-is="rawvote-question-slide"]{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; white-space: nowrap; } rawvote-question-slide .question-box,[data-is="rawvote-question-slide"] .question-box{ margin: 0 auto; display: block; color: white; border: 1px solid cornflowerblue; border-radius: 3px; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } rawvote-question-slide .question-box .caption,[data-is="rawvote-question-slide"] .question-box .caption{ display: block; margin: 0 auto; padding: 5px; background-color: cornflowerblue; } rawvote-question-slide .question-box .choice-box,[data-is="rawvote-question-slide"] .question-box .choice-box{ display: grid; margin: 5px; margin-bottom: 0; padding: 5px; grid-template-columns: 30px 1fr; grid-gap: 5px; background: white; border: 1px solid silver; } rawvote-question-slide .question-box .choice-box .choiceNo,[data-is="rawvote-question-slide"] .question-box .choice-box .choiceNo{ display: inline-block; overflow: hidden; white-space: normal; text-align: right; color: black; height: auto; } rawvote-question-slide .question-box .choice-box .choiceText,[data-is="rawvote-question-slide"] .question-box .choice-box .choiceText{ display: inline-block; overflow: hidden; white-space: normal; text-align: left; color: black; height: auto; } rawvote-question-slide .question-box .content-box,[data-is="rawvote-question-slide"] .question-box .content-box{ display: grid; margin: 0 auto; margin-bottom: 5px; padding: 5px; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 300px; } rawvote-question-slide .question-box .content-box .item,[data-is="rawvote-question-slide"] .question-box .content-box .item{ display: block; margin: 3px auto; padding: 0; color: black; width: 100%; max-width: 100%; height: 100%; overflow: hidden; }', '', function(opts) {
});
riot.tag2('rawvote-result', '<div class="result"> <div class="tabs"> <date-result caption="{(content && content.labels) ? content.labels.date : \'Date\'}" begin="{current.begin}" end="{current.end}"></date-result> <virtial if="{current.slides && current.slides.length > 0}"> <virtial each="{slide in current.slides}"> <rawvote-question-slide slide="{slide}"></rawvote-question-slide> </virtial> </virtial> </div> <div class="tool"> <button class="float-button" onclick="{goback}"> <span class="fas fa-times"></span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home"></span> </button> </div> </div>', 'rawvote-result,[data-is="rawvote-result"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'result\' \'.\'; background-color: whitesmoke; } rawvote-result>.result,[data-is="rawvote-result"]>.result{ grid-area: result; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } rawvote-result>.result .tabs,[data-is="rawvote-result"]>.result .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; } rawvote-result>.result .tool,[data-is="rawvote-result"]>.result .tool{ grid-area: tool; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } rawvote-result>.result .tool .float-button,[data-is="rawvote-result"]>.result .tool .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } rawvote-result>.result .tool .float-button:hover,[data-is="rawvote-result"]>.result .tool .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {


        let self = this;
        let screenId = 'rawvote-manage';
        let shown = false;
        let result = null;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                if (result) {
                    self.current = result[lang.langId];

                }
                if (!self.current) self.current = {
                    begin: '',
                    end: '',
                    slides: []
                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;

            $.ajax({
                type: "POST",
                url: "/customer/api/report/rawvotes/search",
                data: JSON.stringify(search_opts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    result = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { refresh(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.goback = () => {
            shown = false;
            events.raise(events.name.RawVoteSearch)
        }

        this.setup = (criteria) => {

            search_opts = criteria;
            shown = true;
            refresh();
        }

        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('rawvote-search', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{onseach}"> <span class="fas fa-search">&nbsp;</span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home">&nbsp;</span> </button> </div> <div ref="search" class="searcharea"> <div class="input-block center"> <span>{(content) ? content.title : \'Raw Vote.\'}</span> </div> <div class="input-block center"> <nselect ref="ctrlQSets" title="{(content && content.labels) ? content.labels.questionSet : \'Question Set\'}"></nselect> </div> <div class="input-block center"> <ninput ref="ctrlBegin" title="{(content && content.labels) ? content.labels.beginDate : \'Begin Date\'}" type="date"></ninput> <ninput ref="ctrlEnd" title="{(content && content.labels) ? content.labels.endDate : \'End Date\'}" type="date"></ninput> </div> <div class="input-block center"> <ntree ref="ctrlQuesTree" title="{(content && content.labels) ? content.labels.question : \'Question\'}" class="tree"></ntree> </div> <div class="input-block center"> <ntree ref="ctrlOrgTree" title="{(content && content.labels) ? content.labels.organization : \'Organization\'}" class="tree"></ntree> </div> <br> </div> </div>', 'rawvote-search,[data-is="rawvote-search"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } rawvote-search>.scrarea,[data-is="rawvote-search"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea searcharea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } rawvote-search>.scrarea>.toolarea,[data-is="rawvote-search"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } rawvote-search>.scrarea>.toolarea .float-button,[data-is="rawvote-search"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } rawvote-search>.scrarea>.toolarea .float-button:hover,[data-is="rawvote-search"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } rawvote-search>.scrarea>.searcharea,[data-is="rawvote-search"]>.scrarea>.searcharea{ grid-area: searcharea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } rawvote-search>.scrarea>.searcharea .input-block,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block{ display: block; margin: 0; margin-top: 10px; padding: 0; width: 100%; max-width: 800px; text-align: center; } rawvote-search>.scrarea>.searcharea .input-block.center,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block.center{ margin: auto; margin-top: 10px; } rawvote-search>.scrarea>.searcharea .input-block span,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block span,rawvote-search>.scrarea>.searcharea .input-block button,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block button{ display: inline-block; margin: 0 auto; padding: 0; width: 50%; font-size: 1rem; font-size: bold; } rawvote-search>.scrarea>.searcharea .input-block span.label,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block span.label{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } rawvote-search>.scrarea>.searcharea .input-block span input,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block span input{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } rawvote-search>.scrarea>.searcharea .input-block .tree,[data-is="rawvote-search"]>.scrarea>.searcharea .input-block .tree{ text-align: left; }', '', function(opts) {


        let self = this;
        let screenId = 'rawvote-manage';
        let qsetModel;
        let quesModel;
        let orgModel;

        let defaultContent = {
            title: 'Raw Vote.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();
                updateOrgs();
                self.update();
            }
        }

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();

                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value();

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);

                ctrlQSets.value(lastValue);
            }
        }

        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }

        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValue = ctrlQuesTree.selectedItem();

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;

                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);

                ctrlQuesTree.selectedItem(lastValue);
            }
        }

        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearOrgs = () => {
            if (ctrlOrgTree) {
                ctrlOrgTree.clear();
            }
        }

        let updateOrgs = () => {
            if (ctrlOrgTree && orgModel) {
                let lastValue = ctrlOrgTree.selectedItem();

                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);

            }
        }

        let loadOrgs = (qsetid) => {
            let criteria = { }
            if (ctrlOrgTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/org/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        orgModel = ret.data;
                        updateOrgs();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            ctrlOrgTree = self.refs['ctrlOrgTree']
            loadQSets();

            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlOrgTree = null;
            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.onseach = () => {
            let qsetid = ctrlQSets.value();
            let beginDT = String(ctrlBegin.value());
            let endDT = String(ctrlEnd.value());

            let qseq = ctrlQuesTree.selectedItem();
            let orgid = ctrlOrgTree.selectedItem();

            let criteria = {
                langId: lang.langId,
                beginDate: beginDT,
                endDate: endDT,
                qsetId: qsetid,
                qseq: qseq,
                orgId: orgid
            }

            events.raise(events.name.RawVoteResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('rawvote-table', '<div ref="grid" class="grid-box"></div>', 'rawvote-table,[data-is="rawvote-table"]{ display: block; position: relative; margin: 0 auto; padding: 3px; border: 1px solid silver; border-radius: 3px; overflow: auto; } rawvote-table .grid-box,[data-is="rawvote-table"] .grid-box{ display: block; position: absolute; margin: 0 auto; padding: 0; width: 100%; height: 100%; } rawvote-table .grid-box .tabulator-col-title,[data-is="rawvote-table"] .grid-box .tabulator-col-title{ text-align: center; }', '', function(opts) {
        let self = this;
        let screenId = 'rawvote-manage';
        let defaultContent = {
            columns: {
                date: 'Date',
                choice: 'Choice',
                device: 'Device',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
            }

            let data = self.opts.votes;

            let columns = [
                { title: self.content.columns.date, field: 'VoteDateS', headerSort:false },
                { title: self.content.columns.choice, field: 'VoteText', headerSort:false },
                { title: self.content.columns.device, field: 'DeviceId', align: 'center', headerSort:false },
                { title: self.content.columns.organization, field: 'OrgName', align: 'left', headerSort:false },
                { title: self.content.columns.staff, field: 'FullName', align: 'left', headerSort:false }
            ]

            if (grid) {
                let table = new Tabulator(grid, {
                    layout: 'fitDataFill',
                    columnVertAlign: 'middle',
                    data: data,
                    columns: columns,
                    groupBy: "DeviceId",
                });
            }

            self.update();
        }

        let grid;
        let initCtrls = () => {
            grid = self.refs['grid']
            updatecontent();
        }
        let freeCtrls = () => {
            grid = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('staff-compare-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <staff-compare-search ref="viewer" class="view"></staff-compare-search> </yield> <yield to="entry"> <staff-compare-result ref="entry" class="entry"></staff-compare-result> </yield> </flip-screen>', 'staff-compare-manage,[data-is="staff-compare-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-compare-manage .view,[data-is="staff-compare-manage"] .view,staff-compare-manage .entry,[data-is="staff-compare-manage"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Staff Compare'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.StaffCompareSearch, onShowSearch)
            addEvt(events.name.StaffCompareResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.StaffCompareResult, onShowResult)
            delEvt(events.name.StaffCompareSearch, onShowSearch)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }

        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});

riot.tag2('staff-compare-org', '<div ref="chart" class="chart-box"></div>', 'staff-compare-org,[data-is="staff-compare-org"]{ display: block; margin: 0 auto; padding: 3px; border: 1px solid silver; border-radius: 3px; } staff-compare-org .chart-box,[data-is="staff-compare-org"] .chart-box{ display: block; margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {
        let self = this;

        let updatecontent = () => {
            let data = [];

            self.opts.member.choices.forEach(item => {
                data.push({ name: item.text, y: item.Pct })
            })
            Highcharts.chart(chart, {
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
                    text: self.opts.member.FullName
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
                    data: data
                }]
            });

            self.update();
        }

        let chart;
        let initCtrls = () => {
            chart = self.refs['chart']
            updatecontent();
        }
        let freeCtrls = () => {
            chart = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('staff-compare-question-slide', '<div class="question-box"> <span class="caption">{(opts.slide) ? opts.slide.text : \'\'}</span> <div class="choice-box"> <virtual each="{choice in opts.slide.choices}"> <span class="choiceNo">{choice.choice}</span> <span class="choiceText">{choice.text}</span> </virtual> </div> <div class="content-box"> <virtual each="{member in opts.slide.members}"> <staff-compare-org class="item" member="{member}"></staff-compare-org> </virtual> </div> </div>', '@media (min-width: 620px) { staff-compare-question-slide,[data-is="staff-compare-question-slide"]{ max-width: 550px; } staff-compare-question-slide .question-box .content-box,[data-is="staff-compare-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); grid-gap: 5px; grid-auto-rows: 100px; } } @media (min-width: 960px) { staff-compare-question-slide,[data-is="staff-compare-question-slide"]{ max-width: 850px; } staff-compare-question-slide .question-box .content-box,[data-is="staff-compare-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 5px; grid-auto-rows: 150px; } } staff-compare-question-slide,[data-is="staff-compare-question-slide"]{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; white-space: nowrap; } staff-compare-question-slide .question-box,[data-is="staff-compare-question-slide"] .question-box{ margin: 0 auto; display: block; color: white; border: 1px solid cornflowerblue; border-radius: 3px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } staff-compare-question-slide .question-box .caption,[data-is="staff-compare-question-slide"] .question-box .caption{ display: block; margin: 0 auto; padding: 5px; background-color: cornflowerblue; } staff-compare-question-slide .question-box .choice-box,[data-is="staff-compare-question-slide"] .question-box .choice-box{ display: grid; margin: 5px; margin-bottom: 0; padding: 5px; grid-template-columns: 30px 1fr; grid-gap: 5px; background: white; border: 1px solid silver; } staff-compare-question-slide .question-box .choice-box .choiceNo,[data-is="staff-compare-question-slide"] .question-box .choice-box .choiceNo{ display: inline-block; overflow: hidden; white-space: normal; text-align: right; color: black; height: auto; } staff-compare-question-slide .question-box .choice-box .choiceText,[data-is="staff-compare-question-slide"] .question-box .choice-box .choiceText{ display: inline-block; overflow: hidden; white-space: normal; text-align: left; color: black; height: auto; } staff-compare-question-slide .question-box .content-box,[data-is="staff-compare-question-slide"] .question-box .content-box{ display: grid; margin: 0 auto; margin-bottom: 5px; padding: 5px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 5px; grid-auto-rows: 200px; } staff-compare-question-slide .question-box .content-box .item,[data-is="staff-compare-question-slide"] .question-box .content-box .item{ display: inline-block; margin: 3px auto; padding: 0; color: black; width: 100%; height: 100%; }', '', function(opts) {
});
riot.tag2('staff-compare-result', '<div class="result"> <div class="tabs"> <date-result caption="{(content && content.labels) ? content.labels.date : \'Date\'}" begin="{current.begin}" end="{current.end}"></date-result> <virtial if="{current.slides && current.slides.length > 0}"> <virtial each="{slide in current.slides}"> <staff-compare-question-slide slide="{slide}"></staff-compare-question-slide> </virtial> </virtial> </div> <div class="tool"> <button class="float-button" onclick="{goback}"> <span class="fas fa-times"></span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home"></span> </button> </div> </div>', 'staff-compare-result,[data-is="staff-compare-result"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'result\' \'.\'; background-color: whitesmoke; } staff-compare-result>.result,[data-is="staff-compare-result"]>.result{ grid-area: result; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-compare-result>.result .tabs,[data-is="staff-compare-result"]>.result .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-compare-result>.result .tool,[data-is="staff-compare-result"]>.result .tool{ grid-area: tool; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } staff-compare-result>.result .tool .float-button,[data-is="staff-compare-result"]>.result .tool .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } staff-compare-result>.result .tool .float-button:hover,[data-is="staff-compare-result"]>.result .tool .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {


        let self = this;
        let screenId = 'staff-compare-manage';
        let shown = false;
        let result = null;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                if (result && result[lang.langId]) {
                    self.current = result[lang.langId]

                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;

            $.ajax({
                type: "POST",
                url: "/customer/api/report/staffcompare/search",
                data: JSON.stringify(search_opts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    result = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
            updatecontent();
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.goback = () => {
            shown = false;
            events.raise(events.name.StaffCompareSearch)
        }

        this.setup = (criteria) => {

            search_opts = criteria;
            shown = true;
            refresh();
        }

        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('staff-compare-search', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{onseach}"> <span class="fas fa-search">&nbsp;</span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home">&nbsp;</span> </button> </div> <div ref="search" class="searcharea"> <div class="input-block center"> <span>{(content) ? content.title : \'Staff Compare.\'}</span> </div> <div class="input-block center"> <nselect ref="ctrlQSets" title="{(content && content.labels) ? content.labels.questionSet : \'Question Set\'}"></nselect> </div> <div class="input-block center"> <ninput ref="ctrlBegin" title="{(content && content.labels) ? content.labels.beginDate : \'Begin Date\'}" type="date"></ninput> <ninput ref="ctrlEnd" title="{(content && content.labels) ? content.labels.endDate : \'End Date\'}" type="date"></ninput> </div> <div class="input-block center"> <ncheckedtree ref="ctrlQuesTree" title="{(content && content.labels) ? content.labels.question : \'Question\'}" class="tree"></ncheckedtree> </div> <div class="input-block center"> <ntree ref="ctrlOrgTree" title="{(content && content.labels) ? content.labels.organization : \'Organization\'}" class="tree"></ntree> </div> <div class="input-block center"> <ncheckedtree ref="ctrlMemberTree" title="{(content && content.labels) ? content.labels.staff : \'Staff\'}" class="tree"></ncheckedtree> </div> <br> </div> </div>', 'staff-compare-search,[data-is="staff-compare-search"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } staff-compare-search>.scrarea,[data-is="staff-compare-search"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea searcharea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } staff-compare-search>.scrarea>.toolarea,[data-is="staff-compare-search"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } staff-compare-search>.scrarea>.toolarea .float-button,[data-is="staff-compare-search"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } staff-compare-search>.scrarea>.toolarea .float-button:hover,[data-is="staff-compare-search"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } staff-compare-search>.scrarea>.searcharea,[data-is="staff-compare-search"]>.scrarea>.searcharea{ grid-area: searcharea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } staff-compare-search>.scrarea>.searcharea .input-block,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block{ display: block; margin: 0; margin-top: 10px; padding: 0; width: 100%; max-width: 800px; text-align: center; } staff-compare-search>.scrarea>.searcharea .input-block.center,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block.center{ margin: auto; margin-top: 10px; } staff-compare-search>.scrarea>.searcharea .input-block span,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block span,staff-compare-search>.scrarea>.searcharea .input-block button,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block button{ display: inline-block; margin: 0 auto; padding: 0; width: 50%; font-size: 1rem; font-size: bold; } staff-compare-search>.scrarea>.searcharea .input-block span.label,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block span.label{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } staff-compare-search>.scrarea>.searcharea .input-block span input,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block span input{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } staff-compare-search>.scrarea>.searcharea .input-block .tree,[data-is="staff-compare-search"]>.scrarea>.searcharea .input-block .tree{ text-align: left; }', '', function(opts) {


        let self = this;
        let screenId = 'staff-compare-manage';
        let qsetModel;
        let quesModel;
        let orgModel;
        let memModel;

        let defaultContent = {
            title: 'Staff Compare.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();
                updateOrgs();
                updateMembers();
                self.update();
            }
        }

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();

                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value();

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);

                ctrlQSets.value(lastValue);
            }
        }
        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }
        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValues = ctrlQuesTree.selectedItems();

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;

                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);

                ctrlQuesTree.selectedItems(lastValues);
            }
        }
        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearOrgs = () => {
            if (ctrlOrgTree) {
                ctrlOrgTree.clear();
            }
        }
        let updateOrgs = () => {
            if (ctrlOrgTree && orgModel) {
                let lastValue = ctrlOrgTree.selectedItem();

                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);

            }
        }

        let loadOrgs = (qsetid) => {
            let criteria = { }
            if (ctrlOrgTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/org/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        orgModel = ret.data;
                        updateOrgs();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearMembers = () => {
            if (ctrlMemberTree) {
                ctrlMemberTree.clear();
            }
        }
        let updateMembers = () => {
            if (ctrlMemberTree && memModel) {
                let lastValues = ctrlMemberTree.selectedItems();

                let values = memModel[lang.langId];

                let fldmap = { valueField: 'memberId', textField: 'FullName', parentField: null }
                ctrlMemberTree.setup(values, fldmap);
                ctrlMemberTree.selectedItems(lastValues);
            }
        }
        let loadMembers = (criteria) => {
            if (ctrlMemberTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/filter/vote-members",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        memModel = ret.data;
                        updateMembers();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            if (ctrlQuesTree) {
                ctrlQuesTree.onSelectItems(reloadMembers)
            }
            ctrlOrgTree = self.refs['ctrlOrgTree']
            if (ctrlOrgTree) {
                ctrlOrgTree.onSelectItem(reloadMembers)
            }
            ctrlMemberTree = self.refs['ctrlMemberTree']
            loadQSets();

            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlMemberTree = null;
            if (ctrlOrgTree) {
                ctrlOrgTree.onSelectItem(null)
            }
            ctrlOrgTree = null;
            if (ctrlQuesTree) {
                ctrlQuesTree.onSelectItems(null)
            }
            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let reloadMembers = () => {
            let orgId = ctrlOrgTree.selectedItem()

            let filter = {}
            filter.qsetId = ctrlQSets.value()
            filter.beginDate = String(ctrlBegin.value());
            filter.endDate = String(ctrlEnd.value());
            filter.orgId = orgId

            loadMembers(filter)
        }

        this.onseach = () => {
            let qsetid = ctrlQSets.value();
            let beginDT = String(ctrlBegin.value());
            let endDT = String(ctrlEnd.value());

            let slides = [];
            let quesmap = ctrlQuesTree.selectedItems().map(item => item.id );
            quesmap.forEach(quesId => {
                slides.push({ qSeq: quesId })
            });
            let orgid = ctrlOrgTree.selectedItem();
            let members = []
            let memmap = ctrlMemberTree.selectedItems().map(item => item.id );
            memmap.forEach(memId => {
                members.push({ memberId: memId })
            });

            let criteria = {
                qsetId: qsetid,
                beginDate: beginDT,
                endDate: endDT,
                slides: slides,
                orgId: orgid,
                members: members
            }

            events.raise(events.name.StaffCompareResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('staff-perf-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <staff-perf-search ref="viewer" class="view"></staff-perf-search> </yield> <yield to="entry"> <staff-perf-result ref="entry" class="entry"></staff-perf-result> </yield> </flip-screen>', 'staff-perf-manage,[data-is="staff-perf-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-perf-manage .view,[data-is="staff-perf-manage"] .view,staff-perf-manage .entry,[data-is="staff-perf-manage"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Staff Performance'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.StaffPerfSearch, onShowSearch)
            addEvt(events.name.StaffPerfResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.StaffPerfResult, onShowResult)
            delEvt(events.name.StaffPerfSearch, onShowSearch)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }

        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});

riot.tag2('staff-pefr-question-slide', '<div class="question-box"> <span class="caption">{(opts.slide) ? opts.slide.text : \'\'}</span> <div class="choice-box"> <virtual each="{choice in opts.slide.choices}"> <span class="choiceNo">{choice.choice}</span> <span class="choiceText">{choice.text}</span> </virtual> </div> <div class="content-box"> </div> </div>', '@media (min-width: 620px) { staff-pefr-question-slide,[data-is="staff-pefr-question-slide"]{ max-width: 550px; } staff-pefr-question-slide .question-box .content-box,[data-is="staff-pefr-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 200px; } } @media (min-width: 960px) { staff-pefr-question-slide,[data-is="staff-pefr-question-slide"]{ max-width: 850px; } staff-pefr-question-slide .question-box .content-box,[data-is="staff-pefr-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 250px; } } staff-pefr-question-slide,[data-is="staff-pefr-question-slide"]{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; white-space: nowrap; } staff-pefr-question-slide .question-box,[data-is="staff-pefr-question-slide"] .question-box{ margin: 0 auto; display: block; color: white; border: 1px solid cornflowerblue; border-radius: 3px; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } staff-pefr-question-slide .question-box .caption,[data-is="staff-pefr-question-slide"] .question-box .caption{ display: block; margin: 0 auto; padding: 5px; background-color: cornflowerblue; } staff-pefr-question-slide .question-box .choice-box,[data-is="staff-pefr-question-slide"] .question-box .choice-box{ display: grid; margin: 5px; margin-bottom: 0; padding: 5px; grid-template-columns: 30px 1fr; grid-gap: 5px; background: white; border: 1px solid silver; } staff-pefr-question-slide .question-box .choice-box .choiceNo,[data-is="staff-pefr-question-slide"] .question-box .choice-box .choiceNo{ display: inline-block; overflow: hidden; white-space: normal; text-align: right; color: black; height: auto; } staff-pefr-question-slide .question-box .choice-box .choiceText,[data-is="staff-pefr-question-slide"] .question-box .choice-box .choiceText{ display: inline-block; overflow: hidden; white-space: normal; text-align: left; color: black; height: auto; } staff-pefr-question-slide .question-box .content-box,[data-is="staff-pefr-question-slide"] .question-box .content-box{ display: grid; margin: 0 auto; margin-bottom: 5px; padding: 5px; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 300px; } staff-pefr-question-slide .question-box .content-box .item,[data-is="staff-pefr-question-slide"] .question-box .content-box .item{ display: block; margin: 3px auto; padding: 0; color: black; width: 100%; max-width: 100%; height: 100%; overflow: hidden; }', '', function(opts) {
});
riot.tag2('staff-perf-result', '<div class="result"> <div class="tabs"> <date-result caption="{(content && content.labels) ? content.labels.date : \'Date\'}" begin="{current.begin}" end="{current.end}"></date-result> <virtial if="{current.slides && current.slides.length > 0}"> <virtial each="{slide in current.slides}"> <staff-perf-question-slide slide="{slide}"></staff-perf-question-slide> </virtial> </virtial> </div> <div class="tool"> <button class="float-button" onclick="{goback}"> <span class="fas fa-times"></span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home"></span> </button> </div> </div>', 'staff-perf-result,[data-is="staff-perf-result"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'result\' \'.\'; background-color: whitesmoke; } staff-perf-result>.result,[data-is="staff-perf-result"]>.result{ grid-area: result; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-perf-result>.result .tabs,[data-is="staff-perf-result"]>.result .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; } staff-perf-result>.result .tool,[data-is="staff-perf-result"]>.result .tool{ grid-area: tool; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } staff-perf-result>.result .tool .float-button,[data-is="staff-perf-result"]>.result .tool .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } staff-perf-result>.result .tool .float-button:hover,[data-is="staff-perf-result"]>.result .tool .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {


        let self = this;
        let screenId = 'staff-perf-manage';
        let shown = false;
        let result = null;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                if (result && result[lang.langId]) {
                    self.current = result[lang.langId]

                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;

        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.goback = () => {
            shown = false;
            events.raise(events.name.StaffPerfSearch)
        }

        this.setup = (criteria) => {

            search_opts = criteria;
            shown = true;
            refresh();
        }

        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('staff-perf-search', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{onseach}"> <span class="fas fa-search">&nbsp;</span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home">&nbsp;</span> </button> </div> <div ref="search" class="searcharea"> <div class="input-block center"> <span>{(content) ? content.title : \'Staff Performance.\'}</span> </div> <div class="input-block center"> <nselect ref="ctrlQSets" title="{(content && content.labels) ? content.labels.questionSet : \'Question Set\'}"></nselect> </div> <div class="input-block center"> <ninput ref="ctrlBegin" title="{(content && content.labels) ? content.labels.beginDate : \'Begin Date\'}" type="date"></ninput> <ninput ref="ctrlEnd" title="{(content && content.labels) ? content.labels.endDate : \'End Date\'}" type="date"></ninput> </div> <div class="input-block center"> <ncheckedtree ref="ctrlQuesTree" title="{(content && content.labels) ? content.labels.question : \'Question\'}" class="tree"></ncheckedtree> </div> <br> </div> </div>', 'staff-perf-search,[data-is="staff-perf-search"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } staff-perf-search>.scrarea,[data-is="staff-perf-search"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea searcharea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } staff-perf-search>.scrarea>.toolarea,[data-is="staff-perf-search"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } staff-perf-search>.scrarea>.toolarea .float-button,[data-is="staff-perf-search"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } staff-perf-search>.scrarea>.toolarea .float-button:hover,[data-is="staff-perf-search"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } staff-perf-search>.scrarea>.searcharea,[data-is="staff-perf-search"]>.scrarea>.searcharea{ grid-area: searcharea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } staff-perf-search>.scrarea>.searcharea .input-block,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block{ display: block; margin: 0; margin-top: 10px; padding: 0; width: 100%; max-width: 800px; text-align: center; } staff-perf-search>.scrarea>.searcharea .input-block.center,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block.center{ margin: auto; margin-top: 10px; } staff-perf-search>.scrarea>.searcharea .input-block span,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block span,staff-perf-search>.scrarea>.searcharea .input-block button,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block button{ display: inline-block; margin: 0 auto; padding: 0; width: 50%; font-size: 1rem; font-size: bold; } staff-perf-search>.scrarea>.searcharea .input-block span.label,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block span.label{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } staff-perf-search>.scrarea>.searcharea .input-block span input,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block span input{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } staff-perf-search>.scrarea>.searcharea .input-block .tree,[data-is="staff-perf-search"]>.scrarea>.searcharea .input-block .tree{ text-align: left; }', '', function(opts) {


        let self = this;
        let screenId = 'staff-perf-manage';
        let qsetModel;
        let quesModel;

        let defaultContent = {
            title: 'Staff Performance.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();

                self.update();
            }
        }

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();

                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value();

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);

                ctrlQSets.value(lastValue);
            }
        }

        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }

        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValues = ctrlQuesTree.selectedItems();

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;

                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);

                ctrlQuesTree.selectedItems(lastValues);
            }
        }

        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']

            loadQSets();

        }
        let freeCtrls = () => {

            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.onseach = () => {

            let criteria = { }

            events.raise(events.name.StaffPerfResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('votesummary-manage', '<flip-screen ref="flipper"> <yield to="viewer"> <votesummary-search ref="viewer" class="view"></votesummary-search> </yield> <yield to="entry"> <votesummary-result ref="entry" class="entry"></votesummary-result> </yield> </flip-screen>', 'votesummary-manage,[data-is="votesummary-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } votesummary-manage .view,[data-is="votesummary-manage"] .view,votesummary-manage .entry,[data-is="votesummary-manage"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: auto; }', '', function(opts) {


        let self = this;

        let defaultContent = {
            title: 'Vote Summary'
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let flipper, view, entry;
        let initCtrls = () => {

            flipper = self.refs['flipper'];
            entry = (flipper) ? flipper.refs['entry'] : undefined;
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.VoteSummarySearch, onShowSearch)
            addEvt(events.name.VoteSummaryResult, onShowResult)
        }
        let unbindEvents = () => {
            delEvt(events.name.VoteSummaryResult, onShowResult)
            delEvt(events.name.VoteSummarySearch, onShowSearch)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }
        let onShowResult = (e) => {
            if (flipper) {
                flipper.toggle();
                let criteria = e.detail.data;
                if (entry) entry.setup(criteria);
            }

        }
        let onShowSearch = (e) => {
            if (flipper) {
                flipper.toggle();
            }
        }

});

riot.tag2('votesummary-question-slide', '<div class="question-box"> <span class="caption">{(opts.slide) ? opts.slide.text : \'\'}</span> <div class="choice-box"> <virtual each="{choice in opts.slide.choices}"> <span class="choiceNo">{choice.choice}</span> <span class="choiceText">{choice.text}</span> </virtual> </div> <div class="content-box"> <votesummary-table class="item" choices="{opts.slide.choices}" orgs="{opts.slide.orgs}"></votesummary-table> </div> </div>', '@media (min-width: 620px) { votesummary-question-slide,[data-is="votesummary-question-slide"]{ max-width: 550px; } votesummary-question-slide .question-box .content-box,[data-is="votesummary-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 200px; } } @media (min-width: 960px) { votesummary-question-slide,[data-is="votesummary-question-slide"]{ max-width: 850px; } votesummary-question-slide .question-box .content-box,[data-is="votesummary-question-slide"] .question-box .content-box{ display: grid; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 250px; } } votesummary-question-slide,[data-is="votesummary-question-slide"]{ display: block; margin: 0 auto; margin-bottom: 3px; padding: 5px; max-width: 1000px; white-space: nowrap; } votesummary-question-slide .question-box,[data-is="votesummary-question-slide"] .question-box{ margin: 0 auto; display: block; color: white; border: 1px solid cornflowerblue; border-radius: 3px; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } votesummary-question-slide .question-box .caption,[data-is="votesummary-question-slide"] .question-box .caption{ display: block; margin: 0 auto; padding: 5px; background-color: cornflowerblue; } votesummary-question-slide .question-box .choice-box,[data-is="votesummary-question-slide"] .question-box .choice-box{ display: grid; margin: 5px; margin-bottom: 0; padding: 5px; grid-template-columns: 30px 1fr; grid-gap: 5px; background: white; border: 1px solid silver; } votesummary-question-slide .question-box .choice-box .choiceNo,[data-is="votesummary-question-slide"] .question-box .choice-box .choiceNo{ display: inline-block; overflow: hidden; white-space: normal; text-align: right; color: black; height: auto; } votesummary-question-slide .question-box .choice-box .choiceText,[data-is="votesummary-question-slide"] .question-box .choice-box .choiceText{ display: inline-block; overflow: hidden; white-space: normal; text-align: left; color: black; height: auto; } votesummary-question-slide .question-box .content-box,[data-is="votesummary-question-slide"] .question-box .content-box{ display: grid; margin: 0 auto; margin-bottom: 5px; padding: 5px; grid-template-columns: 1fr; grid-gap: 5px; grid-auto-rows: 300px; } votesummary-question-slide .question-box .content-box .item,[data-is="votesummary-question-slide"] .question-box .content-box .item{ display: block; margin: 3px auto; padding: 0; color: black; width: 100%; max-width: 100%; height: 100%; overflow: hidden; }', '', function(opts) {
});
riot.tag2('votesummary-result', '<div class="result"> <div class="tabs"> <date-result caption="{(content && content.labels) ? content.labels.date : \'Date\'}" begin="{current.begin}" end="{current.end}"></date-result> <virtial if="{current.slides && current.slides.length > 0}"> <virtial each="{slide in current.slides}"> <votesummary-question-slide slide="{slide}"></votesummary-question-slide> </virtial> </virtial> </div> <div class="tool"> <button class="float-button" onclick="{goback}"> <span class="fas fa-times"></span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home"></span> </button> </div> </div>', 'votesummary-result,[data-is="votesummary-result"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'result\' \'.\'; background-color: whitesmoke; } votesummary-result>.result,[data-is="votesummary-result"]>.result{ grid-area: result; display: grid; grid-template-columns: 1fr auto 5px; grid-template-rows: 1fr; grid-template-areas: \'tabs tool .\'; margin: 0 auto; padding: 0; width: 100%; height: 100%; } votesummary-result>.result .tabs,[data-is="votesummary-result"]>.result .tabs{ grid-area: tabs; margin: 0 auto; padding: 0; width: 100%; height: 100%; } votesummary-result>.result .tool,[data-is="votesummary-result"]>.result .tool{ grid-area: tool; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } votesummary-result>.result .tool .float-button,[data-is="votesummary-result"]>.result .tool .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } votesummary-result>.result .tool .float-button:hover,[data-is="votesummary-result"]>.result .tool .float-button:hover{ color: whitesmoke; background: forestgreen; }', '', function(opts) {


        let self = this;
        let screenId = 'votesummary-manage';
        let shown = false;
        let search_opts = {
            langId: 'EN',
            beginDate: '',
            endDate: ''
        }
        let result = null;
        this.current = {
            begin: '',
            end: '',
            slides: []
        };

        let defaultContent = {
            title: ''
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (shown && screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                if (result && result[lang.langId]) {
                    self.current = result[lang.langId]

                }
                self.current.begin = search_opts.beginDate;
                self.current.end = search_opts.endDate;

                self.update();
            }
        }
        let refresh = () => {
            let scrId = screens.current.screenId;
            if (!shown || screenId !== scrId) return;

            $.ajax({
                type: "POST",
                url: "/customer/api/report/votesummaries/search",
                data: JSON.stringify(search_opts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (ret) => {

                    result = ret.data;

                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.goback = () => {
            shown = false;
            events.raise(events.name.VoteSummarySearch)
        }

        this.setup = (criteria) => {

            search_opts = criteria;
            shown = true;
            refresh();
        }

        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('votesummary-search', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{onseach}"> <span class="fas fa-search">&nbsp;</span> </button> <button class="float-button" onclick="{onhome}"> <span class="fas fa-home">&nbsp;</span> </button> </div> <div ref="search" class="searcharea"> <div class="input-block center"> <span>{(content) ? content.title : \'Vote Summary.\'}</span> </div> <div class="input-block center"> <nselect ref="ctrlQSets" title="{(content && content.labels) ? content.labels.questionSet : \'Question Set\'}"></nselect> </div> <div class="input-block center"> <ninput ref="ctrlBegin" title="{(content && content.labels) ? content.labels.beginDate : \'Begin Date\'}" type="date"></ninput> <ninput ref="ctrlEnd" title="{(content && content.labels) ? content.labels.endDate : \'End Date\'}" type="date"></ninput> </div> <div class="input-block center"> <ncheckedtree ref="ctrlQuesTree" title="{(content && content.labels) ? content.labels.question : \'Question\'}" class="tree"></ncheckedtree> </div> <div class="input-block center"> <ncheckedtree ref="ctrlOrgTree" title="{(content && content.labels) ? content.labels.organization : \'Organization\'}" class="tree"></ncheckedtree> </div> <br> </div> </div>', 'votesummary-search,[data-is="votesummary-search"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } votesummary-search>.scrarea,[data-is="votesummary-search"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea searcharea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } votesummary-search>.scrarea>.toolarea,[data-is="votesummary-search"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } votesummary-search>.scrarea>.toolarea .float-button,[data-is="votesummary-search"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } votesummary-search>.scrarea>.toolarea .float-button:hover,[data-is="votesummary-search"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } votesummary-search>.scrarea>.searcharea,[data-is="votesummary-search"]>.scrarea>.searcharea{ grid-area: searcharea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } votesummary-search>.scrarea>.searcharea .input-block,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block{ display: block; margin: 0; margin-top: 10px; padding: 0; width: 100%; max-width: 800px; text-align: center; } votesummary-search>.scrarea>.searcharea .input-block.center,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block.center{ margin: auto; margin-top: 10px; } votesummary-search>.scrarea>.searcharea .input-block span,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block span,votesummary-search>.scrarea>.searcharea .input-block button,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block button{ display: inline-block; margin: 0 auto; padding: 0; width: 50%; font-size: 1rem; font-size: bold; } votesummary-search>.scrarea>.searcharea .input-block span.label,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block span.label{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } votesummary-search>.scrarea>.searcharea .input-block span input,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block span input{ margin: 1px; padding: 2px; text-align: left; color: cornflowerblue; width: 100%; } votesummary-search>.scrarea>.searcharea .input-block .tree,[data-is="votesummary-search"]>.scrarea>.searcharea .input-block .tree{ text-align: left; }', '', function(opts) {


        let self = this;
        let screenId = 'votesummary-manage';
        let qsetModel;
        let quesModel;
        let orgModel;

        let defaultContent = {
            title: 'Vote Summary.',
            labels: {
                questionSet: 'Question Set',
                date: 'Date',
                beginDate: 'Begin Date',
                endDate: 'End Date',
                question: 'Question',
                organization: 'Organization',
                staff: 'Staff'
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                updateQSets();
                updateQuestions();
                updateOrgs();
                self.update();
            }
        }

        let onQSetSelectd = () => {
            if (ctrlQSets) {
                let qsetid = ctrlQSets.value();

                if (qsetid) {
                    loadQuestions(qsetid);
                }
                else {
                    clearQuestions();
                }
            }
        }

        let updateQSets = () => {
            if (ctrlQSets && qsetModel) {
                let lastValue = ctrlQSets.value();

                let values = qsetModel[lang.langId];
                let fldmap = { valueField: 'qSetId', textField: 'desc'}
                ctrlQSets.setup(values, fldmap, onQSetSelectd);

                ctrlQSets.value(lastValue);
            }
        }

        let loadQSets = () => {
            let criteria = {}
            if (ctrlQSets) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/set/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        qsetModel = ret.data;
                        updateQSets();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearQuestions = () => {
            if (ctrlQuesTree) {
                ctrlQuesTree.clear();
            }
        }

        let updateQuestions = () => {
            if (ctrlQuesTree && quesModel) {
                let lastValues = ctrlQuesTree.selectedItems();

                let questions = quesModel[lang.langId];
                let values = questions[0].slides;

                let fldmap = { valueField: 'qSeq', textField: 'text', parentField: null }
                ctrlQuesTree.setup(values, fldmap);

                ctrlQuesTree.selectedItems(lastValues);
            }
        }

        let loadQuestions = (qsetid) => {
            let criteria = {
                qSetId: qsetid
            }
            if (ctrlQuesTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/question/slide/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        quesModel = ret.data;
                        updateQuestions();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let clearOrgs = () => {
            if (ctrlOrgTree) {
                ctrlOrgTree.clear();
            }
        }

        let updateOrgs = () => {
            if (ctrlOrgTree && orgModel) {
                let lastValues = ctrlOrgTree.selectedItems();

                let values = orgModel[lang.langId];

                let fldmap = { valueField: 'orgId', textField: 'OrgName', parentField: 'parentId' }
                ctrlOrgTree.setup(values, fldmap);

                ctrlOrgTree.selectedItems(lastValues);
            }
        }

        let loadOrgs = (qsetid) => {
            let criteria = { }
            if (ctrlOrgTree) {
                $.ajax({
                    type: "POST",
                    url: "/customer/api/org/search",
                    data: JSON.stringify(criteria),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (ret) => {

                        orgModel = ret.data;
                        updateOrgs();
                    },
                    failure: (errMsg) => {
                        console.log(errMsg);
                    }
                })
            }
        }

        let ctrlQSets, ctrlBegin, ctrlEnd, ctrlQuesTree, ctrlOrgTree;
        let initCtrls = () => {
            ctrlQSets = self.refs['ctrlQSets']
            ctrlBegin = self.refs['ctrlBegin']
            ctrlEnd = self.refs['ctrlEnd']
            ctrlQuesTree = self.refs['ctrlQuesTree']
            ctrlOrgTree = self.refs['ctrlOrgTree']
            loadQSets();

            loadOrgs();
        }
        let freeCtrls = () => {
            ctrlOrgTree = null;
            ctrlQuesTree = null;
            ctrlEnd = null;
            ctrlBegin = null;
            ctrlQSets = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        this.onseach = () => {
            let qsetid = ctrlQSets.value();
            let beginDT = String(ctrlBegin.value());
            let endDT = String(ctrlEnd.value());

            let slides = [];
            let quesmap = ctrlQuesTree.selectedItems().map(item => item.id );
            quesmap.forEach(quesId => {
                slides.push({ qSeq: quesId })
            });
            let orgs = []
            let orgmap = ctrlOrgTree.selectedItems().map(item => item.id );
            orgmap.forEach(orgId => {
                orgs.push({ orgId: orgId })
            });

            let criteria = {
                qsetId: qsetid,
                beginDate: beginDT,
                endDate: endDT,
                slides: slides,
                orgs: orgs
            }

            events.raise(events.name.VoteSummaryResult, criteria)
        }
        this.onhome = () => {
            let paths = window.location.pathname.split('/');
            let url = window.location.origin
            for (i = 0; i < paths.length - 1; i++) {
                if (paths[i].length > 0) url += '/'
                url += paths[i]
            }
            nlib.nav.gotoUrl(url)
        }
});
riot.tag2('votesummary-table', '<div ref="grid" class="grid-box"></div>', 'votesummary-table,[data-is="votesummary-table"]{ display: block; position: relative; margin: 0 auto; padding: 3px; border: 1px solid silver; border-radius: 3px; overflow: auto; } votesummary-table .grid-box,[data-is="votesummary-table"] .grid-box{ display: block; position: absolute; margin: 0 auto; padding: 0; width: 100%; height: 100%; } votesummary-table .grid-box .tabulator-col-title,[data-is="votesummary-table"] .grid-box .tabulator-col-title{ text-align: center; }', '', function(opts) {
        let self = this;
        let screenId = 'votesummary-manage';
        let defaultContent = {
            columns: {
                organization: "Organization",
                branch: 'Branch',
                totalCnt: 'Count<br>(Total)',
                totalAvg: 'Avg<br>(Total)',
                totalPct: 'Percent<br>(Total)',
                eachCnt: 'Count',
                eachPct: 'Percent',
            }
        }
        this.content = this.defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
            }

            let data = [];
            let columns = [
                { title: self.content.columns.organization, field: 'OrgName', headerSort:false },
                { title: self.content.columns.branch, field: 'BranchName', headerSort:false },
                { title: self.content.columns.totalCnt, field: 'TotCnt', align: 'center', headerSort:false },
                { title: self.content.columns.totalAvg, field: 'AvgTot', align: 'center', headerSort:false },
                { title: self.content.columns.totalPct, field: 'AvgPct', align: 'center', headerSort:false }
            ]

            self.opts.choices.forEach(choice => {
                let group = {
                    title: choice.text + ' (' + choice.choice + ')',
                    columns: [
                        { title: self.content.columns.eachCnt, field: 'Cnt-' + String(choice.choice), align: 'center', headerSort:false },
                        { title: self.content.columns.eachPct, field: 'Pct-' + String(choice.choice), align: 'center', headerSort:false }
                    ]
                }
                columns.push(group)
            })
            self.opts.orgs.forEach(item => {
                let obj = {
                    OrgName: item.OrgName,
                    BranchName: item.BranchName,
                    TotCnt: item.TotCnt,
                    AvgPct: item.AvgPct,
                    AvgTot: item.AvgTot,
                }
                item.choices.forEach(choice => {

                    obj['Cnt-' + String(choice.choice)] = choice.Cnt,
                    obj['Pct-' + String(choice.choice)] = choice.Pct
                })
                data.push(obj)
            });

            if (grid) {
                let table = new Tabulator(grid, {
                    layout: 'fitDataFill',
                    columnVertAlign: 'middle',
                    data: data,
                    columns: columns
                });
            }

            self.update();
        }

        let grid;
        let initCtrls = () => {
            grid = self.refs['grid']
            updatecontent();
        }
        let freeCtrls = () => {
            grid = null;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

});
riot.tag2('edl-customer-branch-manage', '', '', '', function(opts) {
});
riot.tag2('edl-customer-editor', '<div class="entry"> <div class="tab"> <button ref="tabheader" class="tablinks active" name="default" onclick="{showContent}"> <span class="fas fa-cog"></span>&nbsp;{content.entry.tabDefault}&nbsp; </button> <button ref="tabheader" class="tablinks" name="miltilang" onclick="{showContent}"> <span class="fas fa-globe-americas"></span>&nbsp;{content.entry.tabMultiLang}&nbsp; </button> </div> <div ref="tabcontent" name="default" class="tabcontent" style="display: block;"> <edl-customer-entry ref="EN" langid=""></edl-customer-entry> </div> <div ref="tabcontent" name="miltilang" class="tabcontent"> <virtual if="{lang.languages}"> <virtual each="{item in lang.languages}"> <virtual if="{item.langId !== \'EN\'}"> <div class="panel-header" langid="{item.langId}"> &nbsp;&nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}"></span> &nbsp;{item.Description}&nbsp; </div> <div class="panel-body" langid="{item.langId}"> <edl-customer-entry ref="{item.langId}" langid="{item.langId}"></edl-customer-entry> </div> </virtual> </virtual> </virtual> </div> </div> <div class="tool"> <button onclick="{save}"><span class="fas fa-save"></span></button> <button onclick="{cancel}"><span class="fas fa-times"></span></button> </div>', 'edl-customer-editor,[data-is="edl-customer-editor"]{ margin: 0 auto; padding: 0; width: 100%; max-width: 800px; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr 30px; grid-template-areas: \'entry\' \'tool\'; overflow: hidden; background-color: white; } edl-customer-editor .entry,[data-is="edl-customer-editor"] .entry{ grid-area: entry; margin: 0 auto; padding: 0; width: 100%; height: 100%; overflow: auto; } edl-customer-editor .entry .tab,[data-is="edl-customer-editor"] .entry .tab{ overflow: hidden; border: 1px solid #ccc; } edl-customer-editor .entry .tab button,[data-is="edl-customer-editor"] .entry .tab button{ background-color: inherit; float: left; border: none; outline: none; cursor: pointer; padding: 14px 16px; transition: 0.3s; } edl-customer-editor .entry .tab button:hover,[data-is="edl-customer-editor"] .entry .tab button:hover{ background-color: #ddd; } edl-customer-editor .entry .tab button.active,[data-is="edl-customer-editor"] .entry .tab button.active{ background-color: #ccc; } edl-customer-editor .entry .tabcontent,[data-is="edl-customer-editor"] .entry .tabcontent{ display: none; padding: 3px; width: 100%; max-width: 100%; overflow: auto; } edl-customer-editor .entry .tabcontent .panel-header,[data-is="edl-customer-editor"] .entry .tabcontent .panel-header{ margin: 0 auto; padding: 0; padding-top: 3px; width: 100%; height: 30px; color: white; background: cornflowerblue; border-radius: 5px 5px 0 0; } edl-customer-editor .entry .tabcontent .panel-body,[data-is="edl-customer-editor"] .entry .tabcontent .panel-body{ margin: 0 auto; margin-bottom: 5px; padding: 0; width: 100%; border: 1px solid cornflowerblue; } edl-customer-editor .tool,[data-is="edl-customer-editor"] .tool{ grid-area: tool; margin: 0 auto; padding: 0; padding-left: 3px; padding-top: 3px; width: 100%; height: 30px; overflow: hidden; }', '', function(opts) {


        let self = this;
        let screenId = 'edl-customer-manage';

        let branchId = '';
        let ctrls = [];

        let defaultContent = {
            entry: {
                tabDefault: 'Default',
                tabMultiLang: 'Languages'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        let tabHeaders = [];
        let tabContents = [];

        let initCtrls = () => {
            let headers = self.refs['tabheader'];
            tabHeaders.push(...headers)
            let contents = self.refs['tabcontent'];
            tabContents.push(...contents)
        }
        let freeCtrls = () => {
            tabHeaders = [];
            tabContents = [];
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let clearActiveTabs = () => {
            if (tabHeaders) {

                for (let i = 0; i < tabHeaders.length; i++) {
                    tabHeaders[i].className = tabHeaders[i].className.replace(" active", "");
                }
            }
        }
        let hideContents = () => {
            if (tabContents) {

                for (let i = 0; i < tabContents.length; i++) {
                    tabContents[i].style.display = "none";
                }
            }
        }
        let getContent = (name) => {
            let ret;
            if (tabContents) {
                for (let i = 0; i < tabContents.length; i++) {
                    let attr = tabContents[i].attributes['name'];
                    let aName = attr.value;
                    let vName = name;
                    if (aName === vName) {
                        ret = tabContents[i];
                        break;
                    }
                }
            }
            return ret;
        }
        let getHeader = (name) => {
            let ret;
            if (tabHeaders) {
                for (let i = 0; i < tabHeaders.length; i++) {
                    let attr = tabHeaders[i].attributes['name'];
                    let aName = attr.value;
                    let vName = name;
                    if (aName === vName) {
                        ret = tabHeaders[i];
                        break;
                    }
                }
            }
            return ret;
        }
        this.showContent = (evt) => {
            let target = evt.target;
            let name = target.attributes['name'].value;

            hideContents();
            clearActiveTabs();

            let currHeader = getHeader(name);
            let currContent = getContent(name);
            if (currContent) {
                currContent.style.display = "block";
            }
            if (currHeader) {
                currHeader.className += " active";
            }
        }

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        this.save = (e) => {
            let item;
            let items = [];
            ctrls.forEach(oRef => {
                item = (oRef.entry) ? oRef.entry.getItem() : null;
                if (item) {
                    item.langId = oRef.langId;
                    items.push(item)
                }
            });
            customermanager.save(items);
            events.raise(events.name.EndEditCustomer)
        }
        this.cancel = (e) => {
            events.raise(events.name.EndEditCustomer)
        }

        this.setup = (item) => {
            let isNew = false;

            customerId = item.customerId;
            if (customerId === undefined || customerId === null || customerId.trim() === '') {
                isNew = true;
            }
            ctrls = [];

            let loader = window.customermanager;

            lang.languages.forEach(lg => {
                let ctrl = self.refs[lg.langId];
                let original = (isNew) ? clone(item) : loader.find(lg.langId, customerId);

                if (ctrl) {
                    let obj = {
                        langId: lg.langId,
                        entry: ctrl,
                        scrObj: original
                    }
                    ctrl.setup(original);
                    ctrls.push(obj)
                }
            });
        }

});

riot.tag2('edl-customer-entry', '<div class="padtop"></div> <div class="padtop"></div> <ninput ref="customerName" title="{content.entry.customerName}" type="text" name="customerName"></ninput>', 'edl-customer-entry,[data-is="edl-customer-entry"]{ margin: 0; padding: 0; width: 100%; height: 100%; } edl-customer-entry .padtop,[data-is="edl-customer-entry"] .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; }', '', function(opts) {
        let self = this;
        let screenId = 'edl-customer-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        let defaultContent = {
            entry: {
                customerName: 'Customer Name'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;
                self.update();
            }
        }

        let customerName;

        let initCtrls = () => {
            customerName = self.refs['customerName'];
        }
        let freeCtrls = () => {
            customerName = null;
        }
        let clearInputs = () => {
            customerName.clear();
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

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

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {

                if (customerName) editObj.CustomerName = customerName.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {

                if (customerName) customerName.value(editObj.CustomerName);
            }
        }

        this.setup = (item) => {
            origObj = clone(item);
            editObj = clone(item);

            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();

            let hasId = (editObj.customerId !== undefined && editObj.customerId != null)
            let isDirty = !hasId || !equals(origObj, editObj);

            return (isDirty) ? editObj : null;
        }

});

riot.tag2('edl-customer-manage', '<edl-customer-view ref="viewer" class="view"></edl-customer-view>', 'edl-customer-manage,[data-is="edl-customer-manage"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } edl-customer-manage .view,[data-is="edl-customer-manage"] .view{ margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px; width: 100%; height: 100%; overflow: hidden; }', '', function(opts) {
});


riot.tag2('edl-customer-view', '<div ref="container" class="scrarea"> <div ref="tool" class="toolarea"> <button class="float-button" onclick="{addnew}"> <span class="fas fa-plus">&nbsp;</span> </button> <button class="float-button" onclick="{refresh}"> <span class="fas fa-sync">&nbsp;</span> </button> </div> <div ref="grid" class="gridarea"></div> </div>', 'edl-customer-view,[data-is="edl-customer-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 20px 1fr 20px; grid-template-areas: \'.\' \'scrarea\' \'.\' } edl-customer-view>.scrarea,[data-is="edl-customer-view"]>.scrarea{ grid-area: scrarea; display: grid; grid-template-columns: 5px auto 1fr; grid-template-rows: 1fr; grid-template-areas: \'. toolarea gridarea\'; margin: 0 auto; padding: 0; margin-top: 3px; width: 100%; max-width: 800px; height: 100%; } edl-customer-view>.scrarea>.toolarea,[data-is="edl-customer-view"]>.scrarea>.toolarea{ grid-area: toolarea; margin: 0 auto; margin-right: 5px; padding: 0; height: 100%; overflow: hidden; background-color: transparent; color: whitesmoke; } edl-customer-view>.scrarea>.toolarea .float-button,[data-is="edl-customer-view"]>.scrarea>.toolarea .float-button{ display: block; margin: 0 auto; margin-bottom: 5px; padding: 3px; padding-right: 1px; height: 40px; width: 40px; color: whitesmoke; background: silver; border: none; outline: none; border-radius: 50%; cursor: pointer; } edl-customer-view>.scrarea>.toolarea .float-button:hover,[data-is="edl-customer-view"]>.scrarea>.toolarea .float-button:hover{ color: whitesmoke; background: forestgreen; } edl-customer-view>.scrarea>.gridarea,[data-is="edl-customer-view"]>.scrarea>.gridarea{ grid-area: gridarea; margin: 0 auto; padding: 0; height: 100%; width: 100%; } edl-customer-view .tabulator-row button,[data-is="edl-customer-view"] .tabulator-row button{ margin: 0 auto; padding: 0px; width: 100%; font-size: small; color: inherit; background: transparent; border: none; outline: none; cursor: pointer; } edl-customer-view .tabulator-row button:hover,[data-is="edl-customer-view"] .tabulator-row button:hover{ color: forestgreen; } edl-customer-view .tabulator-row button>span,[data-is="edl-customer-view"] .tabulator-row button>span{ margin: 0 auto; padding: 0; }', '', function(opts) {


        let self = this;
        let table;
        let screenId = 'edl-customer-manage';

        let defaultContent = {
            title: 'Customer Management',
            columns: []
        }
        this.content = defaultContent;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {

            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);

            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44,
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]

            if (self.content && self.content.columns) {
                let cols = self.content.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = customermanager.current;

            initGrid(data)
        }
        let updatecontent = () => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
                self.content = scrContent ? scrContent : defaultContent;

                self.update();
                if (table) table.redraw(true);
            }
        }

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            addEvt(events.name.CustomerListChanged, onCustomerListChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.CustomerListChanged, onCustomerListChanged)
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }
        let onScreenChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                customermanager.load();
            }
        }
        let onCustomerListChanged = (e) => {
            let scrId = screens.current.screenId;
            if (screenId === scrId) {
                updatecontent();
                syncData();
            }
        }

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();

            secure.changeCustomer(data.customerId)
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();

        }

        this.addnew = (e) => {

        }
        this.refresh = (e) => {
            customermanager.load();
            updatecontent();
        }

});
riot.tag2('edl-admin-home', '', '', '', function(opts) {
});

riot.tag2('edl-customer-home', '<h2>Customer Home.</h2>', '', '', function(opts) {
});
riot.tag2('edl-staff-home', '', '', '', function(opts) {
});

riot.tag2('edl-supervisor-home', '', '', '', function(opts) {
});
riot.tag2('rater-home', '<div class="content-area"> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div ref="userSignIn" class="user-signin"> <div class="group-header"> <h4><span class="fa fa-user-lock">&nbsp;</span>&nbsp;{content.title}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <ninput ref="userName" title="{content.label.userName}" type="text" name="userName"></ninput> <ninput ref="passWord" title="{content.label.passWord}" type="password" name="pwd"></ninput> <div class="padtop"></div> <button ref="submit"> <span class="fas fa-user">&nbsp;</span> {content.label.submit} </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div> <div ref="userSelection" class="user-selection hide"> <div class="group-header"> <h4>{content.label.selectAccount}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <div class="padtop"></div> <company-selection ref="userList" companyname="{content.label.companyName}" fullname="{content.label.fullName}"> </company-selection> <div class="padtop"></div> <button ref="cancel"> <span class="fa fa-user-times">&nbsp;</span> Cancel </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div> </div>', 'rater-home,[data-is="rater-home"]{ margin: 0 auto; padding: 2px; position: relative; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'content-area\'; overflow: hidden; } rater-home .content-area,[data-is="rater-home"] .content-area{ grid-area: content-area; margin: 0 auto; padding: 0px; position: relative; display: block; width: 100%; height: 100%; background-color: white; background-image: url(\'public/assets/images/backgrounds/bg-15.jpg\'); background-blend-mode: multiply, luminosity; background-position: center; background-repeat: no-repeat; background-size: cover; } rater-home .content-area .user-signin,[data-is="rater-home"] .content-area .user-signin,rater-home .content-area .user-selection,[data-is="rater-home"] .content-area .user-selection{ display: block; position: relative; margin: 0 auto; padding: 0; } rater-home .content-area .user-signin.hide,[data-is="rater-home"] .content-area .user-signin.hide,rater-home .content-area .user-selection.hide,[data-is="rater-home"] .content-area .user-selection.hide{ display: none; } rater-home .padtop,[data-is="rater-home"] .padtop,rater-home .content-area .padtop,[data-is="rater-home"] .content-area .padtop,rater-home .content-area .user-signin .group-header .padtop,[data-is="rater-home"] .content-area .user-signin .group-header .padtop,rater-home .content-area .user-signin .group-body .padtop,[data-is="rater-home"] .content-area .user-signin .group-body .padtop,rater-home .content-area .user-selection .group-header .padtop,[data-is="rater-home"] .content-area .user-selection .group-header .padtop,rater-home .content-area .user-selection .group-body .padtop,[data-is="rater-home"] .content-area .user-selection .group-body .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; } rater-home .content-area .user-signin .group-header,[data-is="rater-home"] .content-area .user-signin .group-header,rater-home .content-area .user-selection .group-header,[data-is="rater-home"] .content-area .user-selection .group-header{ display: block; margin: 0 auto; padding: 3px; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background-color: cornflowerblue; border: 1px solid dimgray; border-radius: 8px 8px 0 0; } rater-home .content-area .user-signin .group-header h4,[data-is="rater-home"] .content-area .user-signin .group-header h4,rater-home .content-area .user-selection .group-header h4,[data-is="rater-home"] .content-area .user-selection .group-header h4{ display: block; margin: 0 auto; padding: 0; padding-top: 5px; font-size: 1.1rem; text-align: center; color: whitesmoke; user-select: none; } rater-home .content-area .user-signin .group-body,[data-is="rater-home"] .content-area .user-signin .group-body,rater-home .content-area .user-selection .group-body,[data-is="rater-home"] .content-area .user-selection .group-body{ display: flex; flex-direction: column; align-items: center; margin: 0 auto; padding: 0; height: auto; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background-color: white; border: 1px solid dimgray; border-radius: 0 0 8px 8px; } rater-home .content-area .user-signin .group-body ninput,[data-is="rater-home"] .content-area .user-signin .group-body ninput,rater-home .content-area .user-selection .group-body ninput,[data-is="rater-home"] .content-area .user-selection .group-body ninput{ background-color: white; } rater-home .content-area .user-signin .group-body button,[data-is="rater-home"] .content-area .user-signin .group-body button,rater-home .content-area .user-selection .group-body button,[data-is="rater-home"] .content-area .user-selection .group-body button{ display: inline-block; margin: 5px auto; padding: 10px 15px; color: forestgreen; font-weight: bold; cursor: pointer; width: 45%; text-decoration: none; vertical-align: middle; }', '', function(opts) {


        let self = this;
        let defaultContent = {
            title: 'Sign In',
            label: {
                selectAccount: 'Please Select Account',
                userName: 'User Name (admin)',
                passWord: 'Password',
                submit: 'Sign In',
                companyName: 'Company Name',
                fullName: 'Account Name'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        let userSignIn, userSelection;
        let userName, passWord, submit, cancel;

        let initCtrls = () => {
            userSignIn = self.refs['userSignIn'];
            userSelection = self.refs['userSelection'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            submit = self.refs['submit'];
            cancel = self.refs['cancel'];
        }
        let freeCtrls = () => {
            userName = null;
            passWord = null;
            submit = null;
            cancel = null;
            userSignIn = null;
            userSelection = null;
        }
        let clearInputs = () => {
            if (userName && passWord) {
                userName.clear();
                passWord.clear();
            }
            secure.reset();
        }
        let checkUserName = () => {
            let ret = false;
            let val = userName.value();
            ret = (val && val.length > 0);
            if (!ret) userName.focus()
            return ret;
        }
        let checkPassword = () => {
            let ret = false;
            let val = passWord.value();
            ret = (val && val.length > 0);
            if (!ret) passWord.focus()
            return ret;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)

            addEvt(events.name.UserListChanged, onUserListChanged);
            addEvt(events.name.UserSignInFailed, onSignInFailed);

            submit.addEventListener('click', onSubmit);
            cancel.addEventListener('click', onCancel);
        }
        let unbindEvents = () => {
            cancel.removeEventListener('click', onCancel);
            submit.removeEventListener('click', onSubmit);

            delEvt(events.name.UserListChanged, onUserListChanged);
            delEvt(events.name.UserSignInFailed, onSignInFailed);

            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let onUserListChanged = (e) => { showUserSelection(); }
        let onSignInFailed = (e) => {
            let err = e.detail.error;

            osd.info(err)
        }
        let onSubmit = (e) => {
            if (checkUserName() && checkPassword()) {

                let data = {
                    userName: userName.value(),
                    passWord: passWord.value()
                }
                secure.verifyUsers(data.userName, data.passWord);
            }
        }
        let onCancel = (e) => { showUserSignIn(); }

        let showUserSignIn = () => {
            if (userSignIn && userSelection) {
                userSignIn.classList.remove('hide');
                userSelection.classList.add('hide');
                userName.focus();
            }
        }
        let showUserSelection = () => {
            if (userSignIn && userSelection) {
                console.log(secure.users)
                if (secure.users.length > 1) {

                    userSignIn.classList.add('hide');
                    userSelection.classList.remove('hide');
                }
                else if (secure.users.length === 1) {

                    let customerId = secure.users[0].customerId;
                    secure.signin(customerId);
                }
                else {

                    osd.info({ msg: 'No user found!!!.'})
                }
            }
        }

});
riot.tag2('company-selection', '<virtual each="{user in users}"> <div class="account"> <div class="info1"> <span class="label">{opts.companyname}</span> <span class="data">{user.CustomerName}</span> </div> <div class="info2"> <span class="label">{opts.fullname}</span> <span class="data">{user.FullName}</span> </div> <button onclick="{onSignIn}">&nbsp;<span class="fas fa-2x fa-sign-in-alt">&nbsp;</span></button> </div> <hr> </virtual>', 'company-selection,[data-is="company-selection"]{ display: block; margin: 0 auto; padding: 0; } company-selection .account,[data-is="company-selection"] .account{ margin: 0 auto; padding: 2px; height: 100%; width: 100%; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; grid-template-areas: \'info1 button\' \'info2 button\'; overflow: hidden; overflow-y: auto; } company-selection .account div,[data-is="company-selection"] .account div{ display: block; margin: 0 auto; padding: 0; } company-selection .account div.info1,[data-is="company-selection"] .account div.info1{ grid-area: info1; display: block; margin: 0; padding: 0; padding-left: 20px; } company-selection .account div.info2,[data-is="company-selection"] .account div.info2{ grid-area: info2; display: block; margin: 0; padding: 0; padding-left: 20px; } company-selection .account div.info1 span,[data-is="company-selection"] .account div.info1 span,company-selection .account div.info2 span,[data-is="company-selection"] .account div.info2 span{ display: inline-block; margin: 0; padding: 0; } company-selection .account div.info1 span.label,[data-is="company-selection"] .account div.info1 span.label,company-selection .account div.info2 span.label,[data-is="company-selection"] .account div.info2 span.label{ display: inline-block; margin: 0 auto; padding: 0; font-weight: bold; color: navy; width: 100%; } company-selection .account div.info1 span.data,[data-is="company-selection"] .account div.info1 span.data,company-selection .account div.info2 span.data,[data-is="company-selection"] .account div.info2 span.data{ display: inline-block; margin: 0 auto; padding: 0; font-weight: bold; color: forestgreen; width: 100%; } company-selection .account button,[data-is="company-selection"] .account button{ grid-area: button; display: inline-block; margin: 0 auto; padding: 0; font-weight: bold; color: forestgreen; width: 100%; }', '', function(opts) {


        let self = this;

        this.users = [];

        let updatecontent = () => {
            if (secure) {

                self.users = (secure.content) ? secure.users : [];
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.UserListChanged, onUserListChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.UserListChanged, onUserListChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onUserListChanged = (e) => { updatecontent(); }

        this.onSignIn = (e) => {
            let acc = e.item.user;
            secure.signin(acc.customerId);
        }

});
riot.tag2('register-entry', '', 'register-entry,[data-is="register-entry"]{ margin: 0; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;

        let initCtrls = () => {}
        let freeCtrls = () => {}

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

});
riot.tag2('signin-entry', '<div class="content-area"> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div ref="userSignIn" class="user-signin"> <div class="group-header"> <h4><span class="fa fa-user-lock">&nbsp;</span>&nbsp;{content.title}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <ninput ref="userName" title="{content.label.userName}" type="text" name="userName"></ninput> <ninput ref="passWord" title="{content.label.passWord}" type="password" name="pwd"></ninput> <div class="padtop"></div> <button ref="submit"> <span class="fas fa-user">&nbsp;</span> {content.label.submit} </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div> <div ref="userSelection" class="user-selection hide"> <div class="group-header"> <h4>{content.label.selectAccount}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <div class="padtop"></div> <user-selection ref="userList" customername="{content.label.customerName}"></user-selection> <div class="padtop"></div> <button ref="cancel"> <span class="fa fa-user-times">&nbsp;</span> Cancel </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div> </div>', 'signin-entry,[data-is="signin-entry"]{ margin: 0 auto; padding: 2px; position: relative; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'content-area\'; overflow: hidden; } signin-entry .content-area,[data-is="signin-entry"] .content-area{ grid-area: content-area; margin: 0 auto; padding: 0px; position: relative; display: block; width: 100%; height: 100%; background-color: white; background-image: url(\'public/assets/images/backgrounds/bg-15.jpg\'); background-blend-mode: multiply, luminosity; background-position: center; background-repeat: no-repeat; background-size: cover; } signin-entry .content-area .user-signin,[data-is="signin-entry"] .content-area .user-signin,signin-entry .content-area .user-selection,[data-is="signin-entry"] .content-area .user-selection{ display: block; position: relative; margin: 0 auto; padding: 0; } signin-entry .content-area .user-signin.hide,[data-is="signin-entry"] .content-area .user-signin.hide,signin-entry .content-area .user-selection.hide,[data-is="signin-entry"] .content-area .user-selection.hide{ display: none; } signin-entry .padtop,[data-is="signin-entry"] .padtop,signin-entry .content-area .padtop,[data-is="signin-entry"] .content-area .padtop,signin-entry .content-area .user-signin .group-header .padtop,[data-is="signin-entry"] .content-area .user-signin .group-header .padtop,signin-entry .content-area .user-signin .group-body .padtop,[data-is="signin-entry"] .content-area .user-signin .group-body .padtop,signin-entry .content-area .user-selection .group-header .padtop,[data-is="signin-entry"] .content-area .user-selection .group-header .padtop,signin-entry .content-area .user-selection .group-body .padtop,[data-is="signin-entry"] .content-area .user-selection .group-body .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; } signin-entry .content-area .user-signin .group-header,[data-is="signin-entry"] .content-area .user-signin .group-header,signin-entry .content-area .user-selection .group-header,[data-is="signin-entry"] .content-area .user-selection .group-header{ display: block; margin: 0 auto; padding: 3px; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background-color: cornflowerblue; border: 1px solid dimgray; border-radius: 8px 8px 0 0; } signin-entry .content-area .user-signin .group-header h4,[data-is="signin-entry"] .content-area .user-signin .group-header h4,signin-entry .content-area .user-selection .group-header h4,[data-is="signin-entry"] .content-area .user-selection .group-header h4{ display: block; margin: 0 auto; padding: 0; padding-top: 5px; font-size: 1.1rem; text-align: center; color: whitesmoke; user-select: none; } signin-entry .content-area .user-signin .group-body,[data-is="signin-entry"] .content-area .user-signin .group-body,signin-entry .content-area .user-selection .group-body,[data-is="signin-entry"] .content-area .user-selection .group-body{ display: flex; flex-direction: column; align-items: center; margin: 0 auto; padding: 0; height: auto; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background-color: white; border: 1px solid dimgray; border-radius: 0 0 8px 8px; } signin-entry .content-area .user-signin .group-body ninput,[data-is="signin-entry"] .content-area .user-signin .group-body ninput,signin-entry .content-area .user-selection .group-body ninput,[data-is="signin-entry"] .content-area .user-selection .group-body ninput{ background-color: white; } signin-entry .content-area .user-signin .group-body button,[data-is="signin-entry"] .content-area .user-signin .group-body button,signin-entry .content-area .user-selection .group-body button,[data-is="signin-entry"] .content-area .user-selection .group-body button{ display: inline-block; margin: 5px auto; padding: 10px 15px; color: forestgreen; font-weight: bold; cursor: pointer; width: 45%; text-decoration: none; vertical-align: middle; }', '', function(opts) {


        let self = this;
        let defaultContent = {
            title: 'Sign In',
            label: {
                selectAccount: 'Please Select Account',
                userName: 'User Name (admin)',
                passWord: 'Password',
                submit: 'Sign In',
                customerName: 'Customer Name'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {

            self.update();
        }

        let userSignIn, userSelection;
        let userName, passWord, submit, cancel;

        let initCtrls = () => {

            userSignIn = self.refs['userSignIn'];
            userSelection = self.refs['userSelection'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            submit = self.refs['submit'];
            cancel = self.refs['cancel'];
        }
        let freeCtrls = () => {
            userName = null;
            passWord = null;
            submit = null;
            cancel = null;
            userSignIn = null;
            userSelection = null;
        }
        let clearInputs = () => {
            if (userName && passWord) {
                userName.clear();
                passWord.clear();
            }
            secure.reset();
        }
        let checkUserName = () => {
            let ret = false;
            let val = userName.value();
            ret = (val && val.length > 0);
            if (!ret) userName.focus()
            return ret;
        }
        let checkPassword = () => {
            let ret = false;
            let val = passWord.value();
            ret = (val && val.length > 0);
            if (!ret) passWord.focus()
            return ret;
        }

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        let bindEvents = () => {
            addEvt(events.name.LanguageChanged, onLanguageChanged)
            addEvt(events.name.ContentChanged, onContentChanged)
            addEvt(events.name.ScreenChanged, onScreenChanged)
            submit.addEventListener('click', onSubmit);
            if (cancel) cancel.addEventListener('click', onCancel);
        }
        let unbindEvents = () => {
            if (cancel) cancel.removeEventListener('click', onCancel);
            submit.removeEventListener('click', onSubmit);
            delEvt(events.name.ScreenChanged, onScreenChanged)
            delEvt(events.name.ContentChanged, onContentChanged)
            delEvt(events.name.LanguageChanged, onLanguageChanged)
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let onUserListChanged = (e) => { showUserSelection(); }
        let onSignInFailed = (e) => {

        }
        let onSubmit = (e) => {

        }
        let onCancel = (e) => {

        }

        let showUserSignIn = () => {

        }
        let showUserSelection = () => {

        }

});