'use strict';
const bcrypt = require("bcryptjs");

const { Spot, User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll();
    // console.log(users);
    const userIdMap = {};
    for (let user of users) {
      userIdMap[user.firstName] = user.id;
    }
    // console.log(userIdMap);
    // { John: 1, Carrie: 2, Dirk: 3 }

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: userIdMap.John,
        address: '126 Beach Rd',
        city: 'Coral',
        state: 'Virginia',
        country: 'United States of America',
        lat: 78.5840543,
        lng: 83.6932054,
        name: 'Rocks Landing',
        description:'Rocky beach with lake view',
        price: 240.0
      },
      {
        ownerId: userIdMap['Carrie'],
        address: '133 Homp Dr',
        city: 'Destin',
        state: 'Florida',
        country: 'United States of America',
        lat: 90.5864543,
        lng: 49.6932674,
        name: 'Pearl overlook',
        description:'Come live on the coast and see the pearls',
        price: 290
      },
      {
        ownerId: userIdMap['Dirk'],
        address: '195 Twin Lakes Rd',
        city: 'Newton',
        state: 'Alaska',
        country: 'United States of America',
        lat: 99.7214543,
        lng: 73.8872674,
        name: 'Black Bear Cove',
        description:'A bear lovers dream in the Alaskan wilderness',
        price: 310
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    const spots = await Spot.findAll();
    const spotIds = spots.map(spot => spot.id); // array of ids

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: spotIds }
    }, {});
  }
};
