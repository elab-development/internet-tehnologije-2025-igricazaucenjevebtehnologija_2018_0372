const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "UNAUTHORIZED: NO_TOKEN_PROVIDED" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ error: "UNAUTHORIZED: INVALID_TOKEN" });
  }
};

module.exports = { protect };