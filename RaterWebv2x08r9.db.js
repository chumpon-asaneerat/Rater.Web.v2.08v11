// required to manual set require path for nlib-mssql.
const SqlServer = require('./nlib/nlib-mssql');
const schema = require('./schema/RaterWebv2x08r9.schema.json');

const RaterWebv2x08r9 = class extends SqlServer {
    constructor() {
        super();
        // should match with nlib.config.json
        this.database = 'default'
    }
    async connect() {
        return await super.connect(this.database);
    }
    async disconnect() {
        await super.disconnect();
    }

    async GetRandomCode(pObj) {
        let name = 'GetRandomCode';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetErrorMsg(pObj) {
        let name = 'GetErrorMsg';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveErrorMsg(pObj) {
        let name = 'SaveErrorMsg';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveErrorMsgML(pObj) {
        let name = 'SaveErrorMsgML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetErrorMsgs(pObj) {
        let name = 'GetErrorMsgs';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLanguage(pObj) {
        let name = 'SaveLanguage';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async DisableLanguage(pObj) {
        let name = 'DisableLanguage';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async EnableLanguage(pObj) {
        let name = 'EnableLanguage';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetLanguages(pObj) {
        let name = 'GetLanguages';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SavePeriodUnit(pObj) {
        let name = 'SavePeriodUnit';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SavePeriodUnitML(pObj) {
        let name = 'SavePeriodUnitML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetPeriodUnits(pObj) {
        let name = 'GetPeriodUnits';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLimitUnit(pObj) {
        let name = 'SaveLimitUnit';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLimitUnitML(pObj) {
        let name = 'SaveLimitUnitML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetLimitUnits(pObj) {
        let name = 'GetLimitUnits';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetMemberTypes(pObj) {
        let name = 'GetMemberTypes';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLicenseType(pObj) {
        let name = 'SaveLicenseType';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLicenseTypeML(pObj) {
        let name = 'SaveLicenseTypeML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetLicenseTypes(pObj) {
        let name = 'GetLicenseTypes';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLicenseFeature(pObj) {
        let name = 'SaveLicenseFeature';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetLicenseFeatures(pObj) {
        let name = 'GetLicenseFeatures';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetLicenses(pObj) {
        let name = 'GetLicenses';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveUserInfo(pObj) {
        let name = 'SaveUserInfo';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveUserInfoML(pObj) {
        let name = 'SaveUserInfoML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetUserInfos(pObj) {
        let name = 'GetUserInfos';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveLicenseHistory(pObj) {
        let name = 'SaveLicenseHistory';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetCustomerHistories(pObj) {
        let name = 'GetCustomerHistories';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async RevokeLicense(pObj) {
        let name = 'RevokeLicense';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async ExtendLicense(pObj) {
        let name = 'ExtendLicense';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async CheckLicense(pObj) {
        let name = 'CheckLicense';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveCustomer(pObj) {
        let name = 'SaveCustomer';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveCustomerML(pObj) {
        let name = 'SaveCustomerML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetCustomers(pObj) {
        let name = 'GetCustomers';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async DeleteCustomer(pObj) {
        let name = 'DeleteCustomer';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveMemberInfo(pObj) {
        let name = 'SaveMemberInfo';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveMemberInfoML(pObj) {
        let name = 'SaveMemberInfoML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetMemberInfos(pObj) {
        let name = 'GetMemberInfos';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveBranch(pObj) {
        let name = 'SaveBranch';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveBranchML(pObj) {
        let name = 'SaveBranchML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetBranchs(pObj) {
        let name = 'GetBranchs';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveOrg(pObj) {
        let name = 'SaveOrg';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveOrgML(pObj) {
        let name = 'SaveOrgML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetOrgs(pObj) {
        let name = 'GetOrgs';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveQSet(pObj) {
        let name = 'SaveQSet';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveQSetML(pObj) {
        let name = 'SaveQSetML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetQSets(pObj) {
        let name = 'GetQSets';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveQSlide(pObj) {
        let name = 'SaveQSlide';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveQSlideML(pObj) {
        let name = 'SaveQSlideML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetQSlides(pObj) {
        let name = 'GetQSlides';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveQSlideItem(pObj) {
        let name = 'SaveQSlideItem';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveQSlideItemML(pObj) {
        let name = 'SaveQSlideItemML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetQSlideItems(pObj) {
        let name = 'GetQSlideItems';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveDevice(pObj) {
        let name = 'SaveDevice';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveDeviceML(pObj) {
        let name = 'SaveDeviceML';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetDevices(pObj) {
        let name = 'GetDevices';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetDeviceTypes(pObj) {
        let name = 'GetDeviceTypes';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SaveVote(pObj) {
        let name = 'SaveVote';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async CheckUsers(pObj) {
        let name = 'CheckUsers';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SignIn(pObj) {
        let name = 'SignIn';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async CheckAccess(pObj) {
        let name = 'CheckAccess';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetAccessUser(pObj) {
        let name = 'GetAccessUser';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SignOut(pObj) {
        let name = 'SignOut';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async Register(pObj) {
        let name = 'Register';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetVoteSummaries(pObj) {
        let name = 'GetVoteSummaries';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SetDeviceOrg(pObj) {
        let name = 'SetDeviceOrg';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async SetDeviceUser(pObj) {
        let name = 'SetDeviceUser';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async GetRawVotes(pObj) {
        let name = 'GetRawVotes';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async FilterOrgs(pObj) {
        let name = 'FilterOrgs';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

    async FilterMembers(pObj) {
        let name = 'FilterMembers';
        let proc = schema[name];
        return await this.execute(name, pObj, proc.parameter.inputs, proc.parameter.outputs);
    }

}

module.exports = exports = RaterWebv2x08r9;
