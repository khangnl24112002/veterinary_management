const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.get("Authorization");
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
      accountId: decodedToken.accountId,
      username: decodedToken.username,
      role: decodedToken.role,
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

// Ham xac nhan xem refreshToken co chinh xac hay khong
const verifyRefresh = (account, token) => {
  try {
    token = token.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("Decoded token:", decodedToken);
    console.log("Account:", account);
    if (
      decodedToken.username === account.username &&
      decodedToken.accountId === account.id &&
      decodedToken.role === account.role
    ) {
      return 1;
    } else {
      return -1;
    }
  } catch (error) {
    // console.log(error);
    return 0;
  }
};

module.exports = {
  isAuthenticated,
  verifyRefresh,
};
