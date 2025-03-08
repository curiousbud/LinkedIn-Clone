import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";
import Notification from "../models/notification.model.js";
import { sendCommentNotificationEmail } from "../emails/emailHandlers.js";

export const getFeedPosts = async (req, res) => {
  try {
    const currentUser = req.user;
    const posts = await Post.find({ author: { $in: currentUser.connections } })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name ProfilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getFeedPosts controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    let newPost;
    if (image) {
      const imgResult = await cloudinary.uploader.upload(image);
      newPost = new Post({
        author: req.user._id,
        content,
        image: imgResult.secure_url,
      });
    } else {
      newPost = new Post({
        author: req.user._id,
        content,
      });
    }
    res.status(201).json(await newPost.save());
  } catch (error) {
    console.error("Error in createPost controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can't to delete this post!" });
    }

    // Delete image from cloudinary
    if (post.image) {
      await cloudinary.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
      );
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.Id;
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: req.user._id,
            content,
          },
        },
      },
      { new: true }
    ).populate("author", "name username profilePicture headline");

    // Create a notification if the current owner is not the post owner
    if (post.author.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comment",
        relatedUser: req.user._id,
        relatedPost: postId,
      });
      await newNotification.save();

      try {
        const postUrl = process.env.CLIENT_URL + "/posts/" + postId;
        await sendCommentNotificationEmail(
          post.author.email,
          post.author.name,
          req.user.name,
          postUrl,
          content
        );
      } catch (error) {
        console.error("Error in createComment controller:", error);
        res.status(500).json({ message: "Server error" });
      }

      res.status(201).json(post);
    }
  } catch (error) {
    console.error("Error in createComment controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(postId);
    const postId = req.params.id;
    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      /// Unlike a Post
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Like The Post
      post.likes.push(userId);

      // Create a notification if the current user not the post owner
      if (post.author.toString() !== userId.toString()) {
        const newNotification = new Notification({
          recipient: post.author,
          type: "like",
          relatedUser: userId,
          relatedPost: postId,
        });
        await newNotification.save();
      }
    }
  } catch (error) {
    console.error("Error in likePost controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};