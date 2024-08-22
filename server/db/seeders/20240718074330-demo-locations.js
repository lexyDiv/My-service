/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const locationsData = [
      {
        name: 'Простоквашино',
        address: 'Простоквашенский район',
        description: 'Райское место',
        image: '/2p_sboku_new2_pechkin_1000_66e.jpg',
        images: JSON.stringify([
          '/2p_sboku_new2_pechkin_1000_66e.jpg',
        ]),
        status: 'complite',
        type: 'Хрен знает',
        data: '',
      },
      {
        name: 'На кожанный мешков!',
        address: 'Мешок',
        description: 'Заезжай и живи !',
        image: '/1080.jpg',
        images: JSON.stringify([
          '/scale_1200.jpeg',
        ]),
        status: 'buil',
        type: 'Крупный город',
        data: '',
      },
    ];
    const locations = locationsData.map((location) => ({
      ...location,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Locations', locations);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Locations');
  },
};
