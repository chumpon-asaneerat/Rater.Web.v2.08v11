let app;
(() => {
    let tags = riot.mount('rater-web-app')
    let screenId = 'admin-home'
    //let screenId = 'pie-votesummary-manage'
    //let screenId = 'bar-votesummary-manage'
    //let screenId = 'votesummary-manage'
    //let screenId = 'rawvote-manage'
    //let screenId = 'staff-compare-manage'
    //let screenId = 'staff-perf-manage'
    screens.show(screenId)
})();
