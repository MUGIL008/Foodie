// import jwt from "jsonwebtoken"

// const authMiddleware = async(req,res,next)=>{
//     const {token} =req.headers;
//     if(!token){
//         return res.json({success:false,message:"not authorised user"})
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"error"})
//     }
// }

// export default authMiddleware;

















import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // userId: req.userId,

    req.userId = decoded.id;
    req.role = decoded.role;

    console.log(decoded.id);
    console.log(req.userId);
    console.log(decoded);
    console.log(req);
    
    
    
    
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized", error: err.message });
  }
};

export default authMiddleware;
