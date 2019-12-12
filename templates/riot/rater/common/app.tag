<app>
    <h1 class="header1">In app header 1</h1>
    <h1 class="header1">In app header 2</h1>
    <div class="subitem">
        <yield/>
    </div>    
    <style>
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
</app>