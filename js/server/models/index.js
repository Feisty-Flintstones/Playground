const Objectives = require('./objectives')
const Objects = require('./objects')
const Maps = require('./maps')
const MapObjectives = require('./mapObjectives')

//ASSOCIATIONS
Objectives.belongsToMany(Maps, {
    through: MapObjectives
})
Maps.belongsToMany(Objectives, {
    through: MapObjectives
})

module.exports = {
    Objectives,
    Objects,
    Maps,
    MapObjectives
}