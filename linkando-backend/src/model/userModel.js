const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  avatar: { 
    type: String 
  },
  provider: { 
    type: String, 
    enum: ['google', 'github'], 
    required: true 
  },
  providerId: { 
    type: String, 
    required: true 
  },
  refreshToken: { 
    type: String 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  lastLogin: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Índice composto para provider + providerId
UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema); 