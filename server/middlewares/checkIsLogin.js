const jwt = require("jsonwebtoken");

const checkIsLogin = (req, res, next) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth) {
    res
      .status(200)
      .json({ success: false, message: "Error! Token was not provided." });
  }
  const token = headerAuth.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      res
        .status(200)
        .json({ success: false, message: "Token has error!", error: err });
    } else {
      // Thanh cong
      // Lay thong tin duoc gui ma hoa tu token
      const data = {
        accountId: decoded.accountId,
        username: decoded.username,
        role: decoded.role,
      };
      // gui thong tin ma hoa cho req
      req.accountData = data;
      // goi den middleware tiep theo
      next();
    }
  });
};

module.exports = {
  checkIsLogin,
};
