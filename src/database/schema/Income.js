const IncomeModel = require('../models/Income');
const SourceModel = require('./Source');

const createIncome = async (incomeDate, incomeAmmount, sourceName, incomeComment = '') => {
    const sourceId = await SourceModel.getSourceId(sourceName);
    if (sourceId == null) return 'notFound';
    else return await IncomeModel.create({ 
        incomeDate: incomeDate, 
        incomeAmmount: incomeAmmount, 
        incomeComment: incomeComment, 
        sourceId: sourceId 
    });
};

const getIncome = async (incomeDate, incomeAmmount, sourceName, incomeComment = '') => {
    try {
        const sourceId = await SourceModel.getSourceId(sourceName);
        console.log("sourceId " + sourceId);
        if (sourceId == null) return 'notFound';
        return await IncomeModel.find({ 
            incomeDate: incomeDate, 
            incomeAmmount: incomeAmmount, 
            incomeComment: incomeComment, 
            sourceId: sourceId 
        }).exec();
    } catch (error) {
        return error;
    }
};

const getAllIncome = async () => {
    try {
        const incomeList = [];
        (await IncomeModel.find().exec()).forEach(element => {
            incomeList.push(element);
        });
        console.log(`get All: ${incomeList}`);
        return incomeList;
    } catch (error){
        return error;
    } 
};

const getAllIncomebySource = async (sourceName) => {
    try {
        const incomeList = [];
        const sourceId = await SourceModel.getSourceId(sourceName);
        (await IncomeModel.find({ sourceId: sourceId }).exec()).forEach(element => {
            incomeList.push(element);
            console.log(`${element} pushed`);
        });
        console.log(`getAllIncomebySource: ${incomeList}`);
        return incomeList;
    } catch (error){
        return error;
    } 
};

const getAllIncomebyDate = async (incomeDate) => {
    try {
        const incomeList = [];
        (await IncomeModel.find({ incomeDate: incomeDate }).exec()).forEach(element => {
            incomeList.push(element);
            console.log(`${element} pushed`);
        });
        console.log(`getAllIncomebyDate: ${incomeList}`);
        return incomeList;
    } catch (error){
        return error;
    } 
};

const setIncome = async (oldIncomeName, newIncomeName, sourceName) => {
    return await IncomeModel.findOneAndUpdate({
        incomeDate: oldIncomeName, 
        sourceName: sourceName
    }, newIncomeName, {
      upsert: true,
    }).exec();
};

const deleteIncome = async (incomeDate, sourceName) => {
    return await IncomeModel.findOneAndDelete({ incomeDate: incomeDate, sourceName: sourceName }).exec(); // returns {deletedCount: 1}
};
module.exports = {createIncome,
    getIncome,
    getAllIncome,
    getAllIncomebySource,
    getAllIncomebyDate,
    setIncome,
    deleteIncome
}