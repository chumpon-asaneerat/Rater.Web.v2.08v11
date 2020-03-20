<rating-register>
    <div ref="container" class="scrarea">
        <div class="title">{ (content) ? content.title : 'Device Registration' }</div>
        <div class="current-device">{ content.entry.currentDevice }: { (register) ? '( ' + register.deviceName + ' )' : '-' }</div>
        <nselect ref="deviceNames" title="{ content.entry.deviceName }"></nselect>
        <br/>
        <div class="toolbars">
            <button class="float-button" onclick="{ gohome }">
                <span class="fas fa-home">&nbsp;</span>
            </button>
            <button class="float-button" onclick="{ save }">
                <span class="fas fa-save">&nbsp;</span>
            </button>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 20px 1fr 20px;
            grid-template-areas:
                '.'
                'scrarea'
                '.'
        }
        :scope>.scrarea {
            grid-area: scrarea;
            margin: 0 auto;
            padding: 0;
            height: 100%;
            width: 100%;
            max-width: 800px;
        }
        :scope>.scrarea>.title {
            display: block;
            margin: 0 auto;
            color: cornflowerblue;
            text-align: center;
            font-size: 1.5em;
            width: 100%;
            height: auto;
        }
        :scope>.scrarea>.current-device {
            display: block;
            margin: 0 auto;
            color: red;
            text-align: center;
            font-size: 0.8em;
            width: 100%;
            height: auto;
        }
        :scope>.scrarea>.toolbars {
            display: block;
            margin: 0 auto;
            margin-right: 5px;
            width: 100%;
            height: auto;
            text-align: center;
            overflow: hidden;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope>.scrarea>.toolbars .float-button {
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            border: none;
            outline: none;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            color: whitesmoke;
            background: silver;
            cursor: pointer;
        }
        :scope>.scrarea>.toolbars .float-button:hover {
            color: whitesmoke;
            background: forestgreen;
        }
    </style>
    <script>
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
                    //console.log(ret);
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
                    //console.log(ret);
                    deviceML = ret.data;
                    updatecontent();
                },
                failure: (errMsg) => {
                    console.log(errMsg);
                }
            })
        }
        let updateDeviceList = () => {
            // update org names by language id.
            if (deviceNames) {
                // get exists value
                let val = deviceNames.value()
                deviceId = (val) ? val : self.register.deviceId;
                if (deviceML && deviceML[lang.langId]) {
                    devices = deviceML[lang.langId]
                    // load lookup.
                    deviceNames.setup(devices, { valueField:'deviceId', textField:'DeviceName' });
                    if (deviceId) {
                        deviceNames.value(deviceId);
                    }
                    // update register device
                    getRegisterDeviceId(updateRegisterDevice)
                }
            }
        }
        let updateRegisterDevice = () => {
            // update register device name.
            if (devices) {
                let dm = devices.map((dv) => dv.deviceId);
                if (self.register.deviceId) {
                    let idx = dm.indexOf(self.register.deviceId);
                    self.register.deviceName = (idx !== -1) ? devices[idx].DeviceName : '-';
                    // sync selection.
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

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

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

        //#region dom event handlers

        let onContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        //#endregion
    
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
                    //console.log(ret);
                    console.log('save success')
                    //self.gohome()
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
    </script>
</rating-register>
