//#region Global Variables

let pressmgr;

//#endregion

//#region Init Fabric Subclass(es)

//#endregion

class Presenation {
    constructor() {
        this.designmode = false;
    }
}

;(() => {
    console.log('load presenatation manager.')
    pressmgr = new Presenation();
    pressmgr.designmode = true;
})()