'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('urls',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },

        longUrl: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        shortUrl: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        barcode: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        thumbnailImage: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        shortnerId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'shortners',
            key: 'id'
          }
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
    return queryInterface.dropTable ('urls')
  }
};
