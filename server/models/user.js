import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  profilePicture: { type: String, default: "" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("User",userSchema);