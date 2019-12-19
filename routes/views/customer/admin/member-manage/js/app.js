let app;
(() => {
    master.membertypes.load(); // load member types.
    let tags = riot.mount('rater-web-app')
    let screenId = 'member-manage'
    screens.show(screenId)
})();
