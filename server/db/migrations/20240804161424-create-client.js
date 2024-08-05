/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        type: Sequelize.TEXT,
      },
      password: {
        type: Sequelize.TEXT,
      },
      name: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      tele: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.TEXT,
      },
      data: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
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
    await queryInterface.dropTable('Clients');
  },
};
