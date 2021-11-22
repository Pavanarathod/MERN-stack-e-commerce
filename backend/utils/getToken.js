import jwt from "jsonwebtoken";

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });
};

export default genToken;
