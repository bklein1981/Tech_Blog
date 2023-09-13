const { Comment } = require('../models');

const commentData = [
    {
        entry: "I personally don't use Model validators. It isn't because I don't know how to use them, rather I just don't believe in them.",
        post_id: 1,
        user_id: 2
    },
    {
        entry: 'Null values offer flexibility for optional data, while non-nullable fields ensure data integrity. Striking the right balance is essential in sound database design.',
        post_id: 2,
        user_id: 4
    },
    {
        entry: 'Tech and comedy harmonize naturally, blending technological quirks for endless humor',
        post_id: 3,
        user_id: 1
    },
    {
        entry: 'I am not a fan of D.C. comics',
        post_id: 4,
        user_id: 3
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments