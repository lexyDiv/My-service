/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const lcommentsData = [
      {
        user_id: 1,
        location_id: 1,
        date: new Date(),
        value: 'Потому и не кусают.',
      },
      {
        user_id: 3,
        location_id: 1,
        date: new Date(),
        value: 'А меня покусали !!!',
      },
    ];
    const lcomments = lcommentsData.map((lcomment) => ({
      ...lcomment,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('LComments', lcomments);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('LComments');
  },
};
