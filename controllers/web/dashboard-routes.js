
const router = require('express').Router();

const { Post, User, Comment } = require('../../models');



const checkLoginMiddleware = (req, res, next) => {
  console.log(`checkLoginMiddleware:`)
  console.log(req.session)
  if (req.session.logged_in) {
    // User is logged in, proceed
    next();
  } else {
    // User is not logged in; show login form
    res.redirect('/login');
  }
};

router.use(checkLoginMiddleware);


router.get('/', async (req, res) => {
  try {
    const loggedInUserId = req.session.user_id;

    const postData = await Post.findAll(
      {
        where: {
          user_id: loggedInUserId
        },
        include: User 
      }
    );
    const posts = postData.map(post => post.get({ plain: true }));
    const loggedIn = req.session.logged_in;

    res.render('dashboard', { posts, dashboard: true, loggedIn });
  }
  catch (err) {
    res.status(500).render('error');
  }
});


router.get('/edit-post/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const postData = await Post.findByPk(
      postId,
      {
        include: [
          User, 
          {
            model: Comment,
            include: User
          }
        ]
      }
    );
    console.log(postData.get({ plain: true }))
    const loggedIn = req.session.logged_in;

    res.render('edit-post', { loggedIn, dashboard: true, post: postData.get({ plain: true }) });
  }
  catch (err) {
    res.status(500).render('error');
  }
});


router.get('/create-post', (req, res) => {
  const loggedIn = req.session.logged_in;
  res.render('create-post', { loggedIn, dashboard: true });
});

module.exports = router;
