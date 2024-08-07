const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const clientsData = [
      {
        login: 'Пётр Первый',
        password: await bcrypt.hash('123', 10),
        name: 'Петя',
        email: 'petya@mail.ru',
        tele: '@petya',
        phone: '89213397103',
        image: '/petya.jpg',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'auto' }),
        user_id: undefined,
        about: 'Ссыт в раковину !',
      },
      {
        login: 'Василёк',
        password: '',
        name: '',
        email: '',
        tele: '',
        phone: '89213397103',
        image: '',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'handle' }),
        user_id: 1,
        about: '',
      },
      {
        login: 'Катя',
        password: '',
        name: '',
        email: 'katya@mail.ru',
        tele: '',
        phone: '',
        image: '',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'handle' }),
        user_id: 2,
        about: '',
      },
    ];
    const clients = clientsData.map((client) => ({
      ...client,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Clients', clients);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Clients');
  },
};
