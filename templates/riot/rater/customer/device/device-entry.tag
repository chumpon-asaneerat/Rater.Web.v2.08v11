<device-entry>
    <div class="padtop"></div>
    <div class="padtop"></div>
    <ninput ref="deviceName" title="{ content.entry.deviceName }" type="text" name="deviceName"></ninput>
    <ninput ref="location" title="{ content.entry.location }" type="text" name="location"></ninput>
    <virtual if={ isDefault() }>
        <nselect ref="deviceTypes" title="{ content.entry.deviceTypeId }"></nselect>
    </virtual>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
    
        :scope .padtop {
            display: block;
            margin: 0 auto;
            width: 100%;
            min-height: 10px;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'device-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        //#region content variables and methods
        
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

        //#endregion

        //#region controls variables and methods

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
            // required to check null in case some input(s) not used in
            // multilanguages tab
            if (deviceTypes) deviceTypes.clear();
            deviceName.clear();
        }

        //#endregion

        //#region document listener add/remove handler

        let addEvt = (evtName, handle) => { document.addEventListener(evtName, handle) }
        let delEvt = (evtName, handle) => { document.removeEventListener(evtName, handle) }

        //#endregion

        //#region events bind/unbind

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

        let onDeviceTypeListChanged = (e) => { updatecontent(); }
        let onOrgListChanged = (e) => {
        }

        //#endregion

        //#region public methods

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
                //console.log('ctrlToObj:', editObj)
                if (deviceName) editObj.DeviceName = deviceName.value();
                if (location) editObj.Location = location.value();
                if (deviceTypes) editObj.deviceTypeId = deviceTypes.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {
                //console.log('objToCtrl:', editObj)
                if (deviceName) deviceName.value(editObj.DeviceName);
                if (location) location.value(editObj.Location);
                if (deviceTypes && editObj.deviceTypeId) {
                    deviceTypes.value(editObj.deviceTypeId.toString());
                }
            }
        }

        this.setup = (item) => {
            clearInputs();

            // load lookup.
            if (deviceTypes) {
                deviceTypes.setup(master.devicetypes.current, { valueField:'deviceTypeId', textField:'Type' });
            }

            origObj = clone(item);
            editObj = clone(item);
            //console.log('device entry setup:', editObj)
            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();
            //console.log('getItem:', editObj)
            let hasId = (editObj.deviceId !== undefined && editObj.deviceId != null)
            let isDirty = !hasId || !equals(origObj, editObj);
            //console.log(editObj)
            return (isDirty) ? editObj : null;
        }

        //#endregion
    </script>
</device-entry>