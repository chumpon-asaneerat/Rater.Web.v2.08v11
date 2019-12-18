<tabheaders>
    <yield/>
    <style>
        :scope {
            position: relative;
            /* display: block; */
            display: flex;
            align-items: baseline;
            justify-content: space-between;

            margin: 0;
            padding: 0;
            width: 100%;
            height: auto;
            border: none;
            background-color: transparent;
            overflow: hidden;
        }
        :scope>:not(tabheader) { display: none; }        
    </style>
    <script>
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
            // Get all headers and remove the class "active"
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
    </script>
</tabheaders>