import { transformDate } from "./transformDate";

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
      createdAt: transformDate(createdAt),
      updatedAt: transformDate(updatedAt),
    };
  });
};
export default transformedAccounts;
