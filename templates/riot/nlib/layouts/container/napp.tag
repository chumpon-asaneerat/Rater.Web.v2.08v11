<napp>
    <div class="app-area">
        <yield/>
    </div>    
    <style>
        :scope {
            display: grid;
            margin: 0 auto;
            padding: 0;
            height: 100vh;
            width: 100vw;
            grid-template-areas: 
                'app-area';
            background: inherit;
            overflow: hidden;
        }
        :scope>.app-area {
            grid-area: app-area;
            position: relative;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
                'navi-area'
                'scrn-area'
                'stat-area';
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        /* ignore all child if not navibar or screen or statusbar (footer) */
        :scope>.app-area>:not(navibar):not(screen):not(statusbar) {
            display: none;
        }
        /* navibar (header main menu) */
        :scope>.app-area navibar:first-child {
            grid-area: navi-area;
            /* padding: 0 5px; */
        }
        :scope>.app-area navibar:not(:first-child) {
            grid-area: navi-area;
            display: none;
        }
        /* screen(s) */
        :scope>.app-area screen {
            grid-area: scrn-area;
            /* padding: 5px; */
        }
        /* statusbar (footer) */
        :scope>.app-area statusbar:last-child {
            grid-area: stat-area;
            /* padding: 0 5px; */
        }
        :scope>.app-area statusbar:not(:last-child) {
            grid-area: stat-area;
            display: none;
        }
    </style>
</napp>