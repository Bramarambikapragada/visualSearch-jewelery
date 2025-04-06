import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`Invalid email address: ${value}`);
      }
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(`Enter a strong password: ${value}`);
      }
    }
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender type`,
    },
  },
});

// Generate JWT token
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "DEVTINDER@630501", {
    expiresIn: "7d",
  });
  return token;
};

// Validate password with bcrypt
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
export default User;
