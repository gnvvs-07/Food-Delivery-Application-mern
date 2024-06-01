import jwt from "jsonwebtoken";

// authorization middleware
const authMiddleware = async (req, res, next) => {
  //middle ware for cart and checkout functionalities
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    // next passing functions
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error",
    });
  }
};

export default authMiddleware;
