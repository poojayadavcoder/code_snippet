import jwt from "jsonwebtoken";

const protect = (req, res, next) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  console.log("Token from cookie:", token);
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log(decoded.id)
    console.log("Decoded ID:", decoded.id);
    req.user = { id: decoded.id };
    console.log(req.user)

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token",
    });

  }
};

export default protect;