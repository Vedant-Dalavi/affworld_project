// server/routes/posts.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const {
    createPost,
    getUserPosts,
    updatePost,
    deletePost,
    getPost,
    getAllPosts
} = require('../controllers/Post');

// Configure multer for image upload
// const upload = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         // Accept images only
//         if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//             return cb(new Error('Only image files are allowed!'), false);
//         }
//         cb(null, true);
//     }
// });

// All routes require authentication
router.use(auth);

// Get all posts (feed)
router.get('/get-all-post', getAllPosts);

// Get user's posts
router.get('/user', getUserPosts);

// Get single post
router.get('/:postId', getPost);

// Create new post with image upload
router.post('/new-post', createPost);

// Update post
router.patch('/:postId', updatePost);

// Delete post
router.delete('/:postId', deletePost);

module.exports = router;