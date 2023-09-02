const router = require('express').Router();

const { Post, User, Comment } = require('../../models');

// Home page

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll(
      {
        include: User 
      }
    );
    const posts = postData.map(post => post.get({ plain: true }));
    const loggedIn = req.session.logged_in;

    res.render('home', { posts, loggedIn });
  }
  catch (err) {
    res.status(500).render('error');
  }
});

// Post detail page
// This page renders all information about a post
// including all its comments, and has a comment form
// to add new comments.

router.get('/post/:id', async (req, res) => {
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

    res.render('post', { loggedIn, post: postData.get({ plain: true }) });
  }
  catch (err) {
    res.status(500).render('error');
  }
});


// Show forms to log in or sign up

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});


module.exports = router;
