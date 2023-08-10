const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.get("authorization");
    if (!token) {
      return res
        .status(404)
        .json({ success: false, err: -1, message: "Token not found" });
    }
    token = token.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, err: -2, message: error.message });
    // console.error(error);
  }
};

const verifyRefresh = (account, token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (
      decodedToken.username === account.username &&
      decodedToken.accountId === account.accountId &&
      decodedToken.role === account.role
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
};

module.exports = {
  isAuthenticated,
  verifyRefresh,
};
