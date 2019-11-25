<ninput>
    <div class="input-box">
        <span ref="input" class="input-text" contenteditable="true"></span>
        <span ref="clear" class="input-clear" onclick="{ onclear }">x</span>
    </div>
    <style>
        :scope {
            display: inline-block;
            margin: 0;
            padding: 1px 3px;
            border: 1px solid silver;
            cursor: text;
            white-space: nowrap;
            width: 180px;
            height: auto;
        }
        :scope .input-box {
            display: grid;
            width: 100%;
            grid-template-columns: 1fr 20px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'input-text input-clear';
        }
        :scope .input-box span.input-text {
            grid-area: input-text;
            display: inline-block;
            width: calc(100% - 5px);
            outline: none;
            /* make it not wrap whitespace. */
            white-space: pre;
            /* make some space for display cursor when empty string. */
            min-width: 1px;
            border: 1px solid dimgray;
            overflow: hidden;
        }
        :scope .input-box span.input-clear {
            grid-area: input-clear;
            display: flex;
            align-content: center;
            justify-content: center;
            margin: 0 auto;
            margin-top: 2px;
            padding: 0px 5px;
            font-size: 11px;
            font-weight: bold;
            width: 20px;
            height: 20px;
            color: white;
            cursor: pointer;
            user-select: none;
            border: 1px solid red;
            border-radius: 50%;
            background: rgba(255, 100, 100, .75);
        }
    </style>
    <script>
        //#region Internal Variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let input, clear;
        let initCtrls = () => {
            input = self.refs['input']
            clear = self.refs['clear']
        }
        let freeCtrls = () => {
            clear = null;
            input = null;
        }
        let clearInput = () => {
            if (input) input.textContent = '';
        }

        //#endregion

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
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

        let onClear = (e) => {
            e.preventDefault();
            e.stopPropagation();
            clearInput()
        }

    </script>
</ninput>