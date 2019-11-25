<votesummary-question-slide>
    <div class="question-box">
        <span class="caption">{ (opts.slide) ? opts.slide.text : '' }</span>
        <div class="content-box">
            <votesummary-table class="item" choices="{ opts.slide.choices }" orgs="{ opts.slide.orgs }"></votesummary-table>
        </div>
    </div>
    <style>
        @media (min-width: 620px) {
            :scope {
                max-width: 550px;
                /* width: 100%; */
            }
            :scope .question-box .content-box {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 5px;
                grid-auto-rows: 200px;
            }
        }
        @media (min-width: 960px) {
            :scope {
                max-width: 850px;
                /* width: 100%; */
            }
            :scope .question-box .content-box {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 5px;
                grid-auto-rows: 250px;
            }
        }
        :scope {
            display: block;
            margin: 0 auto;
            margin-bottom: 3px;
            padding: 5px;
            max-width: 1000px;
            /* width: 100%; */
            /* overflow: hidden; */
            white-space: nowrap;
        }
        :scope .question-box {
            margin: 0 auto;
            /* padding: 5px; */
            display: block;
            color: white;
            border: 1px solid cornflowerblue;
            border-radius: 3px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        :scope .question-box .caption {
            display: block;
            margin: 0 auto;
            padding: 5px;
            background-color: cornflowerblue;
        }
        :scope .question-box .content-box {
            display: grid;
            margin: 0 auto;
            margin-bottom: 5px;
            padding: 5px;
            grid-template-columns: 1fr;
            grid-gap: 5px;
            grid-auto-rows: 300px;
        }
        :scope .question-box .content-box .item {
            display: block;
            margin: 3px auto;
            padding: 0;
            color: black;
            width: 100%;
            max-width: 100%;
            height: 100%;
            overflow: hidden;
        }
    </style>
    <script>        
    </script>
</votesummary-question-slide>