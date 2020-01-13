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

const api = class {}
api.vote = class {
    static async generateVotes(db, params) {
        let model = {}
        model.questions = await api.vote.getQuestions(db, params)
        model.orgs = await api.vote.getOrgs(db, params)
        model.devices = await api.vote.getDevices(db, params)
        model.members = await api.vote.getMembers(db, params)
        for (let i = 0; i < params.sampleSize; i++) {
            await api.vote.generateVote(db, params, model)
        }
    }
    static async generateVote(db, params, model) {
        let beginDate = new Date(params.beginDate)
        let endDate = new Date(params.endDate)
        let question;

        let voteParams = {}
        voteParams.customerId = params.customerId
        voteParams.qSetId = params.qSetId
        voteParams.orgId = api.vote.getRandomOrg(model.orgs).orgId
        voteParams.deviceId = api.vote.getRandomDevice(model.devices).deviceId

        voteParams.voteDate = api.vote.getRandomDate(beginDate, endDate)
        voteParams.userId = api.vote.getRandomMember(model.members).memberId

        let maxInt = (model.questions.length !== 0) ? 1000 / model.questions.length : 1000;
        let dbResult;
        for (let i = 0; i < model.questions.length; i++) {
            question = model.questions[i]
            voteParams.qSeq = question.qSeq
            let newTime = voteParams.voteDate.getTime() + nlib.NRandom.int(0, maxInt)
            voteParams.voteDate = new Date(newTime)
            voteParams.voteValue = api.vote.getRandomChoice(question.items).qSSeq
            dbResult = await db.SaveVote(voteParams)
            if (dbResult.errors.hasError) {
                console.log(dbResult)
            }
        }
    }
    static async getQuestions(db, params) {
        // get the question slide.
        let oParams = {
            'langId': 'EN',
            'customerId': params.customerId,
            'qSetId': params.qSetId,
            'qSeq': null
        }        
        let dbret = await db.GetQSlides(oParams)
        let results = [];
        if (dbret.data) {
            for (let i = 0; i < dbret.data.length; i++) {
                let ques = dbret.data[i]
                let obj = {
                    customerId: ques.customerId,
                    qSetId: ques.qSetId,
                    qSeq: ques.qSeq,
                    text: ques.QSlideText,
                    items: []
                }
                await api.vote.getQuestionItems(db, obj)
                results.push(obj)
            }
        }
        return results
    }
    static async getQuestionItems(db, question) {
        //qSSeq
        // get the question slide.
        let oParams = {
            'langId': 'EN',
            'customerId': question.customerId,
            'qSetId': question.qSetId,
            'qSeq': question.qSeq,
            'qSSeq': null
        }        
        let dbret = await db.GetQSlideItems(oParams)
        if (dbret.data) {
            for (let i = 0; i < dbret.data.length; i++) {
                let item = dbret.data[i]
                let obj = {
                    qSSeq: item.qSSeq,
                    text: item.QItemText
                }
                question.items.push(obj)
            }
        }
    }
    static async getOrgs(db, params) {
        let oParams = {
            'langId': 'EN',
            'customerId': params.customerId,
            'orgId': null,
            'branchId': null
        }        
        let dbret = await db.GetOrgs(oParams)
        let results = [];
        if (dbret.data) {
            for (let i = 0; i < dbret.data.length; i++) {
                let org = dbret.data[i]
                let obj = {
                    orgId: org.orgId,
                    branchId: org.branchId,
                    BranchName: org.BranchName,
                    OrgName: org.OrgName
                }
                results.push(obj)
            }
        }
        return results
    }
    static async getDevices(db, params) {
        let oParams = {
            'langId': 'EN',
            'customerId': params.customerId,
            'deviceId': null
        }        
        let dbret = await db.GetDevices(oParams)
        let results = [];
        if (dbret.data) {
            for (let i = 0; i < dbret.data.length; i++) {
                let device = dbret.data[i]
                let obj = {
                    deviceId: device.deviceId,
                    DeviceName: device.DeviceName,
                    Location: device.Location
                }
                results.push(obj)
            }
        }
        return results
    }
    static async getMembers(db, params) {
        let oParams = {
            'langId': 'EN',
            'customerId': params.customerId,
            'memberId': null
        }        
        let dbret = await db.GetMemberInfos(oParams)
        let results = [];
        if (dbret.data) {
            for (let i = 0; i < dbret.data.length; i++) {
                let member = dbret.data[i]
                let obj = {
                    memberId: member.memberId,
                    BranchName: member.FullName
                }
                results.push(obj)
            }
        }
        return results
    }
    static getRandomDate(beginDate, endDate) {
        return nlib.NRandom.date(beginDate, endDate, 1)[0]
    }
    static getRandomOrg(orgs) { return nlib.NRandom.array(orgs) }
    static getRandomDevice(devices) { return nlib.NRandom.array(devices) }
    static getRandomMember(members) { return nlib.NRandom.array(members) }
    static getRandomChoice(choices) { return nlib.NRandom.array(choices) }
}

//#region Implement - Save

api.Save = class {
    static prepare(req, res) {
        let params = WebServer.parseReq(req).data;
        let customerId = secure.getCustomerId(req, res);
        if (customerId) params.customerId = customerId;
        return params;
    }
    static async call(db, params) { 
        return await api.vote.generateVotes(db, params);
    }
    static parse(db, data, callback) {
        let dbResult = validate(db, data);
        let result = {}        
        result.data = null
        //result.src = dbResult.data
        result.errors = dbResult.errors
        //result.multiple = dbResult.multiple
        //result.datasets = dbResult.datasets
        result.out = dbResult.out

        let records = dbResult.data;
        let ret = {};

        // set to result.
        result.data = ret;

        callback(result);
    }
    static entry(req, res) {
        let db = new sqldb();
        let params = api.Save.prepare(req, res);
        let fn = async () => { return api.Save.call(db, params); }
        exec(db, fn).then(data => {
            api.Save.parse(db, data, (result) => {
                WebServer.sendJson(req, res, result);
            });
        })
    }
}

//#endregion

router.use(secure.checkAccess);
router.all('/votes/save', api.Save.entry);

const init_routes = (svr) => {
    svr.route('/dev/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;