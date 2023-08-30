import { DELETE_ACCOUNT, FETCH_ALL_ACCOUNTS } from "../actionTypes";

export const fetchAccounts = (accounts) => async (dispatch) => {
  // Goi API
  try {
    dispatch({
      type: FETCH_ALL_ACCOUNTS,
      payload: accounts,
    });
  } catch (err) {
    return err;
  }
};

export const deleteAccount = (accountId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ACCOUNT,
      payload: accountId,
    });
  } catch (err) {
    return err;
  }
};
