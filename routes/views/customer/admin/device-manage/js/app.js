let app;
(() => {
    master.devicetypes.load();
    let tags = riot.mount('rater-web-app')
    let screenId = 'device-manage'
    screens.show(screenId)
})();
