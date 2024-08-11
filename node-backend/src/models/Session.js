import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  deviceInfo: {
    userAgent: { type: String },
    ipAddress: { type: String },
    deviceType: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  lastUsedAt: { type: Date, default: Date.now },
  isValid: { type: Boolean, default: true },
});

sessionSchema.method.accessToken = function () {
  token = jwt.sign({ userId: this.userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

sessionSchema.method.refreshToken = function () {
  token = jwt.sign({ userId: this.userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

const UserSession = mongoose.model('Session', sessionSchema);
export default UserSession;
