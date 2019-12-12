<app>
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
            background: cornsilk;
            overflow: hidden;
        }
        /* Selects all elements that has class 'header1' where the parent is a '':scope' element */
        :scope>.header1 {
            margin: 0;
            padding: 0;
            color: red;
        }
        :scope>.app-area {
            position: relative;
            display: block;
            grid-area: app-area;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    </style>
    <script>
    </script>
</app>