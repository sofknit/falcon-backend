'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },

        email: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
            isEmail: true,
            allowNull: false
          }
        },

        password: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('users')
  }
};
