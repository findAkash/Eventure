import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { CONFIG } from '../../config/config.js';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: 'User',
    },
  },
  { timestamps: true }
);

// hash password before saving
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // if (
  //   this.password.length < 5 &&
  //   !/\d/.test(this.password) &&
  //   !/[!@#$%^&*(),.?":{}|<>]/.test(this.password)
  // ) {
  //   return next(
  //     new Error(
  //       'Password must be at least 6 characters and contain at least one number and one special character'
  //     )
  //   );
  // }
  const salt = bcrypt.genSaltSync(CONFIG.SALT);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ userId: this.userId }, CONFIG.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

UserSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ userId: this.userId }, CONFIG.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// hide attributes
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export const User = mongoose.model('User', UserSchema);
