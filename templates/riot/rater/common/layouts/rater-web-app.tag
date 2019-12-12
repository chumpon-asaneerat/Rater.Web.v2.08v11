<rater-web-app>
    <napp>
        <navibar>
            <navi-item>
                <span class="fas fa-home"></span>
                <span>Home</span>
            </navi-item>
            <navi-item>menu 1</navi-item>
            <navi-item>menu 2</navi-item>
            <navi-item class="center"></navi-item>
            <navi-item class="right">right 1</navi-item>
            <navi-item class="right">
                <span class="fas fa-bars"></span>
            </navi-item>
        </navibar>
        <yield/>
        <statusbar></statusbar>
    </napp>    
    <style>
        :scope {
            position: relative;
            display: block;
            margin: 0;
            padding: 0;
            width: auto;            
            height: auto;
            overflow: hidden;
        }
    </style>
</rater-web-app>