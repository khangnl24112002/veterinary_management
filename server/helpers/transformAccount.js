const moment = require("moment");
const transformedAccounts = (accounts) => {
  return accounts.map((account) => {
    const { id, username, role, createdAt, updatedAt } = account;
    let transformedRole;
    if (role === 1) {
      transformedRole = "Admin";
    } else if (role === 2) {
      transformedRole = "User";
    }
    return {
      id,
      username,
      role: transformedRole,
      createdAt: moment(createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(updatedAt).format("YYYY-MM-DD"),
    };
  });
};
export default transformedAccounts;
