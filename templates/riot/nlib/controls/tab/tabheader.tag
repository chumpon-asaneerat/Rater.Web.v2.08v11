<tabheader>
    <yield />
    <style>
        :scope {
            float: left;
            /*
            display: flex;
            flex-direction: column;
            */
            margin: 0 auto;
            padding: 4px 16px;
            margin-top: 2px;

            vertical-align: baseline;

            border: 0px solid silver;
            border-bottom: 0px;
            border-radius: 6px 6px 0 0;

            color: navy;
            background: silver;

            cursor: pointer;

            transition: 0.3s;

            user-select: none;
            white-space: nowrap;
            overflow: hidden;
        }
        :scope:hover {
            color: whitesmoke;
            background: forestgreen;
            border-color: green;
        }
        :scope.active {
            color: whitesmoke;
            background: cornflowerblue;      
            border-color: royalblue;
        }
    </style>
    <script>
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
    </script>
</tabheader>