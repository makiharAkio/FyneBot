const VenueModel = require('../models/Venue');
const SubCategoryModel = require('./SubCategory');

const createVenue = async (venueName, subCategoryName) => {
    const subCategoryId = await SubCategoryModel.getSubCategoryId(subCategoryName);
    if (subCategoryId == null) return 'notFound';
    else if ((await getVenue(venueName, subCategoryName)).length > 0) return 'exists';
    else return await VenueModel.create({ venueName: venueName, subCategoryId: subCategoryId });
};

const getVenue = async (venueName, subCategoryName) => {
    try {
        const subCategoryId = await SubCategoryModel.getSubCategoryId(subCategoryName);
        console.log("subCategoryId " + subCategoryId);
        if (subCategoryId == null) return 'notFound';
        return await VenueModel.find({ venueName: venueName, subCategoryId: subCategoryId }).exec();
    } catch (error) {
        return error;
    }
};

const getVenueId = async (venueName, subCategoryName) => {
    try {
        const venueId = [];
        (await getVenue(venueName, subCategoryName)).forEach(element =>{
            venueId.push(element.id);
        });
        return venueId[0]; 
    } catch (error) {
        return error;
    }
};

const getAllVenue = async () => {
    try {
        const venueList = [];
        (await VenueModel.find().exec()).forEach(element => {
            venueList.push(element.venueName);
        });
        console.log(`get All: ${venueList}`);
        return venueList;
    } catch (error){
        return error;
    } 
};

const getAllVenuebySubCat = async (subCategoryName) => {
    try {
        const venueList = [];
        const subCategoryId = await SubCategoryModel.getSubCategoryId(subCategoryName);
        (await VenueModel.find({ subCategoryId: subCategoryId }).exec()).forEach(element => {
            venueList.push(element.venueName);
            console.log(`${element.venueName} pushed`);
        });
        console.log(`getAllVenuebySubCat: ${venueList}`);
        return venueList;
    } catch (error){
        return error;
    } 
};

const setVenue = async (oldVenueName, newVenueName, subCategoryName) => {
    return await VenueModel.findOneAndUpdate({venueName: oldVenueName, subCategoryName: subCategoryName}, newVenueName, {
      upsert: true,
    }).exec();
};

const deleteVenue = async (venueName, subCategoryName) => {
    return await VenueModel.findOneAndDelete({ venueName: venueName, subCategoryName: subCategoryName }).exec(); // returns {deletedCount: 1}
};
module.exports = {createVenue,
    getVenue,
    getVenueId,
    getAllVenue,
    getAllVenuebySubCat,
    setVenue,
    deleteVenue
}