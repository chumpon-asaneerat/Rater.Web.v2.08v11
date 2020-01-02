//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));

//#endregion

//#region exec/validate wrapper method

const exec = async (db, callback) => {
    let ret;
    let connected = await db.connect();
    if (connected) {
        ret = await callback();
        await db.disconnect();
    }
    else {
        ret = db.error(db.errorNumbers.CONNECT_ERROR, 'No database connection.');
    }
    return ret;
}
const validate = (db, data) => {
    let result = data;
    if (!result) {
        result = db.error(db.errorNumbers.NO_DATA_ERROR, 'No data returns');
    }
    else {
        result = checkForError(data);
    }
    return result;
}
const checkForError = (data) => {
    let result = data;
    if (result.out && result.out.errNum && result.out.errNum !== 0) {
        result.errors.hasError = true;
        result.errors.errNum = result.out.errNum;
        result.errors.errMsg = result.out.errMsg;
    }
    return result;
}

//#endregion

const api = class {
    static findIndex(items, property, value) {
        let maps = items.map(item => { return item[property] })
        let idx = maps.indexOf(value)
        return idx;
    }
}

api.question = class {
    static checkLanguageId(params) {
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId = null;
        }
    }
    static prepare(params) {
        let util = api.question;
        util.checkLanguageId(params)
    }
    static async load(db, params) {
        let util = api.question;
        util.prepare(params)
        let ret = {};
        await util.qslideitems.exec(db, params, ret)
        await util.qslides.exec(db, params, ret)
        await util.qsets.exec(db, params, ret)
        return ret;
    }
    static parse(db, params, data) {
        let oParams = {}
        oParams.langId = params.langId;
        oParams.customerId = params.customerId;
        oParams.beginDate = params.beginDate;
        oParams.endDate = params.endDate;
        oParams.qsetId = params.qsetId;

        let slides = params.slides;
        let orgs = params.orgs;

        let result;

        if (slides && slides.length > 0) {

        }
        else {

        }

        result = {
            data: null,
            errors: { hasError: false, errNum: 0, errMsg: '' },
            out: {}
        }
        // set to result.
        result.data = data;

        return result;
    }
    static parseSlides(db, params, data, slides, orgs) {

    }
}
api.question.qslideitems = class {
    static async exec(db, params, model) {
        let util = api.question.qslideitems; // shotcut
        let rows = await util.exec_db(db, params)
        util.process_rows(model, rows)
    }
    static async exec_db(db, params) {
        let dbResult = await db.GetQSlideItems({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            qSSeq: null,
            enabled: true,
        });
        return (dbResult) ? dbResult.data : null;
    }
    static process_rows(model, rows) {
        let util = api.question.qslideitems; // shotcut
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            util.process_row(model, row)
        }
    }
    static process_row(model, row) {
        let util = api.question.qslideitems; // shotcut
        util.checkLanguagePropperty(model, row)
        let langObj = model[row.langId];
        let slideObj = util.getSlideByRow(row, langObj)
        let slideItemObj = util.getSlideItemByRow(row, slideObj)
    }
    static checkLanguagePropperty(model, row) {
        if (!model[row.langId]) {
            model[row.langId] = {
                desc: '',
                beginDate: null,
                endDate: null,
                slides: []
            }
        }
    }
    static getSlideByRow(row, langObj) {
        let util = api.question.qslideitems; // shotcut
        let ret;
        let idx = api.findIndex(langObj.slides, 'qseq', row.qSeq)
        if (idx === -1) {
            ret = {
                qseq: row.qSeq,
                text: '',
                items: []
            }
            langObj.slides.push(ret)
        }
        else {
            ret = langObj.slides[idx]
        }
        return ret;
    }
    static getSlideItemByRow(row, slideObj) {
        let util = api.question.qslideitems; // shotcut
        let ret;
        let idx = api.findIndex(slideObj.items, 'choice', row.qSSeq)
        if (idx === -1) {
            ret = {
                choice: row.qSSeq,
                text: row.QItemText
            }
            slideObj.items.push(ret)
        }
        else {
            ret = currSlide.items[idx]
        }
        return ret;
    }
}
api.question.qslides = class {
    static async exec(db, params, model) {
        let util = api.question.qslides; // shotcut
        let rows = await util.exec_db(db, params)
        util.process_rows(model, rows)
    }
    static async exec_db(db, params) {
        let dbResult = await db.GetQSlides({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            enabled: true,
        });
        return (dbResult) ? dbResult.data : null;
    }
    static process_rows(model, rows) {
        let util = api.question.qslides; // shotcut
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            util.process_row(model, row)
        }
    }
    static process_row(model, row) {
        let util = api.question.qslides; // shotcut
        let langObj = model[row.langId];
        if (langObj) {
            let slideObj = util.getSlideByRow(row, langObj)
        }        
    }
    static getSlideByRow(row, langObj) {
        //let util = api.question.qslides; // shotcut
        let idx = api.findIndex(langObj.slides, 'qseq', row.qSeq)
        let ret = null;
        if (idx !== -1) {
            ret = langObj.slides[idx];
            ret.text = row.QSlideText;
        }
        return ret; 
    }
}
api.question.qsets = class {
    static async exec(db, params, model) {
        let util = api.question.qsets; // shotcut
        let rows = await util.exec_db(db, params)
        util.process_rows(model, rows)
    }
    static async exec_db(db, params) {
        let dbResult = await db.GetQSets({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            enabled: true,
        });
        return (dbResult) ? dbResult.data : null;
    }
    static process_rows(model, rows) {
        let util = api.question.qsets; // shotcut
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            util.process_row(model, row)
        }
    }
    static process_row(model, row) {
        let util = api.question.qsets; // shotcut
        let langObj = model[row.langId];
        if (langObj) {
            langObj.desc = row.QSetDescription;
            langObj.beginDate = row.BeginDate;
            langObj.endDate = row.EndDate;
        }
    }
}

