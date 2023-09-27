const checkIsAdmin = (req, res, next) => {
  const accountData = req.accountData;
  if (accountData.role === 1) {
    next();
  } else {
    // truong hop khong phai la admin
    res.status(403).json({
      err: 2,
      success: false,
      message: "Error! You account does not have access rights to the content.",
    });
  }
};

module.exports = {
  checkIsAdmin,
};
