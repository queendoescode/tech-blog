const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const postIds = [];
  for (const post of postData) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const newPost = await Post.create({
      ...post,
      user_id: users[randomIndex].id,
    });
    postIds.push(newPost.id);
  }

  for (const comment of commentData) {
    const randomPost = Math.floor(Math.random() * postIds.length);
    const randomUser = Math.floor(Math.random() * users.length);
    await Comment.create({
      ...comment,
      user_id: users[randomUser].id,
      post_id: postIds[randomPost]
    });
  }

  process.exit(0);
};

seedDatabase();
