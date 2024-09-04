/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      video: {
        type: Sequelize.TEXT,
      },
      video2: {
        type: Sequelize.TEXT,
      },
      video3: {
        type: Sequelize.TEXT,
      },
      video4: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
      image2: {
        type: Sequelize.TEXT,
      },
      image3: {
        type: Sequelize.TEXT,
      },
      image4: {
        type: Sequelize.TEXT,
      },
      value: {
        type: Sequelize.TEXT,
      },
      value2: {
        type: Sequelize.TEXT,
      },
      value3: {
        type: Sequelize.TEXT,
      },
      value4: {
        type: Sequelize.TEXT,
      },
      data: {
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
    await queryInterface.dropTable('Mains');
  },
};
