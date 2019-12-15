//#region requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];
const nlib = require(path.join(rootPath, 'nlib', 'nlib'));

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));
const secure = require(path.join(rootPath, 'edl', 'rater-secure')).RaterSecure;

const WebServer = require(path.join(rootPath, 'nlib', 'nlib-express'));
const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

const fs = require('fs')
const mkdirp = require('mkdirp')

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
    static async SaveBranchs(db, params) {
        let ret;
        let rets = [];
        let customerId = params.customerId;
        if (params && params.items) {
            let items = params.items;
            let branchId;

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = customerId;
                if (item.langId === 'EN') {
                    ret = await db.SaveBranch(item);
                    branchId = ret.out.branchId;
                    rets.push(ret);
                }
            }
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = params.customerId;
                if (!item.branchId || item.branchId === '') {
                    item.branchId = branchId;
                }
                if (item.langId !== 'EN') {
                    ret = await db.SaveBranchML(item);
                    rets.push(ret);
                }                
            }
        }
        return rets;
    }
    static async SaveMemberInfos(db, params) {
        let ret;
        let rets = [];
        let customerId = params.customerId;
        if (params && params.items) {
            let items = params.items;
            let memberId;

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = customerId;
                if (item.langId === 'EN') {
                    ret = await db.SaveMemberInfo(item);
                    memberId = ret.out.memberId;
                    rets.push(ret);
                }
            }
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = params.customerId;
                if (!item.memberId || item.memberId === '') {
                    item.memberId = memberId;
                }                
                if (item.langId !== 'EN') {
                    ret = await db.SaveMemberInfoML(item);
                    rets.push(ret);
                }                
            }
        }
        return rets;
    }
    static async SaveDevices(db, params) {
        let ret;
        let rets = [];
        let customerId = params.customerId;
        if (params && params.items) {
            let items = params.items;
            let deviceId;

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = customerId;
                if (item.langId === 'EN') {
                    ret = await db.SaveDevice(item);
                    deviceId = ret.out.deviceId;
                    rets.push(ret);
                }
            }
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = params.customerId;
                if (!item.deviceId || item.deviceId === '') {
                    item.deviceId = deviceId;
                }                
                if (item.langId !== 'EN') {
                    ret = await db.SaveDeviceML(item);
                    rets.push(ret);
                }                
            }
        }
        return rets;
    }
    static async SaveOrgs(db, params) {
        let ret;
        let rets = [];
        let customerId = params.customerId;
        if (params && params.items) {
            let items = params.items;
            let orgId;

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = customerId;
                if (item.langId === 'EN') {
                    ret = await db.SaveOrg(item);
                    orgId = ret.out.orgId;
                    rets.push(ret);
                }
            }
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item.customerId = params.customerId;
                if (!item.orgId || item.orgId === '') {
                    item.orgId = orgId;
                }                
                if (item.langId !== 'EN') {
                    ret = await db.SaveOrgML(item);
                    rets.push(ret);
                }                
            }
        }
        return rets;
    }
    static async GetQSet(db, params) {
        let ret = {};
        let qslideitemsDbRet = await db.GetQSlideItems({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            qSSeq: null,
            enabled: true,
        });
        let qslideitems = qslideitemsDbRet.data;
        for (let i = 0; i < qslideitems.length; i++) {
            let row = qslideitems[i];
            if (!ret[row.langId]) {
                ret[row.langId] = {
                    desc: '',
                    beginDate: null,
                    endDate: null,
                    slides: []
                }
            }
            let currLang = ret[row.langId];
            let slidemaps = currLang.slides.map(slide => { return slide.qseq })
            let slideidx = slidemaps.indexOf(row.qSeq)
            let currSlide;
            if (slideidx === -1) {
                currSlide = {
                    qseq: row.qSeq,
                    text: '',
                    items: []
                }
                currLang.slides.push(currSlide)
            }
            else {
                currSlide = currLang.slides[slideidx]
            }
            let itemmaps = currSlide.items.map(item => { return item.choice })
            let itemidx = itemmaps.indexOf(row.qSSeq)
            let currItem;
            if (itemidx === -1) {
                currItem = {
                    choice: row.qSSeq,
                    text: row.QItemText
                }
                currSlide.items.push(currItem)
            }
            else {
                currItem = currSlide.items[itemidx]
            }
        }

        let qslidesDbRet = await db.GetQSlides({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            qSeq: null,
            enabled: true,
        });
        let qslides = qslidesDbRet.data;
        for (let i = 0; i < qslides.length; i++) {
            let row = qslides[i];
            let currLang = ret[row.langId];
            if (currLang) {
                let slidemaps = currLang.slides.map(slide => { return slide.qseq })
                let slideidx = slidemaps.indexOf(row.qSeq)
                let currSlide;
                if (slideidx !== -1) {
                    currSlide = currLang.slides[slideidx]
                    currSlide.text = row.QSlideText;
                }
            }
        }

        let qsetDbRet = await db.GetQSets({
            langId: null,
            customerId: params.customerId,
            qsetId: params.qsetId,
            enabled: true,
        });
        let qsets = qsetDbRet.data;

        for (let i = 0; i < qsets.length; i++) {
            let row = qsets[i];
            let currLang = ret[row.langId];
            if (currLang) {
                currLang.desc = row.QSetDescription;
                currLang.beginDate = row.BeginDate;
                currLang.endDate = row.EndDate;
            }
        }        

        return ret;
    }
}

const routes = class {
    static GetCustomers(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.customerId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetCustomers(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.customerId);
                let idx = map.indexOf(rec.customerId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { customerId: rec.customerId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.CustomerName = rec.CustomerName;
                nobj.TaxCode = rec.TaxCode;
                nobj.CustomerName = rec.CustomerName;
                nobj.Address1 = rec.Address1;
                nobj.Address2 = rec.Address2;
                nobj.City = rec.City;
                nobj.Province = rec.Province;
                nobj.PostalCode = rec.PostalCode;
                nobj.Phone = rec.Phone;
                nobj.Mobile = rec.Mobile;
                nobj.Fax = rec.Fax;
                nobj.Email = rec.Email;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetBranchs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.branchId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetBranchs(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.branchId);
                let idx = map.indexOf(rec.branchId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { branchId: rec.branchId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.branchName = rec.BranchName;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static SaveBranchs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;

        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        let fn = async () => {
            return api.SaveBranchs(db, params);
        }
        exec(db, fn).then(data => {
            let results = [];
            let result;
            let dbResult;

            for (let i = 0; i < data.length; i++) {
                dbResult = validate(db, data[i]);

                result = {
                    data : dbResult.data,
                    //src: dbResult.data,
                    errors: dbResult.errors,
                    //multiple: dbResult.multiple,
                    //datasets: dbResult.datasets,
                    out: dbResult.out
                }
                results.push(result);
            }

            WebServer.sendJson(req, res, results);
        })
    }
    static GetMemberInfos(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.memberId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetMemberInfos(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.memberId);
                let idx = map.indexOf(rec.memberId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { memberId: rec.memberId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.MemberType = rec.MemberType;
                nobj.Prefix = rec.Prefix;
                nobj.FirstName = rec.FirstName;
                nobj.LastName = rec.LastName;
                nobj.UserName = rec.UserName;
                nobj.Password = rec.Password;
                nobj.TagId = rec.TagId;
                nobj.IDCard = rec.IDCard;
                nobj.EmployeeCode = rec.EmployeeCode;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static SaveMemberInfos(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;

        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        let fn = async () => {
            return api.SaveMemberInfos(db, params);
        }
        exec(db, fn).then(data => {
            let results = [];
            let result;
            let dbResult;

            for (let i = 0; i < data.length; i++) {
                dbResult = validate(db, data[i]);

                result = {
                    data : dbResult.data,
                    //src: dbResult.data,
                    errors: dbResult.errors,
                    //multiple: dbResult.multiple,
                    //datasets: dbResult.datasets,
                    out: dbResult.out
                }
                results.push(result);
            }

            WebServer.sendJson(req, res, results);
        })
    }
    static GetDevices(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.deviceId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetDevices(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.deviceId);
                let idx = map.indexOf(rec.deviceId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { deviceId: rec.deviceId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.DeviceName = rec.DeviceName;
                nobj.Location = rec.Location;
                nobj.deviceTypeId = rec.deviceTypeId;
                nobj.memberId = rec.memberId;
                nobj.orgId = rec.orgId;
                nobj.Type = rec.Type;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static SaveDevices(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;

        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        let fn = async () => {
            return api.SaveDevices(db, params);
        }
        exec(db, fn).then(data => {
            let results = [];
            let result;
            let dbResult;

            for (let i = 0; i < data.length; i++) {
                dbResult = validate(db, data[i]);

                result = {
                    data : dbResult.data,
                    //src: dbResult.data,
                    errors: dbResult.errors,
                    //multiple: dbResult.multiple,
                    //datasets: dbResult.datasets,
                    out: dbResult.out
                }
                results.push(result);
            }

            WebServer.sendJson(req, res, results);
        })
    }
    static GetOrgs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.branchId = null;
        params.orgId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetOrgs(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.orgId);
                let idx = map.indexOf(rec.orgId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { orgId: rec.orgId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.parentId = rec.parentId;
                nobj.branchId = rec.branchId;
                nobj.OrgName = rec.OrgName;
                nobj.BranchName = rec.BranchName;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static SaveOrgs(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;

        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;

        let fn = async () => {
            return api.SaveOrgs(db, params);
        }
        exec(db, fn).then(data => {
            let results = [];
            let result;
            let dbResult;

            for (let i = 0; i < data.length; i++) {
                dbResult = validate(db, data[i]);

                result = {
                    data : dbResult.data,
                    //src: dbResult.data,
                    errors: dbResult.errors,
                    //multiple: dbResult.multiple,
                    //datasets: dbResult.datasets,
                    out: dbResult.out
                }
                results.push(result);
            }

            WebServer.sendJson(req, res, results);
        })
    }
    static UploadQuestionJson(req, res) {
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        console.log(params)

        let result = createSuccess(null);

        WebServer.sendJson(req, res, result);
    }
    static GetRawVotes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId =  'EN';
        }
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        //params.orgid = null;
        //params.memberId = null;

        let fn = async () => {
            return db.GetRawVotes(params);
        }
        exec(db, fn).then(data => {
            let db = new sqldb();
    
            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};
            // set to result.
            result.data = records;

            WebServer.sendJson(req, res, result);
        })
    }
    static CreateStaffSummaries(obj, qset, results) {
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
                        users: []
                    }
                    currSlide.orgs.push(currOrg)
                }
                else { 
                    currOrg = currSlide.orgs[orgidx];
                }
                let usermaps = currOrg.users.map(user => { return user.userId});
                let useridx = usermaps.indexOf(row.UserId);
                let currUser;
                if (useridx === -1) {
                    currUser = {
                        TotCnt: row.TotCnt,
                        AvgPct: row.AvgPct,
                        AvgTot: row.AvgTot,
                        userId: row.UserId,
                        fullName: row.FullName,
                        deviceId: row.DeviceId,
                        choices: []
                    }
                    currOrg.users.push(currUser)
                }
                else {
                    currUser = currOrg.users[useridx];
                }

                let choicemaps = currUser.choices.map(item => { return item.choice });
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
                    currUser.choices.push(currChoice)
                }
                else {
                    currChoice = currUser.choices[choiceidx];
                }
            }
        }
    }
    static GetStaffSummaries(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId = null;
        }
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.deviceId = null;

        let fn = async () => {
            let oParams = {};
            oParams.langId = params.langId;
            oParams.customerId = params.customerId;
            oParams.beginDate = params.beginDate;
            oParams.endDate = params.endDate;
            oParams.qsetId = params.qsetId;

            let qset = await api.GetQSet(db, params);

            let slides = params.slides;
            let orgs = params.orgs;
            let users = params.users;
            let ret, dbresult;
            let result = {};
            // loop selected slide
            if (slides && slides.length > 0) {
                for (let i = 0; i < slides.length; i++) {
                    oParams.qSeq = slides[i].qSeq;
                    if (orgs && orgs.length > 0) {
                        for (let j = 0; j < orgs.length; j++) {
                            oParams.orgId = orgs[j].orgId;
                            if (users && users.length > 0) {
                                for (let k = 0; k < users.length; k++) {
                                    oParams.userId = users[k].userId;
                                    // execute
                                    ret = await db.GetVoteSummaries(oParams);
                                    dbresult = validate(db, ret);
                                    routes.CreateStaffSummaries(result, qset, dbresult.data)
                                }
                            }
                            else {
                                oParams.userId = null;
                                // execute
                                ret = await db.GetVoteSummaries(oParams);
                                dbresult = validate(db, ret);
                                routes.CreateStaffSummaries(result, qset, dbresult.data)
                            }
                        }
                    }
                    else {
                        // no org specificed
                        oParams.orgId = null;
                        if (users && users.length > 0) {
                            for (let k = 0; k < users.length; k++) {
                                oParams.userId = users[k].userId;
                                // execute
                                ret = await db.GetVoteSummaries(oParams);
                                dbresult = validate(db, ret);
                                routes.CreateStaffSummaries(result, qset, dbresult.data)
                            }
                        }
                        else {
                            oParams.userId = null;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            routes.CreateStaffSummaries(result, qset, dbresult.data)
                        }
                    }
                }
            }
            else {
                // no slide specificed
                oParams.qSeq = null;
                if (orgs && orgs.length > 0) {
                    for (let j = 0; j < orgs.length; j++) {
                        oParams.orgId = orgs[j].orgId;
                        if (users && users.length > 0) {
                            for (let k = 0; k < users.length; k++) {
                                oParams.userId = users[k].userId;
                                // execute
                                ret = await db.GetVoteSummaries(oParams);
                                dbresult = validate(db, ret);
                                routes.CreateVoteSummaries(result, qset, dbresult.data)
                            }
                        }
                        else {
                            oParams.userId = null;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            routes.CreateVoteSummaries(result, qset, dbresult.data)
                        }
                    }
                }
                else {
                    // no org specificed
                    oParams.orgId = null;
                    if (users && users.length > 0) {
                        for (let k = 0; k < users.length; k++) {
                            oParams.userId = users[k].userId;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            routes.CreateVoteSummaries(result, qset, dbresult.data)
                        }
                    }
                    else {
                        oParams.userId = null;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        routes.CreateVoteSummaries(result, qset, dbresult.data)
                    }
                }
            }

            //return db.GetVoteSummaries(params);
            return result;
        }
        exec(db, fn).then(data => {
            //let dbResult = validate(db, data);

            /*
            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            */
            let result = {
                data: null,
                errors: {
                    hasError: false,
                    errNum: 0,
                    errMsg: ''
                },
                out: {}
            }
            // set to result.
            result.data = data;

            WebServer.sendJson(req, res, result);
        })
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
    static GetVoteSummaries(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        if (params.langId === undefined || params.langId === null || params.langId === '') {
            params.langId = null;
        }
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.deviceId = null;
        params.userId = null;

        let fn = async () => {
            let oParams = {};
            oParams.langId = params.langId;
            oParams.customerId = params.customerId;
            oParams.beginDate = params.beginDate;
            oParams.endDate = params.endDate;
            oParams.qsetId = params.qsetId;

            let qset = await api.GetQSet(db, params);

            let slides = params.slides;
            let orgs = params.orgs;
            let ret, dbresult;
            let result = {};
            // loop selected slide
            if (slides && slides.length > 0) {
                for (let i = 0; i < slides.length; i++) {
                    oParams.qSeq = slides[i].qSeq;
                    if (orgs && orgs.length > 0) {
                        for (let j = 0; j < orgs.length; j++) {
                            oParams.orgId = orgs[j].orgId;
                            // execute
                            ret = await db.GetVoteSummaries(oParams);
                            dbresult = validate(db, ret);
                            routes.CreateVoteSummaries(result, qset, dbresult.data)
                        }
                    }
                    else {
                        // no org specificed
                        oParams.orgId = null;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        routes.CreateVoteSummaries(result, qset, dbresult.data)
                    }
                }
            }
            else {
                // no slide specificed
                oParams.qSeq = null;
                if (orgs && orgs.length > 0) {
                    for (let j = 0; j < orgs.length; j++) {
                        oParams.orgId = orgs[j].orgId;
                        // execute
                        ret = await db.GetVoteSummaries(oParams);
                        dbresult = validate(db, ret);
                        routes.CreateVoteSummaries(result, qset, dbresult.data)
                    }
                }
                else {
                    // no org specificed
                    oParams.orgId = null;
                    // execute
                    ret = await db.GetVoteSummaries(oParams);
                    dbresult = validate(db, ret);
                    routes.CreateVoteSummaries(result, qset, dbresult.data)
                }
            }

            //return db.GetVoteSummaries(params);
            return result;
        }
        exec(db, fn).then(data => {
            //let dbResult = validate(db, data);

            /*
            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            */
            let result = {
                data: null,
                errors: {
                    hasError: false,
                    errNum: 0,
                    errMsg: ''
                },
                out: {}
            }
            // set to result.
            result.data = data;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetQSets(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.qsetId = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetQSets(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.qSetId);
                let idx = map.indexOf(rec.qSetId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { qSetId: rec.qSetId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.BeginDate = rec.BeginDate;
                nobj.EndDate = rec.EndDate;
                nobj.desc = rec.QSetDescription;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static GetQSlides(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.qSeq = null;
        params.enabled = true;

        let fn = async () => {
            return db.GetQSlides(params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.qSetId);
                let idx = map.indexOf(rec.qSetId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { 
                        qSetId: rec.qSetId,
                        slides: []
                    }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                let map2 = nobj.slides.map(c => c.qSeq);
                let idx2 = map2.indexOf(rec.qSeq);
                let nobj2;
                if (idx2 === -1) {
                    nobj2 = {
                        qSeq: rec.qSeq
                    }
                    nobj.slides.push(nobj2)
                }
                else {
                    nobj2 = nobj.slides[idx2]
                }
                nobj2.text = rec.QSlideText
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    static SaveJsonQuestion(req, res) {
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.customerId = 'EDL-2019100001' // hard code.
        params.qsetid = 'QS00001' // hard code.
        let targetPath = path.join(rootPath, 'customer', params.customerId, 'Question')
        mkdirp.sync(targetPath);
        let targetFile =  path.join(targetPath, params.qsetid + '.json')
        let data = {
            id: params.qsetid,
            data: params.data
        };
        fs.writeFileSync(targetFile, JSON.stringify(data), 'utf8')

        let result = nlib.NResult.data({});
        WebServer.sendJson(req, res, result);
    }
    static LoadJsonQuestion(req, res) {
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        params.customerId = 'EDL-2019100001' // hard code.
        params.qsetid = 'QS00001' // hard code.
        let targetPath = path.join(rootPath, 'customer', params.customerId, 'Question')
        let obj = null;
        let targetFile =  path.join(targetPath, params.qsetid + '.json')
        if (fs.existsSync(targetFile)) {
            obj = fs.readFileSync(targetFile, 'utf8')
        }
        let result = (obj) ? nlib.NResult.data(obj) : nlib.NResult.error(-300, 'file not found');
        WebServer.sendJson(req, res, result);
    }
}

router.use(secure.checkAccess);

// branch
router.all('/customer/search', routes.GetCustomers);

// branch
router.all('/branch/search', routes.GetBranchs);
router.post('/branch/save', routes.SaveBranchs);
// member
router.all('/member/search', routes.GetMemberInfos);
router.post('/member/save', routes.SaveMemberInfos);
// device
router.all('/device/search', routes.GetDevices);
router.post('/device/save', routes.SaveDevices);
// org
router.all('/org/search', routes.GetOrgs);
router.post('/org/save', routes.SaveOrgs);

router.post('/question/upload/', routes.UploadQuestionJson);

router.all('/report/rawvotes/search', routes.GetRawVotes);

router.all('/report/votesummaries/search', routes.GetVoteSummaries);
router.all('/report/staffsummaries/search', routes.GetStaffSummaries);

router.post('/question/set/search', routes.GetQSets);
router.post('/question/slide/search', routes.GetQSlides);

router.post('/question/save', routes.SaveJsonQuestion);
router.post('/question/load', routes.LoadJsonQuestion);

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;