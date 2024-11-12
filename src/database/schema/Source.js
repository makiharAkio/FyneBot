const SourceModel = require('../models/Source');
const SubCategoryModel = require('./SubCategory');

const createSource = async (sourceName, subCategoryName) => {
    const subCategoryId = await SubCategoryModel.getSubCategoryId(subCategoryName);
    if (subCategoryId == null) return 'notFound';
    else if ((await getSource(sourceName, subCategoryName)).length > 0) return 'exists';
    else return await SourceModel.create({ 
        sourceName: sourceName, 
        subCategoryId: subCategoryId 
    });
};

const getSource = async (sourceName, subCategoryName) => {
    try {
        const subCategoryId = await SubCategoryModel.getSubCategoryId(subCategoryName);
        console.log("subCategoryId " + subCategoryId);
        if (subCategoryId == null) return 'notFound';
        return await SourceModel.find({ 
            sourceName: sourceName, 
            subCategoryId: subCategoryId 
        }).exec();
    } catch (error) {
        return error;
    }
};

const getSourceId = async (sourceName, subCategoryName) => {
    try {
        const sourceId = [];
        (await getSource(sourceName, subCategoryName)).forEach(element =>{
            sourceId.push(element.id);
        });
        return sourceId[0]; 
    } catch (error) {
        return error;
    }
};

const getAllSource = async () => {
    try {
        const sourceList = [];
        (await SourceModel.find().exec()).forEach(element => {
            sourceList.push(element.sourceName);
        });
        console.log(`get All: ${sourceList}`);
        return sourceList;
    } catch (error){
        return error;
    } 
};

const getAllSourcebySubCat = async (subCategoryName) => {
    try {
        const sourceList = [];
        const subCategoryId = await SubCategoryModel.getSubCategoryId(subCategoryName);
        (await SourceModel.find({ subCategoryId: subCategoryId }).exec()).forEach(element => {
            sourceList.push(element.sourceName);
            console.log(`${element.sourceName} pushed`);
        });
        console.log(`getAllSourcebySubCat: ${sourceList}`);
        return sourceList;
    } catch (error){
        return error;
    } 
};

const setSource = async (oldSourceName, newSourceName, subCategoryName) => {
    return await SourceModel.findOneAndUpdate({
        sourceName: oldSourceName, 
        subCategoryName: subCategoryName
    }, newSourceName, {
      upsert: true,
    }).exec();
};

const deleteSource = async (sourceName, subCategoryName) => {
    return await SourceModel.findOneAndDelete({ 
        sourceName: sourceName, 
        subCategoryName: subCategoryName 
    }).exec(); // returns {deletedCount: 1}
};
module.exports = {createSource,
    getSource,
    getSourceId,
    getAllSource,
    getAllSourcebySubCat,
    setSource,
    deleteSource
}