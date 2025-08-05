import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: -1 });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  try {
    // Kullanıcıyı id ile getir
    const user = await User.findById(req.userId);

    const newPost = new PostMessage({
      ...post,
      creator: req.userId,
      profilePicture: user?.profilePicture || "",
      createdAt: new Date().toISOString(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const postData = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  try {
    const existingPost = await PostMessage.findById(_id);

    // Kullanıcı, bu postun sahibi mi?
    if (existingPost.creator !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this post." });
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, postData, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  try {
    const existingPost = await PostMessage.findById(_id);

    // Kullanıcı, bu postun sahibi mi?
    if (existingPost.creator !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post." });
    }

    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ id: _id, message: "Post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the post." });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  try {
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId); // like
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId)); // unlike
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while liking the post." });
  }
};
export const getPostsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userPosts = await PostMessage.find({ creator: id });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ message: "User posts not found" });
  }
};
export const getLikedPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // likes array'inde userId olan tüm postları bul
    const likedPosts = await PostMessage.find({ likes: userId });
    res.status(200).json(likedPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch liked posts." });
  }
};
export const getPostsByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const posts = await PostMessage.find({ tags: tag }); // ← Mongo'da array içinde arar
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts by tag." });
  }
};
export const getPostsByUserInterests = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const interests = user.interests || [];

    if (interests.length === 0) {
      return res.status(200).json({ posts: [], hasMore: false });
    }

    const startIndex = (Number(page) - 1) * Number(limit);

    const posts = await PostMessage.find({ tags: { $in: interests } })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(Number(limit));

    const total = await PostMessage.countDocuments({ tags: { $in: interests } });

    res.status(200).json({
      posts,
      hasMore: startIndex + posts.length < total,
    });
  } catch (error) {
    console.error("Error fetching posts by interests:", error);
    res.status(500).json({ message: "Failed to fetch posts by interests." });
  }
};

export const getRecentPosts = async (req, res) => {
  try {
    const recentPosts = await PostMessage.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(recentPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
