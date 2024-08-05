/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      house_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Houses',
          key: 'id',
        },
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
      },
      data: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.TEXT,
      },
      value: {
        type: Sequelize.TEXT,
      },

      startTime: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      endTime: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      type: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.TEXT,
      },
      days: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Applications');
  },
};
