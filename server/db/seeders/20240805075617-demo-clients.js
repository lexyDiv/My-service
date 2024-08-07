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
        ban: false,
        regDate: String(new Date().getTime()),
      },
      {
        login: 'Василёк',
        password: '',
        name: '',
        email: '',
        tele: '',
        phone: '89213397104',
        image: '',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'handle' }),
        user_id: 1,
        about: '',
        ban: false,
        regDate: null,
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
        ban: false,
        regDate: null,
      },
      {
        login: 'Котэ под наркотэ',
        password: await bcrypt.hash('123', 10),
        name: '',
        email: '',
        tele: '',
        phone: '89213397105',
        image: '/kote.jpg',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'auto' }),
        user_id: 1,
        about: '',
        ban: false,
        regDate: String(new Date().getTime()),
      },
      {
        login: 'Козлятинка',
        password: '',
        name: '',
        email: 'kozlina@mail.su',
        tele: '',
        phone: '89213397106',
        image: '',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'handle' }),
        user_id: 1,
        about: 'Просто козёл !',
        ban: false,
        regDate: null,
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
