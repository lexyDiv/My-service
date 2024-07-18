/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hcomment2Data = [
      {
        house_id: 2,
        user_id: 2,
        date: new Date(),
        value: 'Чтоб я так жил ! https://cdn.bfm.ru/news/maindocumentphoto/2018/01/04/bukhlo.jpg',
      },
    ];
    const hcomment2s = hcomment2Data.map((hcomment) => ({
      ...hcomment,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Hcomment2s', hcomment2s);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Hcomment2s');
  },
};
