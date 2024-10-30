module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comments', [
    // Insert seeding data here if needed, but currently no dummy data is inserted
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {})
};
