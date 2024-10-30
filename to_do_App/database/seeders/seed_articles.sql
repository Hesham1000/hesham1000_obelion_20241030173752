module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
