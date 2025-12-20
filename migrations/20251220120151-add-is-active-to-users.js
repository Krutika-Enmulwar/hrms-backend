'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add column as nullable
    await queryInterface.addColumn('users', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    });

    // 2. Backfill existing rows
    await queryInterface.sequelize.query(`
      UPDATE users
      SET is_active = true
      WHERE is_active IS NULL
    `);

    // 3. Enforce NOT NULL
    await queryInterface.changeColumn('users', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'is_active');
  },
};

