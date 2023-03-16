/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const { UserRoles } = require('../constants');
const { bcryptService } = require('../services');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'LastName is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: 8,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [UserRoles.ADMIN, UserRoles.USER],
      default: UserRoles.USER,
    },
  },
  { timestamps: true },
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptService.hashPassword(this.password);
  return next();
});

// Compare password using bcrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcryptService.comparePassword(
    enteredPassword,
    this.password,
  );
  return isMatch;
};

module.exports = model('User', userSchema);
