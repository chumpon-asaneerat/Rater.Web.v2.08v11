<tabcontrol>
    <style>
        :scope {
            position: relative;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            grid-template-areas: 
                'tab-headers'
                'tab-pages';
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: transparent;
        }
        :scope tabheaders:first-child {
            grid-area: tab-headers;
            display: block;
        }
        :scope :not(tabheaders:first-child) {
            display: none;
        }
        :scope tabpages:last-child {
            grid-area: tab-pages;
            display: block;
        }
        :scope :not(tabpages:last-child) {
            display: none;
        }
    </style>
    <script>
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
            // Get all tabpage and hide them.
            if (headers) {
                headers.show(tabName)
            }
        }

        updatePanels = (tabName) => {
            // Get all tabpage and show if match name.
            if (panels) {
                panels.show(tabName)
            }
        }

        this.setActiveTab = (tabName) => {
            updateHeaders(tabName);
            updatePanels(tabName);
        }
    </script>
</tabcontrol>
