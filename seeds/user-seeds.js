const { User } = require('../models');

const userData = [
    {
        user_name: 'krussell',
        password: '123_passWord'
    },
    {
        user_name: 'hford',
        password: '123_passWord'
    }
];

const seedUsers = async () => {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });
};

module.exports = seedUsers