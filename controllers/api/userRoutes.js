const router = require('express').Router();
const { User } = require('../../models');

//Login Post to login user
router.post('/login', async (req, res) => {
  console.log('login POST request received')
  try {
    const userData = await User.findOne({ where: { user_name: req.body.username } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect Username or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData.user_name, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//logout POST to logout user
router.post('/logout', (req, res) => {
  console.log('logout POST request received')
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//signup POST to sign up user
router.post('/signup', async (req, res) => {
  console.log('signup POST request received')

  try {
    const userData = await User.create({
      user_name: req.body.userData.user_name, 
      password: req.body.userData.password 
    });

req.session.save(() => {
  req.session.user_id = userData.id;
  req.session.logged_in = true;

  res.status(200).json(userData);
});
}catch (err) {
  res.status(400).json(err);
}

});



module.exports = router;