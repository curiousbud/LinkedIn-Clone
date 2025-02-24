import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All the Fields are required to be filled " });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exits!" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username Already Exits!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.cookie("jwt-linkedin", token, {
      httpOnly: true, // Prevents XSS attacks
      maxAge: 12 * 60 * 60 * 1000,
      samesite: "strict", // Prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", // Prevents man-in-the-middle attacks
    });

    res.status(201).json({ message: "User Registered Successfully!" });

    const profileUrl = process.env.CLIENT_URL + "/profile/" + user.name;
    try {
      await sendWelcomeEmail(user.name, user.email, profileUrl);
    } catch (emailError) {
      console.log("Error sending Welcome Email!: ", emailError);
    }
  } catch (error) {
    console.log("Error in SignUp: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const login = (req, res) => {
  res.send("Login!");
};

const logout = (req, res) => {
  res.send("Logout!");
};

export default {
  signup,
  login,
  logout,
};
