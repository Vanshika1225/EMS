// user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

// Assuming your userSchema definition
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };
// Hash password before saving user
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY || 'default_secret_key');
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
