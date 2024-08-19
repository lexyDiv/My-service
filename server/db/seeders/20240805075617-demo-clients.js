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
        name: 'Вася',
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
        name: 'Катя',
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
        name: 'Котэ под наркотэ',
        email: '',
        tele: '',
        phone: '89213397105',
        image: '/kote.jpg',
        date: String(new Date().getTime()),
        data: JSON.stringify({ created: 'auto' }),
        user_id: 1,
        about: 'A cactus (pl.: cacti, cactuses, or less commonly, cactus)[3] is a member of the plant family Cactaceae (/kækˈteɪsi.iː, -ˌaɪ/),[a] a family comprising about 127 genera with some 1,750 known species of the order Caryophyllales.[4] The word cactus derives, through Latin, from the Ancient Greek word κάκτος (káktos), a name originally used by Theophrastus for a spiny plant whose identity is now not certain.[5] Cacti occur in a wide range of shapes and sizes. They are native to the Americas, ranging from Patagonia in the south to parts of western Canada in the north, with the exception of Rhipsalis baccifera, which is also found in Africa and Sri Lanka. Cacti are adapted to live in very dry environments, including the Atacama Desert, one of the driest places on Earth. Because of this, cacti show many adaptations to conserve water. For example, almost all cacti are succulents, meaning they have thickened, fleshy parts adapted to store water. Unlike many other succulents, the stem is the only part of most cacti where this vital process takes place. Most species of cacti have lost true leaves, retaining only spines, which are highly modified leaves. As well as defending against herbivores, spines help prevent water loss by reducing air flow close to the cactus and providing some shade. In the absence of true leaves, cacti\'s enlarged stems carry out photosynthesis.\'',
        ban: false,
        regDate: String(new Date().getTime()),
      },
      {
        login: 'Козлятинка',
        password: '',
        name: 'Козлятинка',
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
