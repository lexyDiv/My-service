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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      house_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Houses',
          key: 'id',
        },
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
      },
      date: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      data: {
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
      days: {
        type: Sequelize.TEXT,
      },
      value: {
        type: Sequelize.TEXT,
      },
      value2: {
        type: Sequelize.TEXT,
      },
      check: {
        type: Sequelize.BOOLEAN,
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
