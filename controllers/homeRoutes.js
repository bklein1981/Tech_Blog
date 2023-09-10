const router = require('express').Router();
const { Post, User } = require('../models');
//const authUser = require('../utils/auth');

//homePage Get route to display homepage
router.get('/', async (req, res) => {
  console.log("homepage GET request received");
    try {

        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Dashboard GET route to display dashboard
router.get('/dashboard', async (req, res) => {
try {
    console.log("dashboard GET request received")

    res.render('dashboard', {
        //...user,
        logged_in: true
      });

} catch (err) {

}
});

//login GET route to display login page
router.get('/login', (req, res) => {
    console.log("login GET request received")
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }

    res.render('login');
  });

  //Signup GET route to display signin page
  router.get('/signup', (req, res) => {
    console.log("signup GET request received")
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render('signup');
  });

 


module.exports = router