const jwt = require("jsonwebtoken");

const checkIsAdmin = (req, res, next) => {
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
      // get role
      const data = {
        accountId: decoded.accountId,
        username: decoded.username,
        role: decoded.role,
      };
      if (data.role === 1) {
        // Gan thong tin admin data vao req de xu li tai controller
        req.adminData = data;
        next();
      } else {
        // truong hop khong phai la admin
        res.status(403).json({
          success: false,
          message:
            "Error! You account does not have access rights to the content.",
        });
      }
    }
  });
};

module.exports = {
  checkIsAdmin,
};
