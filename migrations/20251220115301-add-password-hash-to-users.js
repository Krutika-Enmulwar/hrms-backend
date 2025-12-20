'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
 
    await queryInterface.addColumn('users', 'password_hash', {
      type: Sequelize.STRING(200),
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE users
      SET password_hash = 'TEMP_PASSWORD'
      WHERE password_hash IS NULL
    `);

    await queryInterface.changeColumn('users', 'password_hash', {
      type: Sequelize.STRING(200),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password_hash');
  },
};
