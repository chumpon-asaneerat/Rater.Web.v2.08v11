<member-entry>
    <div class="padtop"></div>
    <div class="padtop"></div>
    <ninput ref="prefix" title="{ content.entry.prefix }" type="text" name="prefix"></ninput>
    <ninput ref="firstName" title="{ content.entry.firstName }" type="text" name="firstName"></ninput>
    <ninput ref="lastName" title="{ content.entry.lastName }" type="text" name="lastName"></ninput>
    <virtual if={ isDefault() }>
        <ninput ref="userName" title="{ content.entry.userName }" type="text" name="userName"></ninput>
        <ninput ref="passWord" title="{ content.entry.passWord }" type="password" name="passWord"></ninput>
        <!--
        <ninput ref="memberType" title="{ content.entry.memberType }" type="text" name="memberType"></ninput>
        -->
        <nselect ref="memberTypes" title="{ content.entry.memberType }"></nselect>
        <!--
        <ninput ref="tagId" title="{ content.label.member.entry.tagId }" type="text" name="tagId"></ninput>
        <ninput ref="idCard" title="{ content.label.member.entry.idCard }" type="text" name="idCard"></ninput>
        <ninput ref="employeeCode" title="{ content.label.member.entry.employeeCode }" type="text" name="employeeCode"></ninput>
        -->
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
        let screenId = 'member-manage';
        this.isDefault = () => { return (opts.langid === '' || opts.langid === 'EN') }

        //#region content variables and methods
        
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

        //#endregion

        //#region controls variables and methods

        let prefix, firstName, lastName, userName, passWord;
        //let memberType;
        let memberTypes;
        //let tagId, idCard, employeeCode;

        let initCtrls = () => {
            prefix = self.refs['prefix'];
            firstName = self.refs['firstName'];
            lastName = self.refs['lastName'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            //memberType = self.refs['memberType'];
            memberTypes = self.refs['memberTypes'];
            /*
            tagId = self.refs['tagId'];
            idCard = self.refs['idCard'];
            employeeCode = self.refs['employeeCode'];
            */
        }
        let freeCtrls = () => {
            prefix = null;
            firstName = null;
            lastName = null;
            userName = null;
            passWord = null;
            memberTypes = null;
            //memberType = null;
            /*
            tagId = null;
            idCard = null;
            employeeCode = null;
            */
        }
        let clearInputs = () => {
            prefix.clear()
            firstName.clear()
            lastName.clear()
            userName.clear()
            passWord.clear()
            // required to check null in case some input(s) not used in
            // multilanguages tab
            if (memberTypes) memberTypes.clear();
            /*
            tagId.clear()
            idCard.clear()
            employeeCode.clear()
            */
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
            addEvt(events.name.MemberTypeListChanged, onMemberTypeListChanged)
        }
        let unbindEvents = () => {
            delEvt(events.name.MemberTypeListChanged, onMemberTypeListChanged)
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

        let onMemberTypeListChanged = (e) => { updatecontent(); }

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
                if (prefix) editObj.Prefix = prefix.value();
                if (firstName) editObj.FirstName = firstName.value();
                if (lastName) editObj.LastName = lastName.value();
                if (userName) editObj.UserName = userName.value();
                if (passWord) editObj.Password = passWord.value();

                //if (memberType) editObj.MemberType = memberType.value();
                if (memberTypes) editObj.MemberType = memberTypes.value();
                
                /*
                if (tagId) editObj.TagId = tagId.value();
                if (idCard) editObj.IDCard = idCard.value();
                if (employeeCode) editObj.EmployeeCode = employeeCode.value();
                */
            }
        }
        let objToCtrl = () => {
            if (editObj) {
                //console.log('objToCtrl:', editObj)
                if (prefix) prefix.value(editObj.Prefix);
                if (firstName) firstName.value(editObj.FirstName);
                if (lastName) lastName.value(editObj.LastName);
                if (userName) userName.value(editObj.UserName);
                if (passWord) passWord.value(editObj.Password);

                //if (memberType) memberType.value(editObj.MemberType);
                if (memberTypes && editObj.MemberType) {
                    memberTypes.value(editObj.MemberType.toString());
                }

                /*
                if (tagId) tagId.value(editObj.TagId);
                if (idCard) idCard.value(editObj.IDCard);
                if (employeeCode) employeeCode.value(editObj.EmployeeCode);
                */
            }
        }

        this.setup = (item) => {
            clearInputs();
            
            // load lookup.
            if (memberTypes) {
                memberTypes.setup(master.membertypes.current, { valueField:'memberTypeId', textField:'Description' });
            }

            origObj = clone(item);
            editObj = clone(item);
            //console.log('member entry setup:', editObj)
            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();
            //console.log('getItem:', editObj)
            let hasId = (editObj.memberId !== undefined && editObj.memberId != null)
            let isDirty = !hasId || !equals(origObj, editObj);
            //console.log(editObj)
            return (isDirty) ? editObj : null;
        }

        //#endregion
    </script>
</member-entry>