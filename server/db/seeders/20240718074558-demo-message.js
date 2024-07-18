/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const messagesData = [
      {
        user_id: 1,
        date: new Date(),
        value: 'Здорово, холопы, сюда писать только по делу ! https://static.mk.ru/upload/entities/2023/01/20/10/articles/detailPicture/d6/9a/76/05/2260888d548a96d9cf647c7f8788b794.jpg',
      },
    ];
    const messages = messagesData.map((message) => ({
      ...message,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Messages', messages);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Messages');
  },
};
