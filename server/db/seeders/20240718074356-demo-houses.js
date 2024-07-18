/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const housesData = [
      {
        location_id: 1,
        address: 'Простоквашенский район, ул. Сметанная дом 44',
        name: 'Вигвам',
        image: '/Wigwam_Indigenous_peoples.JPG',
        images: JSON.stringify([
          '/1538709_4152390.jpg',
          '/Apache_Wickiup,_Edward_Curtis,_1903.jpg',
        ]),
        status: 'complite',
      },
      {
        location_id: 1,
        address: 'Простоквашенский район, ул. Сметанная дом 45',
        name: 'Вигвам - 2',
        image: '/250px-PenobscotBarkWigwamIn_AcadiaPark.jpeg',
        images: JSON.stringify([
          '/6cdbe3f52f22f3da3044c19b59bb2dd9.jpg',
          '/Ojibwa_wigwam.jpg',
        ]),
        status: 'complite',
      },
      {
        location_id: 1,
        address: 'Простоквашенский район, ул. Сметанная дом 46',
        name: 'Вигвам - 3',
        image: '/162515f2bc9e48ff3cb5f04bee9b0c30.jpg',
        images: JSON.stringify([
          '/299826253.jpg',
          '/Easy-Camp-Tipi-Tent.jpg',
        ]),
        status: 'complite',
      },
      {
        location_id: 1,
        address: 'Простоквашенский район, ул. Сметанная дом 47',
        name: 'Вигвам - 4',
        image: '/aff13aaed70d4ad589f5e39ec6wh--dlya-doma-i-interera-vigvam-makrame-shalash-makrame-rekvizit-.jpg',
        images: JSON.stringify([
          '/300x400.webp',
          '/scale_1200 (1).jpeg',
        ]),
        status: 'complite',
      },
    ];
    const houses = housesData.map((house) => ({
      ...house,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Houses', houses);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Houses');
  },
};
