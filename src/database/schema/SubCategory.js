const SubCategoryModel = require('../models/SubCategory');
const CategoryModel = require('./Category');

const createSubCategory = async (subCategoryName, categoryName) => {
    const categoryId = await CategoryModel.getCategoryId(categoryName);
    if (categoryId == null) return 'notFound';
    else if ((await getSubCategory(subCategoryName, categoryName)).length > 0) return 'exists';
    else return await SubCategoryModel.create({ subCategoryName: subCategoryName, categoryId: categoryId });
};

const getSubCategory = async (subCategoryName, categoryName) => {
    try {
        const categoryId = await CategoryModel.getCategoryId(categoryName);
        console.log('categoryId ' + categoryId);
        if (categoryId == null) return 'notFound';
        return await SubCategoryModel.find({ subCategoryName: subCategoryName, categoryId: categoryId }).exec();
    } catch (error) {
        return error;
    }
};

const getSubCategoryId = async (subCategoryName, categoryName) => {
    try {
        const subCategoryId = [];
        (await getSubCategory(subCategoryName, categoryName)).forEach(element =>{
            subCategoryId.push(element.id);
        });
        return subCategoryId[0]; 
    } catch (error) {
        return error;
    }
};

const getAllSubCategory = async () => {
    try {
        const subCategoryList = [];
        (await SubCategoryModel.find().exec()).forEach(element => {
            subCategoryList.push(element.subCategoryName);
        });
        console.log(`get All: ${subCategoryList}`);
        return subCategoryList;
    } catch (error){
        return error;
    } 
};

const getAllSubCategorybyCat = async (categoryName) => {
    try {
        const subCategoryList = [];
        const categoryId = await CategoryModel.getCategoryId(categoryName);
        (await SubCategoryModel.find({ categoryId: categoryId }).exec()).forEach(element => {
            subCategoryList.push(element.subCategoryName);
            console.log(`${element.subCategoryName} pushed`);
        });
        console.log(`getAllSubCategorybyCat: ${subCategoryList}`);
        return subCategoryList;
    } catch (error){
        return error;
    } 
};

const setSubCategory = async (oldSubCategoryName, newSubCategoryName, categoryName) => {
    return await SubCategoryModel.findOneAndUpdate({subCategoryName: oldSubCategoryName, categoryName: categoryName}, newSubCategoryName, {
      upsert: true,
    }).exec();
};

const deleteSubCategory = async (subCategoryName, categoryName) => {
    return await SubCategoryModel.findOneAndDelete({ subCategoryName: subCategoryName, categoryName: categoryName }).exec(); // returns {deletedCount: 1}
};
module.exports = {createSubCategory,
    getSubCategory,
    getSubCategoryId,
    getAllSubCategory,
    getAllSubCategorybyCat,
    setSubCategory,
    deleteSubCategory
}