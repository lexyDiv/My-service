const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const usersData = [
      {
        name: 'Boss',
        password: await bcrypt.hash('123', 10),
        level: 3,
        email: 'bossNE@mail.ru',
        image: '/Pablo_Escobar_Mug_(cropped).jpg',
        admin: true,
      },
      {
        name: 'Helper',
        password: await bcrypt.hash('123', 10),
        level: 2,
        email: 'helperNE@mail.ru',
        image: '/OR.jpeg',
        admin: false,
      },
      {
        name: 'Loh',
        password: await bcrypt.hash('123', 10),
        level: 1,
        email: 'loh@mail.ru',
        image: '/756682696279012.jpg',
        admin: false,
      },
    ];
    const users = usersData.map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
