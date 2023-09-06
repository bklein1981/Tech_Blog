const { Comment } = require('../models');

const commentData = [
    {
        entry: 'That is an astute observation.',
        post_id: 1,
        user_id: 2
    },
    {
        entry: 'Thank you for sharing.',
        post_id: 2,
        user_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments