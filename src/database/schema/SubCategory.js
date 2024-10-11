const SubCategorySchema = require('../models/SubCategory');
const Category = require('./Category');


const createSubCategory = async (subCategoryName, categoryName) => {
    const categoryId = await Category.getCategoryId(categoryName);
    if (categoryId == null) return 'notFound';
    else if ((await getSubCategory(subCategoryName, categoryName)).length > 0) return 'subCatExists';
    else return await SubCategorySchema.create({ subCategoryName: subCategoryName, categoryId: categoryId });
};

const getSubCategory = async (subCategoryName, categoryName) => {
    try {
        const categoryId = await Category.getCategoryId(categoryName);
        console.log(categoryId);
        if (categoryId == null) return 'notFound';
        return await SubCategorySchema.find({ subCategoryName: subCategoryName, categoryId: categoryId }).exec();
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

const getAllSubCategorybyCat = async (categoryName) => {
    try {
        const subCategoryList = [];
        const categoryId = await Category.getCategoryId(categoryName);
        (await SubCategorySchema.find({ categoryId: categoryId }).exec()).forEach(element => {
            subCategoryList.push(element.subCategoryName);
            console.log(`${element.subCategoryName} pushed`);
        });
        console.log(`get All: ${subCategoryList}`);
        return subCategoryList;
    } catch (error){
        return error;
    } 
};

// const createSubCategory = async (subCategoryName, categoryName, trxName) => {
//     const categoryId =  await Category.getCategory(categoryName, trxName)[0].categoryId;
//     if (categoryId == null) return "catNotFound";
//     else if ((await getSubCategory(subCategoryName, categoryName)).length > 0) return "subCatNotFound";
//     else return await SubCategorySchema.create({ subCategoryName: subCategoryName, categoryName: categoryName }).exec();
// };

// const getSubCategory = async (subCategoryName, categoryName, trxName) => {
//     try {
//         const categoryId = await Category.getCategoryId(categoryName, trxName);
//         if (categoryId === null) return "catNotFound";
//         return await SubCategorySchema.find({ subCategoryName: subCategoryName, categoryId: categoryId }).exec();
//     } catch (error) {
//         return error;
//     }
// };

// const getSubCategoryId = async (subCategoryName, categoryName, trxName) => {
//     try {
//         const subCategoryId = [];
//         (await getSubCategory(subCategoryName, categoryName, trxName)).forEach(element =>{
//             subCategoryId.push(element.id);
//         });
//         return subCategoryId[0]; 
//     } catch (error) {
//         return error;
//     }
// };

// const getAllSubCategorybyCat = async (categoryName, trxName) => {
//     try {
//         const subCategoryList = [];
//         (await SubCategorySchema.find().exec()).forEach(element => {
//             subCategoryList.push(element.subCategoryName);
//         });
//         return subCategoryList;
//     } catch (error){
//         return error;
//     } 
// };

const setSubCategory = async (oldSubCategoryName, newSubCategoryName, categoryName) => {
    return await SubCategorySchema.findOneAndUpdate({subCategoryName: oldSubCategoryName, categoryName: categoryName}, newSubCategoryName, {
      upsert: true,
    }).exec();
};

const deleteSubCategory = async (subCategoryName, categoryName) => {
    return await SubCategorySchema.findOneAndDelete({ subCategoryName: subCategoryName, categoryName: categoryName }).exec(); // returns {deletedCount: 1}
};
module.exports = {createSubCategory,
    getSubCategory,
    getSubCategoryId,
    getAllSubCategorybyCat,
    setSubCategory,
    deleteSubCategory
}