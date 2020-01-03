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
    static isEmpty(items) {
        return (items && items.length > 0)
    }

    static CreateVoteSummaries(obj, qset, results) {
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let row = results[i];
                let landId = row.LangId;
                if (!obj[landId]) {
                    obj[landId] = {
                        slides: []
                    }
                }
                let cLangObj = obj[landId];
                let cQSet = qset[landId]
                cLangObj.customerId = row.CustomerId;
                cLangObj.CustomerName = row.CustomerName;
                cLangObj.qsetId = row.QSetId;
                cLangObj.desc = cQSet.desc;
                cLangObj.beginDate = cQSet.beginDate;
                cLangObj.endDate = cQSet.endDate;
                let slidemaps = cLangObj.slides.map(slide => { return slide.qseq })
                let slideidx = slidemaps.indexOf(row.QSeq);
                let currSlide;
                let cqslidemap = cQSet.slides.map(qslide => { return qslide.qseq })
                let cqslideidx = cqslidemap.indexOf(row.QSeq);
                let cQSlide = (cqslideidx !== -1) ? cQSet.slides[cqslideidx] : null;

                if (slideidx === -1) {
                    currSlide = { 
                        qseq: row.QSeq,
                        text: (cQSlide) ? cQSlide.text : '',
                        maxChoice: row.MaxChoice,
                        choices: [],
                        orgs: []
                    }
                    // setup choices
                    cQSlide.items.forEach(item => {
                        let choice = {
                            choice: item.choice,
                            text: item.text,
                        }
                        currSlide.choices.push(choice)
                    })
                    cLangObj.slides.push(currSlide)
                }
                else { 
                    currSlide = cLangObj.slides[slideidx];
                }

                let orgmaps = currSlide.orgs.map(org => { return org.orgId });
                let orgidx = orgmaps.indexOf(row.OrgId);
                let currOrg;
                if (orgidx === -1) {
                    currOrg = { 
                        orgId: row.OrgId,
                        OrgName: row.OrgName,
                        parentId: row.ParentId,
                        branchId: row.BranchId,
                        BranchName: row.BranchName,
                        TotCnt: row.TotCnt,
                        AvgPct: row.AvgPct,
                        AvgTot: row.AvgTot,
                        choices: []
                    }
                    currSlide.orgs.push(currOrg)
                }
                else { 
                    currOrg = currSlide.orgs[orgidx];
                }

                let choicemaps = currOrg.choices.map(item => { return item.choice });
                let choiceidx = choicemaps.indexOf(row.Choice);
                let currChoice;

                let cQItemmaps = (cQSlide) ? cQSlide.items.map(item => { return item.choice }) : null
                let cQItemidx = (cQItemmaps) ? cQItemmaps.indexOf(row.Choice) : -1;
                if (choiceidx === -1) {
                    currChoice = {
                        choice: row.Choice,
                        text: (cQItemmaps && cQItemidx !== -1) ? cQSlide.items[cQItemidx].text : '',
                        Cnt: row.Cnt,
                        Pct: row.Pct,
                    }
                    currOrg.choices.push(currChoice)
                }
                else {
                    currChoice = currOrg.choices[choiceidx];
                }
            }
        }
    }
}

api.question = class {
    static checkLanguageId(params) {
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId = null;
        }
    }
    static async load(db, params) {
        let util = api.question;
        util.checkLanguageId(params)
        let ret = {};
        await util.qslideitems.exec(db, params, ret)
        await util.qslides.exec(db, params, ret)
        await util.qsets.exec(db, params, ret)
        return ret;
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
api.votesummary = class {
    static async processSlides(db, params, slides, orgs, result, qset) {
        let oParams = {};
        oParams.langId = params.langId;
        oParams.customerId = params.customerId;
        oParams.beginDate = params.beginDate;
        oParams.endDate = params.endDate;
        oParams.qsetId = params.qsetId;

        for (let i = 0; i < slides.length; i++) {
            oParams.qSeq = slides[i].qSeq;
            if (api.isEmpty(orgs)) {
                await api.votesummary.processOrgs(db, oParams, orgs, result, qset)
            }
            else {
                // no org specificed
                await api.votesummary.processNoOrg(db, oParams, result, qset)
            }
        }
    }
    static async processNoSlide(db, params, orgs, result, qset) {
        let oParams = {};
        oParams.langId = params.langId;
        oParams.customerId = params.customerId;
        oParams.beginDate = params.beginDate;
        oParams.endDate = params.endDate;
        oParams.qsetId = params.qsetId;

        // no slide specificed
        oParams.qSeq = null;
        if (api.isEmpty(orgs)) {
            await api.votesummary.processOrgs(db, oParams, orgs, result, qset)
        }
        else {
            // no org specificed
            await api.votesummary.processNoOrg(db, oParams, result, qset)
        }
    }
    static async processOrgs(db, params, orgs, result, qset) {
        let dbresult;
        for (let j = 0; j < orgs.length; j++) {
            params.orgId = orgs[j].orgId;
            // execute
            dbresult = await api.votesummary.GetVoteSummaries(db, params);
            api.votesummary.CreateVoteSummaries(result, qset, dbresult.data)
        }
    }
    static async processNoOrg(db, params, result, qset) {
        // no org specificed
        let dbresult;
        params.orgId = null;
        // execute
        dbresult = await api.votesummary.GetVoteSummaries(db, params);
        api.votesummary.CreateVoteSummaries(result, qset, dbresult.data)
    }
    static async GetVoteSummaries(db, params) {
        let ret, dbresult;
        ret = await db.GetVoteSummaries(params);
        dbresult = validate(db, ret);
        return dbresult;
    }
    static CreateVoteSummaries(result, qset, results) {
        api.CreateVoteSummaries(result, qset, results)
    }
    static async load(db, params) {
        let qset = await api.question.load(db, params);

        let slides = params.slides;
        let orgs = params.orgs;
        let result = {};
        
        if (api.isEmpty(slides)) {
            await api.votesummary.processSlides(db, params, slides, orgs, result, qset)
        }
        else {
            await api.votesummary.processNoSlide(db, params, orgs, result, qset)
        }

        return result;
    }
}

module.exports.api = exports.api = api;