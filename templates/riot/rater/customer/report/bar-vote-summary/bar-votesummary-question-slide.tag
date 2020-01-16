<bar-votesummary-question-slide>
    <div class="question-box">
        <span class="caption">{ (opts.slide) ? opts.slide.text : '' }</span>
        <div class="choice-box">
            <virtual each={ choice in opts.slide.choices }>
                <span class="choiceNo">{ choice.choice }</span>
                <span class="choiceText">{ choice.text }</span>
            </virtual>
        </div>
        <div class="content-box">
            <bar-votesummary-org class="item" orgs="{ opts.slide.orgs }"></bar-votesummary-org>
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
        :scope .question-box .choice-box {
            display: grid;
            margin: 5px;
            margin-bottom: 0;
            padding: 5px;
            grid-template-columns: 30px 1fr;
            grid-gap: 5px;
            background: white;
            border: 1px solid silver;
        }
        :scope .question-box .choice-box .choiceNo { 
            display: inline-block;
            overflow: hidden;
            white-space: normal;
            text-align: right;
            color: black;
            height: auto;
        }
        :scope .question-box .choice-box .choiceText { 
            display: inline-block;
            overflow: hidden;
            white-space: normal;
            text-align: left;
            color: black;
            height: auto;
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
            display: inline-block;
            margin: 3px auto;
            padding: 0;
            color: black;
            width: 100%;
            height: 100%;
        }
    </style>
    <script>
    </script>
</bar-votesummary-question-slide>