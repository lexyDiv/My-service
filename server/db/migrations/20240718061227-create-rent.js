/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      house_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Houses',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      date: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      update_date: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      client_id: {
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.TEXT,
      },
      check: {
        type: Sequelize.BOOLEAN,
      },
      checkInfo: {
        type: Sequelize.TEXT,
      },
      checkSumm: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Rents');
  },
};
