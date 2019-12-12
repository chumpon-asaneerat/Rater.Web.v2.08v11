<nselect>
    <select ref="input">
        <option each={ item in items } value="{ item.value }">{ item.text }</option>
    </select>
    <div ref="clear" class="clear">x</div>
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
        :scope select {
            display: inline-block;
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
            /* box-shadow: 0 0 0px 10000px transparent inset; */
            border-bottom: 2px solid #999;

            -webkit-appearance: none;
             -moz-appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 100%;
            background-position-y: 20px;
            border-radius: 2px;
        }
        :scope .clear {
            display: inline-block;
            margin: 0;
            padding: 0px 6px;
            font-size: 12px;
            font-weight: bold;
            width: 21px;
            height: 21px;
            color: white;
            cursor: pointer;
            user-select: none;
            border: 1px solid red;
            border-radius: 50%;
            background: rgba(255, 100, 100, .75);
        }
        :scope .clear:hover {
            color: yellow;
            background: rgba(255, 0, 0, .8);
        }
        /* Change Autocomplete styles in Chrome*/
        :scope select:-webkit-autofill,
        :scope select:-webkit-autofill:hover, 
        :scope select:-webkit-autofill:focus {
            font-size: 14px;
            transition: background-color 5000s ease-in-out 0s;
        }
        :scope label {
            position: absolute;
            top: 30px;
            left: 14px;
            color: #555;
            transition: .2s;
            pointer-events: none;
        }
        :scope select:focus ~ label {
            top: 5px;
            left: 10px;
            color: #f7497d;
            font-weight: bold;
        }
        :scope select:-webkit-autofill ~ label,
        :scope select:valid ~ label {
            top: 5px;
            left: 10px;
            color: cornflowerblue;
            font-weight: bold;
        }
        :scope select:focus {
            border-bottom: 2px solid #f7497d;
        }
        :scope select:valid {
            border-bottom: 2px solid cornflowerblue;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let fldmap = { valueField:'code', textField:'name' }
        let defaultItem = { 
            value: '', 
            text: '-', 
            source: null 
        };
        this.items = [];
        this.items.push(defaultItem);

        //#endregion

        //#region controls variables and methods

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

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            input.addEventListener('change', onSelection);
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
            input.removeEventListener('change', onSelection);
        }

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

        //#region dom event handlers

        let onChangeCallback;
        let onClear = () => {
            clearInputs();
        }
        let onSelection = (e) => {
            if (input) {
                let idx = input.selectedIndex
                let val = input.options[input.selectedIndex].value;
                //console.log('selected value:', val)
                if (onChangeCallback) onChangeCallback();
            }
        }

        //#endregion

        //#region public methods

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
                    //console.log('found idx:', i)
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

        //#endregion
    </script>
</nselect>
