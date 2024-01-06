'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("refresh_tokens",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      token: {
        type: Sequelize.text,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_At: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal ("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      update_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal ("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        allowNull: true,
      }
    });

    await queryInterface.addConstraint ('refresh_tokens', {
      type: 'foreign key',
      name: 'REFRESH_TOKEN_USERS_ID',
      fields: ['user_id'],
      reference: {
        table: 'users',
        fields: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("refresh_tokens");
  },
};
