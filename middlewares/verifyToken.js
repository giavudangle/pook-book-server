import { verify } from "jsonwebtoken";

// HAVENT FIX CASE EXPIRE TOKEN
const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ err: "Token is expired" });
  }
  try {
    verify(token, process.env.SECRET_TOKEN);
    next();
  } catch (err) {
    res.status(400).send({ err: "Invalid Token" });
  }
};

export default auth;
