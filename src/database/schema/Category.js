const CategoryModel = require('../models/Category');

const createCategory = async (categoryName) => {
    if ((await getCategory(categoryName)).length > 0) return 'exists';
    else return await CategoryModel.create({ categoryName: categoryName });
};

const getCategory = async (categoryName) => {
    try {
        return await CategoryModel.find({ categoryName: categoryName }).exec();
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
        (await CategoryModel.find().exec()).forEach(element => {
            categoryList.push(element.categoryName);
        });
        console.log(`get All: ${categoryList}`);
        return categoryList;
    } catch (error){
        return error;
    } 
};

const setCategory = async (oldCategoryName, newCategoryName) => {
    return await CategoryModel.findOneAndUpdate({categoryName: oldCategoryName}, newCategoryName, {
      upsert: true,
    }).exec();
};

const deleteCategory = async (categoryName) => {
    return await CategoryModel.findOneAndDelete({ categoryName: categoryName }).exec(); // returns {deletedCount: 1}
};

module.exports = {createCategory,
    getCategory,
    getCategoryId,
    getAllCategory,
    setCategory,
    deleteCategory
}