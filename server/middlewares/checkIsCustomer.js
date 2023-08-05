const checkIsCustomer = (req, res, next) => {
  const accountData = req.accountData;
  if (accountData.role === 2) {
    next();
  } else {
    // truong hop khong phai la admin
    res.status(403).json({
      success: false,
      message: "Error! You account does not have access rights to the content.",
    });
  }
};

module.exports = {
  checkIsCustomer,
};
