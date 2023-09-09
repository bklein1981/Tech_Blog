const router = require('express').Router();
const { Post, User } = require('../models');
//const authUser = require('../utils/auth');

//homePage Get
router.get('/', async (req, res) => {
    try {
console.log("homepage GET route is working");
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(postData);
        res.render('homepage', {
            posts,
            //logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
try {
    console.log("dashboard GET route is working")

    res.render('dashboard', {
        // ...user,
        // logged_in: true
      });

} catch (err) {

}
});

router.get('/login', (req, res) => {
    console.log("login GET route is working")
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    console.log("signup GET route is working")
    // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('signup');
  });

module.exports = router