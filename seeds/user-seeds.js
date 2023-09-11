const { User } = require('../models');

const userData = [
    {
        user_name: 'krussell',
        password: 'password'
    },
    {
        user_name: 'hford',
        password: 'password'
    }
];

const seedUsers = async () => {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });
};

module.exports = seedUsers