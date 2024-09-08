/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const locationsData = [
      {
        name: 'Простоквашино',
        address: 'Простоквашенский район',
        description: 'Райское место',
        image: '/076cf7dd0ba0087ac4d21697283517_balthazar-club-p-ekspozitsiya-priroda-krasivo-2.jpg',
        images: JSON.stringify([
          '/c27a9f6c6985401a16f5sun.jpg',
          '339fec49d9645982e410gas-kvas-com-p-oboi-solnechnii-dom-1.jpg',
        ]),
        status: 'complite',
        type: 'Хрен знает',
        data: '',
        inTime: '14:00',
        outTime: '12:00',
      },
      {
        name: 'На кожанный мешков!',
        address: 'Мешок',
        description: 'Заезжай и живи !',
        image: '',
        images: JSON.stringify([

        ]),
        status: 'buil',
        type: 'Крупный город',
        data: '',
        inTime: '15:00',
        outTime: '13:00',
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
