import { sign } from "jsonwebtoken";
const usePasswordHashToMakeToken = (user) => {
  // highlight-start
  const { password, _id, createdAt } = user;
  const secret = password + "-" + createdAt;
  const token = sign({ _id }, secret, {
    expiresIn: '7d'
  });
  // highlight-end
  return token;
};

export default usePasswordHashToMakeToken;
