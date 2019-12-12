<tag>
    <h1 class="header1">In app header 1</h1>
    <h1 class="header1">In app header 2</h1>
    <div class="subitem">
        <yield/>
    </div>    
    <style>
        /* 
        all css classeds that need has local scope
        need to used :scope>.className for specificed class that used locally
        and required to add div with yield inside to make the outside element
        has selector not match internal css class.
        */
        :scope {
            margin: 0;
            padding: 0;
        }
        /* Selects all elements that has class 'header1' where the parent is a '':scope' element */
        :scope>.header1 {
            margin: 0;
            padding: 0;
            color: red;
        }
        :scope>.subitem {
            margin: 0;
            padding: 0;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'screenid';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;
        
        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('app:screen:changed', onScreenChanged);
            document.removeEventListener('language:changed', onLanguageChanged);
            document.removeEventListener('app:content:changed', onAppContentChanged);
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

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {
                // screen shown.
            }
            else {
                // other screen shown.
            }
        }

        //#endregion

        //#region private service wrapper methods

        let showMsg = (err) => { }

        //#endregion

        //#region public methods

        this.publicMethod = (message) => { }

        //#endregion
    </script>
</tag>