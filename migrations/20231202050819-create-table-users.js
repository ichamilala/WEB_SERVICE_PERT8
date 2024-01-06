'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async  (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      profession: {
        type: sequelize.STRING,
        allowNUll: true,
      },
      role: {
        type: sequelize.ENUM,
        values: ['admin','operator'],
        defaultValue: 'operator',
        allowNUll: false,
      },
      email: {
        tupe: sequelize.STRING,
        allowNUll: true,
      },
      pass: {
        type: sequelize.STRING,
        allowNUll: true,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNUll: "false",
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        allowNUll: "false",
      },
    });

    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['email'],
      name: 'UNIQUE_USERS_EMAIL'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
