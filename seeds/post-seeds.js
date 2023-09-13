const { Post } = require('../models');

const postData = [
    {
        title: 'Validators',
        entry: 'Model validators are essential components in data validation, ensuring that data meets specified criteria before being saved to a database. They enable format, content, and integrity checks, preventing erroneous or inconsistent data entries. Model validators play a pivotal role in maintaining data quality and adherence to defined standards.',
        user_id: 1
      },
      {
        title: 'Allowing/disallowing null values',
        entry: 'Allowing null values in a database field permits the absence of data, accommodating optional or unknown information. In contrast, disallowing null values enforces the presence of valid data, enhancing data integrity and accuracy. Careful consideration of nullability is vital for effective database design and data management.',
        user_id: 2
      },
      {
        title: 'Comedy in a tech world',
        entry: "Tech and comedy form an unlikely yet engaging blend, with humor often stemming from the quirks and mishaps of technology. Tech comedians find amusement in software bugs, gadgets' idiosyncrasies, and digital absurdities, providing a lighthearted lens through which to explore our ever-evolving digital world.",
        user_id: 3
      },
      {
        title: 'Exploring the Role of Technology in the Comics',
        entry: "Technology plays a crucial role in Superman comic books, showcasing futuristic devices, supercomputers, and alien technology. Superman's Fortress of Solitude, equipped with advanced Kryptonian tech, aids him in research and solitude. The comics explore the ethical dilemmas and societal impacts of superhuman abilities in a tech-driven world.     ",
        user_id: 4
      }


];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;