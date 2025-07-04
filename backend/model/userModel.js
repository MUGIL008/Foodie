import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },  // ✅ add this line
  cartData: { type: Object, default: {} }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
