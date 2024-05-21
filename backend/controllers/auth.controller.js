import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {fullName, username, password, confirmPassword, gender} = req.body;

    if(password !== confirmPassword) {
      return res.status(400).json({error:"Passwords don't match"})
    }

    const user = await User.findOne({username})

    if(user) {
      return res.status(400).json({error:"User already exists"})
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture
    })

    if (newUser){
      await newUser.save();
    // Generate jwt token
    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePicture: newUser.profilePicture
    })} else {
      res.status(400).json({error:"Invalid user data"})
    }

  } catch (error) {
    console.log("Error signing up", error.message);
    res.status(500).json({error: error.message})
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect) {
      return res.status(400).json({error:"Invalid credentials"})
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture
    })
  } catch (error) {
    console.log("Error logging in", error.message);
    res.status(500).json({error: error.message})
  }
};

export const logout =  (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message:"Logged out successfully"})

  } catch (error) {
    console.log("Error logging out", error.message);
    res.status(500).json({error: error.message})
  }
};
