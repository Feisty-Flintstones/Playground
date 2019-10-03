const Objectives = require('./objectives')
const Maps = require('./maps')

//ASSOCIATIONS
Objectives.belongsToMany(Maps)
Maps.hasMany(Objectives)

module.exports = {
    Objectives,
    Maps
}