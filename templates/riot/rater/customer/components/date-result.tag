<date-result>
    <div class="date-range">
        <span class="label">
            { (opts.caption) ? opts.caption : 'Date' }:&nbsp;
            { (opts.begin) ? opts.begin : '' }
            &nbsp;-&nbsp;
            { (opts.end) ? opts.end : '' }
        </span>
    </div>
    <style>
        @media (min-width: 620px) {
            :scope {
                max-width: 550px;
                /* width: 100%; */
            }
        }
        @media (min-width: 960px) {
            :scope {
                max-width: 850px;
                /* width: 100%; */
            }
        }
        :scope {
            display: block;
            margin: 0 auto;
            padding: 5px;
            padding-bottom: 1px;
            max-width: 1000px;
            /* width: 100%; */
        }
        :scope .date-range {
            display: block;
            margin: 0 auto;
            margin-bottom: 3px;
            padding: 5px;
            max-width: 1000px;
            /* width: 100%; */
            overflow: hidden;
            white-space: nowrap;
        }
        :scope .date-range .label {
            margin: 0 auto;
            padding: 5px;
            display: block;
            color: cornflowerblue;
            font-size: 1rem;
            font-weight: bold;
            border: 0 solid cornflowerblue;
            border-bottom: 1px solid cornflowerblue;
            /*
            display: inline-block;
            */
        }
    </style>
    <script>
        let updatecontent = () => {}
        this.setup = () => {}
    </script>
</date-result>