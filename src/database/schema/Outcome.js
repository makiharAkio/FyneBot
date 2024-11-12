const OutcomeModel = require('../models/Outcome');
const VenueModel = require('./Venue');

const createOutcome = async (outcomeDate, outcomeAmmount, venueName, outcomeComment = '') => {
    const venueId = await VenueModel.getVenueId(venueName);
    if (venueId == null) return 'notFound';
    else return await OutcomeModel.create({ 
        outcomeDate: outcomeDate, 
        outcomeAmmount: outcomeAmmount, 
        outcomeComment: outcomeComment, 
        venueId: venueId 
    });
};

const getOutcome = async (outcomeDate, outcomeAmmount, venueName, outcomeComment = '') => {
    try {
        const venueId = await VenueModel.getVenueId(venueName);
        console.log("venueId " + venueId);
        if (venueId == null) return 'notFound';
        return await OutcomeModel.find({ 
            outcomeDate: outcomeDate, 
            outcomeAmmount: outcomeAmmount, 
            outcomeComment: outcomeComment, 
            venueId: venueId 
        }).exec();
    } catch (error) {
        return error;
    }
};

const getAllOutcome = async () => {
    try {
        const outcomeList = [];
        (await OutcomeModel.find().exec()).forEach(element => {
            outcomeList.push(element);
        });
        console.log(`get All: ${outcomeList}`);
        return outcomeList;
    } catch (error){
        return error;
    } 
};

const getAllOutcomebyVenue = async (venueName) => {
    try {
        const outcomeList = [];
        const venueId = await VenueModel.getVenueId(venueName);
        (await OutcomeModel.find({ venueId: venueId }).exec()).forEach(element => {
            outcomeList.push(element);
            console.log(`${element} pushed`);
        });
        console.log(`getAllOutcomebyVenue: ${outcomeList}`);
        return outcomeList;
    } catch (error){
        return error;
    } 
};

const getAllOutcomebyDate = async (outcomeDate) => {
    try {
        const outcomeList = [];
        (await OutcomeModel.find({ outcomeDate: outcomeDate }).exec()).forEach(element => {
            outcomeList.push(element);
            console.log(`${element} pushed`);
        });
        console.log(`getAllOutcomebyDate: ${outcomeList}`);
        return outcomeList;
    } catch (error){
        return error;
    } 
};

const setOutcome = async (oldOutcomeName, newOutcomeName, venueName) => {
    return await OutcomeModel.findOneAndUpdate({
        outcomeDate: oldOutcomeName, 
        venueName: venueName
    }, newOutcomeName, {
      upsert: true,
    }).exec();
};

const deleteOutcome = async (outcomeDate, venueName) => {
    return await OutcomeModel.findOneAndDelete({ outcomeDate: outcomeDate, venueName: venueName }).exec(); // returns {deletedCount: 1}
};
module.exports = {createOutcome,
    getOutcome,
    getAllOutcome,
    getAllOutcomebyVenue,
    getAllOutcomebyDate,
    setOutcome,
    deleteOutcome
}