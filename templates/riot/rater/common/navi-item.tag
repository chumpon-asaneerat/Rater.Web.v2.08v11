<navi-item>
    <yield/>
    <style>
        :scope {
            position: relative;
            display: inline-block;
            margin: 2px;
            padding: 2px;
            font-size: 1.1rem;
            vertical-align: baseline;
            cursor: default;
            user-select: none;
            white-space: nowrap;
            overflow: hidden;
        }
        :scope.center {
            flex-grow: 1;
            text-align: center;
        }
        :scope.right {
            justify-self: flex-end;
        }
    </style>
    <script>
    </script>
</navi-item>