const CategorySchema = require('../models/Category');

const createCategory = async (categoryName) => {
    if ((await getCategory(categoryName)).length > 0) return 'exists';
    else return await CategorySchema.create({ categoryName: categoryName });
};

const getCategory = async (categoryName) => {
    try {
        return await CategorySchema.find({ categoryName: categoryName }).exec();
    } catch (error) {
        return error;
    }
};

const getCategoryId = async (categoryName) => {
    try {
        const categoryId = [];
        (await getCategory(categoryName)).forEach(element =>{
            categoryId.push(element.id);
        });
        return categoryId[0]; 
    } catch (error) {
        return error;
    }
};

const getAllCategory = async () => {
    try {
        const categoryList = [];
        (await CategorySchema.find().exec()).forEach(element => {
            categoryList.push(element.categoryName);
        });
        console.log(`get All: ${categoryList}`);
        return categoryList;
    } catch (error){
        return error;
    } 
};

const setCategory = async (oldCategoryName, newCategoryName) => {
    return await CategorySchema.findOneAndUpdate({categoryName: oldCategoryName}, newCategoryName, {
      upsert: true,
    }).exec();
};

const deleteCategory = async (categoryName) => {
    return await CategorySchema.findOneAndDelete({ categoryName: categoryName }).exec(); // returns {deletedCount: 1}
};

// const createCategory = async (categoryName, trxName) => {
//     if ((await getCategory(categoryName, trxName)).length > 0) return "catNotFound";
//     else return await CategorySchema.create({ categoryName: categoryName, trxName: trxName }).exec();
// };

// const getCategory = async (categoryName, trxName) => {
//     try {
//         return await CategorySchema.find({ categoryName: categoryName, trxName: trxName }).exec();
//     } catch (error) {
//         return error;
//     }
// };

// const getCategoryId = async (categoryName, trxName) => {
//     try {
//         const categoryId = [];
//         (await getCategory(categoryName, trxName)).forEach(element =>{
//             categoryId.push(element.id);
//         });
//         return categoryId[0]; 
//     } catch (error) {
//         return error;
//     }
// };

// const getAllCategoryByTrx = async (trxName) => {
//     try {
//         const categoryList = [];
//         (await CategorySchema.find({ trxName: trxName }).exec()).forEach(element => {
//             categoryList.push(element.categoryName);
//         });
//         return categoryList;
//     } catch (error){
//         return error;
//     } 
// };

// const setCategory = async (oldCategoryName, newCategoryName, trxName) => {
//     return await CategorySchema.findOneAndUpdate({categoryName: oldCategoryName, trxName: trxName}, newCategoryName, {
//       upsert: true,
//     }).exec();
// };

// const deleteCategory = async (categoryName, trxName) => {
//     return await CategorySchema.findOneAndDelete({ categoryName: categoryName, trxName: trxName }).exec(); // returns {deletedCount: 1}
// };

module.exports = {createCategory,
    getCategory,
    getCategoryId,
    getAllCategory,
    setCategory,
    deleteCategory
}