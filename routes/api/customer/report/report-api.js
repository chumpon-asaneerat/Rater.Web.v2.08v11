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
        let idx = -1;
        if (items) {
            let maps = items.map(item => { return item[property] })
            idx = maps.indexOf(value)
        }
        return idx;
    }
    static isEmpty(items) {
        return (items && items.length > 0)
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
    static CreateVoteSummaries(obj, qset, results) {
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let row = results[i];
                api.votesummary.ParseVoteSummaryRow(obj, qset, row)
            }
        }
    }
    static ParseVoteSummaryRow(obj, qset, row) {
        let cQSet = qset[row.LangId]
        let cqslideidx = api.findIndex(cQSet.slides, 'qseq', row.QSeq) 
        let cQSlide = (cqslideidx !== -1) ? cQSet.slides[cqslideidx] : null;

        let cLangObj = api.votesummary.GetLangObj(obj, row, cQSlide)
        let currSlide = api.votesummary.GetCurrentSlide(row, cLangObj, cQSlide)
        let currOrg = api.votesummary.GetCurrentOrg(row, currSlide)
        api.votesummary.GetOrgChoice(row, cQSlide, currOrg)
    }
    static GetLangObj(obj, row, cQSet) {
        let landId = row.LangId;
        if (!obj[landId]) {
            obj[landId] = {
                slides: []
            }
        }
        let ret = obj[landId]
        ret.customerId = row.CustomerId;
        ret.CustomerName = row.CustomerName;
        ret.qsetId = row.QSetId;
        ret.desc = cQSet.desc;
        ret.beginDate = cQSet.beginDate;
        ret.endDate = cQSet.endDate;
        return ret;
    }
    static GetCurrentSlide(row, cLangObj, cQSlide) {
        let ret;
        let slideidx = api.findIndex(cLangObj.slides, 'qseq', row.QSeq)
        if (slideidx === -1) {
            ret = { 
                qseq: row.QSeq,
                text: (cQSlide) ? cQSlide.text : '',
                maxChoice: row.MaxChoice,
                choices: [],
                orgs: []
            }
            // setup choices
            api.votesummary.setupSlideChoices(ret, cQSlide)
            cLangObj.slides.push(ret)
        }
        else {
            ret = cLangObj.slides[slideidx];
        }
        return ret;
    }
    static setupSlideChoices(result, cQSlide) {
        if (cQSlide && cQSlide.items.length > 0) {
            for (let i = 0; i < cQSlide.items.length; i++) {
                let item = cQSlide.items[i]
                let choice = {
                    choice: item.choice,
                    text: item.text,
                }
                result.choices.push(choice)
            }
        }
    }
    static GetCurrentOrg(row, currSlide) {
        let orgidx = api.findIndex(currSlide.orgs, 'orgId', row.OrgId)
        let ret;
        if (orgidx === -1) {
            ret = { 
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
            currSlide.orgs.push(ret)
        }
        else { 
            ret = currSlide.orgs[orgidx];
        }
        return ret;
    }
    static GetOrgChoice(row, cQSlide, currOrg) {
        let choiceidx = api.findIndex(currOrg.choices, 'choice', row.Choice)
        let ret;
        if (choiceidx === -1) {
            ret = {
                choice: row.Choice,
                text: api.votesummary.getOrgChoiceText(row, cQSlide),
                Cnt: row.Cnt,
                Pct: row.Pct,
            }
            currOrg.choices.push(ret)
        }
        else {
            ret = currOrg.choices[choiceidx];
        }
        return ret;
    }
    static getOrgChoiceText(row, cQSlide) {
        let ret = ''
        if (cQSlide && cQSlide.items.length > 0) {
            let cQItemidx = api.findIndex(cQSlide.items, 'choice', row.Choice)
            if (cQItemidx !== -1) {
                ret = cQSlide.items[cQItemidx].text;
            }
        }
        return ret
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

api.staffsummary = class {
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
                await api.staffsummary.processOrgs(db, oParams, orgs, result, qset)
            }
            else {
                // no org specificed
                await api.staffsummary.processNoOrg(db, oParams, result, qset)
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
            await api.staffsummary.processOrgs(db, oParams, orgs, result, qset)
        }
        else {
            // no org specificed
            await api.staffsummary.processNoOrg(db, oParams, result, qset)
        }
    }
    static async processOrgs(db, params, orgs, result, qset) {
        let dbresult;
        for (let j = 0; j < orgs.length; j++) {
            params.orgId = orgs[j].orgId;
            // execute
            dbresult = await api.staffsummary.GetVoteSummaries(db, params);
            api.staffsummary.CreateStaffSummaries(result, qset, dbresult.data)
        }
    }
    static async processNoOrg(db, params, result, qset) {
        // no org specificed
        let dbresult;
        params.orgId = null;
        // execute
        dbresult = await api.staffsummary.GetVoteSummaries(db, params);
        api.staffsummary.CreateStaffSummaries(result, qset, dbresult.data)
    }
    static async GetVoteSummaries(db, params) {
        let ret, dbresult;
        ret = await db.GetVoteSummaries(params);
        dbresult = validate(db, ret);
        return dbresult;
    }
    static CreateStaffSummaries(obj, qset, results) {
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let row = results[i];
                api.staffsummary.ParseVoteSummaryRow(obj, qset, row)
            }
        }
    }
    static ParseVoteSummaryRow(obj, qset, row) {
        let cQSet = qset[row.LangId]
        let cqslideidx = api.findIndex(cQSet.slides, 'qseq', row.QSeq) 
        let cQSlide = (cqslideidx !== -1) ? cQSet.slides[cqslideidx] : null;

        let cLangObj = api.votesummary.GetLangObj(obj, row, cQSlide)
        let currSlide = api.votesummary.GetCurrentSlide(row, cLangObj, cQSlide)
        let currOrg = api.votesummary.GetCurrentOrg(row, currSlide)
        api.staffsummary.GetOrgChoice(row, cQSlide, currOrg)
    }
    static GetLangObj(obj, row, cQSet) {
        let landId = row.LangId;
        if (!obj[landId]) {
            obj[landId] = {
                slides: []
            }
        }
        let ret = obj[landId]
        ret.customerId = row.CustomerId;
        ret.CustomerName = row.CustomerName;
        ret.qsetId = row.QSetId;
        ret.desc = cQSet.desc;
        ret.beginDate = cQSet.beginDate;
        ret.endDate = cQSet.endDate;
        return ret;
    }
    static GetCurrentSlide(row, cLangObj, cQSlide) {
        let ret;
        let slideidx = api.findIndex(cLangObj.slides, 'qseq', row.QSeq)
        if (slideidx === -1) {
            ret = { 
                qseq: row.QSeq,
                text: (cQSlide) ? cQSlide.text : '',
                maxChoice: row.MaxChoice,
                choices: [],
                orgs: []
            }
            // setup choices
            api.staffsummary.setupSlideChoices(ret, cQSlide)
            cLangObj.slides.push(ret)
        }
        else {
            ret = cLangObj.slides[slideidx];
        }
        return ret;
    }
    static setupSlideChoices(result, cQSlide) {
        if (cQSlide && cQSlide.items.length > 0) {
            for (let i = 0; i < cQSlide.items.length; i++) {
                let item = cQSlide.items[i]
                let choice = {
                    choice: item.choice,
                    text: item.text,
                }
                result.choices.push(choice)
            }
        }
    }
    static GetCurrentOrg(row, currSlide) {
        let orgidx = api.findIndex(currSlide.orgs, 'orgId', row.OrgId)
        let ret;
        if (orgidx === -1) {
            ret = { 
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
            currSlide.orgs.push(ret)
        }
        else { 
            ret = currSlide.orgs[orgidx];
        }
        return ret;
    }
    static GetOrgChoice(row, cQSlide, currOrg) {
        let choiceidx = api.findIndex(currOrg.choices, 'choice', row.Choice)
        let ret;
        if (choiceidx === -1) {
            ret = {
                choice: row.Choice,
                text: api.staffsummary.getOrgChoiceText(row, cQSlide),
                Cnt: row.Cnt,
                Pct: row.Pct,
            }
            currOrg.choices.push(ret)
        }
        else {
            ret = currOrg.choices[choiceidx];
        }
        return ret;
    }
    static getOrgChoiceText(row, cQSlide) {
        let ret = ''
        if (cQSlide && cQSlide.items.length > 0) {
            let cQItemidx = api.findIndex(cQSlide.items, 'choice', row.Choice)
            if (cQItemidx !== -1) {
                ret = cQSlide.items[cQItemidx].text;
            }
        }
        return ret
    }
    static async load(db, params) {
        let qset = await api.question.load(db, params);

        let slides = params.slides;
        let orgs = params.orgs;
        let result = {};
        
        if (api.isEmpty(slides)) {
            await api.staffsummary.processSlides(db, params, slides, orgs, result, qset)
        }
        else {
            await api.staffsummary.processNoSlide(db, params, orgs, result, qset)
        }

        return result;
    }
}

module.exports.api = exports.api = api;