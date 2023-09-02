const router = require('express').Router();
const { Post, Comment } = require('../../models');


// Create a post in the database

router.post('/', async (req, res) => {
  const loggedInUserId = req.session.user_id; // we must get this from session for security reasons

  try {
    const postData = await Post.create(
        {
          title: req.body.title,
          body: req.body.body,
          user_id: loggedInUserId
        }
      );

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a comment in the database

router.post('/:id', async (req, res) => {
  const userId = req.session.user_id; // we must get this from session for security reasons
  const postId = req.params.id;

  try {
    const commentData = await Comment.create(
        {
          body: req.body.comment,
          user_id: userId,
          post_id: postId
        }
      );

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route handles updating the post

router.put('/:id', async (req, res) => {
  const userId = req.session.user_id; // we must get this from session for security reasons
  const postId = req.params.id;

  try {
    await Post.update(
        {
          body: req.body.body,
          title: req.body.title
        },
        {
          where: {
            id: postId,
            user_id: userId
          }
        }
      );

    res.status(200).json({});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.session.user_id; // we must get this from session for security reasons
  const postId = req.params.id;

  try {
    await Post.destroy(
        {
          where: {
            id: postId,
            user_id: userId
          }
        }
      );

    res.status(200).json({});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

