'use strict';

const { Spot, User, Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const spots = await Spot.findAll();
    const spotIdMap = {};

    for (let spot of spots) {
      spotIdMap[spot.name] = spot.id;
    }

    const users = await User.findAll();
    const userIdMap = {};

    for (let user of users) {
      userIdMap[user.firstName] = user.id;
    }

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: spotIdMap['Pearl overlook'],
        userId: userIdMap.Adam,
        review: 'Great place! Had a lot of fun. Wonderful memories. I stayed here with my extended family, and we had a blast!',
        stars: 4
      },
      {
        spotId: spotIdMap['Beaver Island Cove'],
        userId: userIdMap.Adam,
        review: 'So much fun. Brought my wife and kids. We all had fun. Would recommend this place to anyone who likes the outdoors!',
        stars: 5
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        userId: userIdMap.Carrie,
        review: 'Too many bugs! Hated the decor. Do not recommend.',
        stars: 1
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        userId: userIdMap.Carrie,
        review: 'Came back a second time, and had more fun. I brought a few friends with me this time, and there were less bugs.',
        stars: 4
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        userId: userIdMap.Dirk,
        review: 'My family and I had a great time, but got stuck with bad weather unfortunately. Still made some good memories.',
        stars: 3
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        userId: userIdMap.John,
        review: 'Such an incredible place to take a quick vacation. Would recommend to anyone!',
        stars: 5
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        userId: userIdMap.Adam,
        review: 'Not only was this place beautiful and spacious inside, we spent most time outside by the lake. So many things to do.',
        stars: 4
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;

    const reviews = await Review.findAll();
    const reviewIds = reviews.map(review => review.id); // array of ids

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: reviewIds }
    }, {});
  }
};
