import bcrypt from 'bcrypt';
import User from '../models/User.js';
import validator from 'validator';
import { validateSignupData } from '../utils/validation.js'; 

export const signup = async (req, res) => {
  try {
    validateSignupData(req);

    const { fullName, email, phone, password, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      phone,
      password: passwordHash,
      gender
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });

    res.json({ message: "User added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Email ID is not valid");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
    });

    res.json({ message: "Login successful!", data: user });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.send("Logout successful");
};
