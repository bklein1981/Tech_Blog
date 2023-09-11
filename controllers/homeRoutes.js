const router = require('express').Router();
const { Post, User } = require('../models');
const userAuth = require('../utils/auth');

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
router.get('/dashboard/:id', userAuth, async (req, res) => {
  console.log("dashboard GET request received")
  try {
    const userPosts = await User.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id,
      },
      attributes: { exclude: ['password'] },
      include: [
        { model: Post }
      ]
    });
    if (!userPosts) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: 'User not found' });
    }
    const posts = userPosts.get({ plain: true });

    res.render('dashboard', {
      ...posts,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//login GET route to display login page
router.get('/login', (req, res) => {
  console.log("login GET request received")
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//Signup GET route to display signin page
router.get('/signup', (req, res) => {
  console.log("signup GET request received")
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

router.get('/dashboard', userAuth, async (req, res) => {
  console.log("dashboard GET request received");
  try {
    const dashboardUrl = `/dashboard/${req.session.user_id}`;
    res.redirect(dashboardUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/new_posts', userAuth, async (req, res) => {
  console.log('new post POST request received')
  try {
    res.render('newpost', {
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/post_edit/:id', userAuth, async (req, res) => {
  console.log('new post-edit POST request received')
  try {
    const rawReturn = await Post.findByPk(req.params.id, {
      where: {
        title: req.body.title,
        entry: req.body.entry
      }
    });
    const post = rawReturn.get({ plain: true });
   // console.log(post)
    res.render('postedit',{
      ...post,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router