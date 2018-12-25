'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('shortners', 
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },

        nick_name: {
          allowNull: false,
          type: Sequelize.TEXT
        },

        is_fav: {
          allowNull: false,
          type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable ('services')
  }
};
