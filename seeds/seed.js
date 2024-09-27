const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  { username: 'JohnDoe', password: 'password123' },
  { username: 'JaneSmith', password: 'password456' }
];

const postData = [
  { title: 'My First Post', contents: 'This is the content of my first post.', user_id: 1 },
  { title: 'Another Post', contents: 'This is another post with content.', user_id: 2 }
];

const commentData = [
  { contents: 'Great post!', user_id: 2, post_id: 1 },
  { contents: 'Thanks for sharing!', user_id: 1, post_id: 2 }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, { individualHooks: true });
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
