const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');

const BoardObjective = db.define('boardObjective', {
  xpos: {
    type: Sequelize.INTEGER, //we will avoid floats by calling "1.5" to be "15" in the database
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ypos: {
    type: Sequelize.INTEGER, //we will avoid floats by calling "1.5" to be "15" in the database
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zpos: {
    type: Sequelize.INTEGER, //we will avoid floats by calling "1.5" to be "15" in the database
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('onClick', 'onCollision', 'onSwipe'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  collected: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

BoardObjective.loadBoard = async function(board) {
  try {
    let playgroundBoard = {
      name: board.name,
      totem: board.totem,
      objectives: []
    };
    const objectivesInBoard = await BoardObjective.findAll({
      //coords, type, itemId
      where: {
        boardId: board.id
      }
    });

    for (let i = 0; i < objectivesInBoard.length; i++) {
      //id, name, source, resources
      const item = await Item.findByPk(objectivesInBoard[i].itemId);
      let instance = {
        name: item.name,
        source: item.source,
        resources: item.resources,
        ...objectivesInBoard[i].dataValues
      };
      playgroundBoard.objectives.push(instance);
    }
    return playgroundBoard;
  } catch (error) {
    console.error(error);
  }
};

module.exports = BoardObjective;
