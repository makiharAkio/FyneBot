const AutoRole = require('../models/AutoRole');

module.exports = async (client) => {
    // console.log(await AutoRole.find().select('roleId'));
    await AutoRole.find()
    .then((roles) => {
        roles.map((role) => console.log(role['roleId']))
    })
};