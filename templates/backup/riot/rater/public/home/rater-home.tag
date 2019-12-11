<rater-home>
    <div class="content-area">
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div ref="userSignIn" class="user-signin">
            <div class="group-header">
                <h4><span class="fa fa-user-lock">&nbsp;</span>&nbsp;{ content.title }</h4>
                <div class="padtop"></div>
            </div>
            <div class="group-body">
                <div class="padtop"></div>
                <ninput ref="userName" title="{ content.label.userName }" type="text" name="userName"></ninput>
                <ninput ref="passWord" title="{ content.label.passWord }" type="password" name="pwd"></ninput>
                <div class="padtop"></div>
                <button ref="submit">
                    <span class="fas fa-user">&nbsp;</span>
                    { content.label.submit }
                </button>
                <div class="padtop"></div>
                <div class="padtop"></div>
            </div>
        </div>
        <div ref="userSelection" class="user-selection hide">
            <div class="group-header">
                <h4>{ content.label.selectAccount }</h4>
                <div class="padtop"></div>
            </div>
            <div class="group-body">
                <div class="padtop"></div>
                <div class="padtop"></div>
                <company-selection ref="userList" companyName="{ content.label.companyName }" fullName="{ content.label.fullName }">                    
                </company-selection>
                <div class="padtop"></div>
                <button ref="cancel">
                    <span class="fa fa-user-times">&nbsp;</span>
                    Cancel
                </button>
                <div class="padtop"></div>
                <div class="padtop"></div>
            </div>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 2px;
            position: relative;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'content-area';
            overflow: hidden;
            /* background-color: whitesmoke; */
        }
        :scope .content-area {
            grid-area: content-area;
            margin: 0 auto;
            padding: 0px;
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            background-color: white;
            /*
            background-image: linear-gradient(0deg, silver, silver), url('public/assets/images/backgrounds/bg-08.jpg');
            */
            background-image: url('public/assets/images/backgrounds/bg-15.jpg');
            background-blend-mode: multiply, luminosity;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        :scope .content-area .user-signin,
        :scope .content-area .user-selection {
            display: block;
            position: relative;
            margin: 0 auto;
            padding: 0;
        }
        :scope .content-area .user-signin.hide,
        :scope .content-area .user-selection.hide {
            display: none;
        }
        :scope .padtop, 
        :scope .content-area .padtop,
        :scope .content-area .user-signin .group-header .padtop,
        :scope .content-area .user-signin .group-body .padtop, 
        :scope .content-area .user-selection .group-header .padtop,
        :scope .content-area .user-selection .group-body .padtop {
            display: block;
            margin: 0 auto;
            width: 100%;
            min-height: 10px;
        }
        :scope .content-area .user-signin .group-header,
        :scope .content-area .user-selection .group-header {
            display: block;
            margin: 0 auto;
            padding: 3px;
            width: 30%;
            min-width: 300px;
            max-width: 500px;
            opacity: 0.8;
            background-color: cornflowerblue;            
            border: 1px solid dimgray;
            border-radius: 8px 8px 0 0;
        }
        :scope .content-area .user-signin .group-header h4,
        :scope .content-area .user-selection .group-header h4 {
            display: block;
            margin: 0 auto;
            padding: 0;
            padding-top: 5px;
            font-size: 1.1rem;
            text-align: center;
            color: whitesmoke;
            user-select: none;
        }
        :scope .content-area .user-signin .group-body,
        :scope .content-area .user-selection .group-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            padding: 0;
            height: auto;
            width: 30%;
            min-width: 300px;
            max-width: 500px;
            opacity: 0.8;
            background-color: white;

            border: 1px solid dimgray;
            border-radius: 0 0 8px 8px;
        }
        :scope .content-area .user-signin .group-body ninput,
        :scope .content-area .user-selection .group-body ninput {
            background-color: white;
        }

        :scope .content-area .user-signin .group-body button,
        :scope .content-area .user-selection .group-body button {
            display: inline-block;
            margin: 5px auto;
            padding: 10px 15px;
            color: forestgreen;
            font-weight: bold;
            cursor: pointer;
            width: 45%;
            text-decoration: none;
            vertical-align: middle;
        }
    </style>
    <script>
        //#region Internal Variables

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

        //#endregion

        //#region content variables and methods

        let updatecontent = () => {
            let scrId = screens.current.screenId;
            let scrContent = (contents.current && contents.current.screens) ? contents.current.screens[scrId] : null;
            self.content = scrContent ? scrContent : defaultContent;
            self.update();
        }

        //#endregion

        //#region controls variables and methods

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

        let onUserListChanged = (e) => { showUserSelection(); }
        let onSignInFailed = (e) => {
            let err = e.detail.error;
            //showMsg(err);
            osd.info(err)
        }
        let onSubmit = (e) => {
            if (checkUserName() && checkPassword()) {
                //e.preventDefault();
                //e.stopPropagation();
                let data = {
                    userName: userName.value(),
                    passWord: passWord.value()
                }
                secure.verifyUsers(data.userName, data.passWord);
            }
        }
        let onCancel = (e) => { showUserSignIn(); }

        //#endregion

        //#region private methods

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
                    //console.log('More than on user accounts found.')
                    userSignIn.classList.add('hide');
                    userSelection.classList.remove('hide');
                }
                else if (secure.users.length === 1) {
                    //console.log('Single user account found.')
                    let customerId = secure.users[0].customerId;
                    secure.signin(customerId);
                }
                else {
                    //showMsg({ msg: 'No user found!!!.'})
                    osd.info({ msg: 'No user found!!!.'})
                }
            }
        }

        //#endregion
    </script>
</rater-home>