const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const find = require('find')

const isDirectory = (source) => {
    return fs.lstatSync(source).isDirectory()
}
const getDirectories = (source) => { 
    return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
}
const getJsonFiles = (source) => { 
    return find.fileSync(/\.json$/, source)
}
const getFileName = (fileName) => { 
    return path.basename(fileName, '.json')
    //return source.replace(fileName + '\\', '')
}
const getJson = (sJson) => {
    let obj;
    try { obj = JSON.parse(sJson) }
    catch { obj = null; }
    return obj;
}
const hasKey = (obj, key) => { 
    //return (key in Object.keys(obj))
    return obj.hasOwnProperty(key);
}
const prepareJsonFile = (dir, file, langObj, obj) => {
    // get nest path except last item
    let subpath = file.replace(dir + '\\', '')
    let subpaths = subpath.split('\\')
    let currObj = langObj;
    // construct nested array based on sub directories.
    let iCnt = 0, iMax = subpaths.length;
    while (iCnt < iMax) {
        let subpath = subpaths[iCnt]
        let pname = getFileName(subpath);
        if (iCnt < iMax - 1) {
            if (!hasKey(currObj, pname)) currObj[pname] = {};
            currObj = currObj[pname];
        }
        else {
            currObj[pname] = obj;
        }
        ++iCnt;
    }
}
const prepareEachLanguage = (dir, langObj) => {
    let files = getJsonFiles(dir);
    files.forEach(file => {
        let sJson = fs.readFileSync(file, 'utf8')
        let obj = getJson(sJson);
        if (obj) prepareJsonFile(dir, file, langObj, obj)
    })
}
const getContents = (contentPath) => {
    let json = {}
    let folders = getDirectories(contentPath)
    folders.forEach(dir => {
        let langId = dir.replace(contentPath + '\\', '')
        json[langId] = {}
        prepareEachLanguage(dir, json[langId])
    })
    return json;
}

module.exports.isDirectory = exports.isDirectory = isDirectory;
module.exports.getDirectories = exports.getDirectories = getDirectories;
module.exports.getContents = exports.getContents = getContents;