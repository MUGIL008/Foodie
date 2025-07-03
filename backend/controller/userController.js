// import userModel from "../model/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// // login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) return res.json({ success: false, message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ success: true, token });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Login failed', error: err.message });
//   }
// };

// // helper to create token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // register user
// const registerUser = async (req, res) => {
//   const { name, password, email } = req.body;
//   try {
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: true, message: "User already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Enter a valid email id" });
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Password length is short" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user" // or "admin" if registering admin
//     });

//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({ success: true, token });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { loginUser, registerUser };










































import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper to create token with role
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    const token = createToken(user._id, user.role);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user" // Default role is user
    });

    const user = await newUser.save();
    const token = createToken(user._id, user.role);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Registration failed", error: error.message });
  }
};

export { loginUser, registerUser };
