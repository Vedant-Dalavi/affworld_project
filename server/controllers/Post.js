// server/controllers/postController.js
const Post = require('../models/Post');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require("dotenv").config();



// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.files.image; // Assuming you're using multer for file upload

        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }

        if (!caption) {
            return res.status(400).json({ error: 'Caption is required' });
        }


        // Upload image to Cloudinary
        const uploadedImage = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        )

        console.log("inside create post")

        const post = new Post({
            caption,
            image: uploadedImage.secure_url,
            user: req.user.id
        });

        await post.save();

        // Populate user details
        await post.populate('user', 'name');

        res.status(201).json({
            success: true,
            post: {
                id: post._id,
                caption: post.caption,
                imageUrl: post.imageUrl,
                user: post.user,
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            error: 'Error creating post',
            details: error.message
        });
    }
};

// Get all posts (feed)
exports.getAllPosts = async (req, res) => {
    try {


        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('user')

        // const totalPosts = await Post.countDocuments();

        res.status(200).json({
            message: "Post fetched successfully",
            posts
        });
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({
            error: 'Error fetching posts',
            details: error.message
        });
    }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('user', 'name')
            .lean();

        res.json(posts);
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({
            error: 'Error fetching user posts',
            details: error.message
        });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { caption } = req.body;

        const post = await Post.findOne({
            _id: postId,
            user: req.user._id
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (caption) {
            post.caption = caption;
        }

        await post.save();
        await post.populate('user', 'name');

        res.json({
            success: true,
            post
        });
    } catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({
            error: 'Error updating post',
            details: error.message
        });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findOne({
            _id: postId,
            user: req.user._id
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Extract public ID from Cloudinary URL
        const publicId = post.imageUrl.split('/').slice(-1)[0].split('.')[0];

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(`social_feed/${publicId}`);

        // Delete post from database
        await post.deleteOne();

        res.json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({
            error: 'Error deleting post',
            details: error.message
        });
    }
};

// Get single post
exports.getPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId)
            .populate('user', 'name')
            .lean();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Get post error:', error);
        res.status(500).json({
            error: 'Error fetching post',
            details: error.message
        });
    }
};
