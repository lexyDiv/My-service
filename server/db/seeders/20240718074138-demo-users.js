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
        image: '/749dec9d04a9dcfe1c47Pablo_Escobar_Mug_(cropped).jpg',
        admin: true,
        phone: '89115557733',
        tele: '@boss',
        net: '',
      },
      {
        name: 'Helper',
        password: await bcrypt.hash('123', 10),
        level: 2,
        email: 'helperNE@mail.ru',
        image: '/c57f5d327f8295ee7716OR.jpeg',
        admin: false,
        phone: '89811231456',
        tele: '@helper',
        net: '',
      },
      {
        name: 'Loh',
        password: await bcrypt.hash('123', 10),
        level: 1,
        email: 'loh@mail.ru',
        image: '/756682696279012.jpg',
        admin: false,
        phone: '',
        tele: '@loh',
        net: '',
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
