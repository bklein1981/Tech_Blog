const { Post } = require('../models');

const postData = [
    {
        title: 'Validators',
        entry: 'Model validators allow you to specify format/content/inheritance validations for each attribute of the model. Validations are automatically run on create, update and save. You can also call validate() to manually validate an instance.',
        user_id: 1
      },
      {
        title: 'Allowing/disallowing null values',
        entry: 'By default, null is an allowed value for every column of a model. This can be disabled setting the allowNull: false option for a column, as it was done in the username field from our code example.',
        user_id: 2
      }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;