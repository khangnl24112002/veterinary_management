import { FETCH_ALL_ACCOUNTS } from "../actionTypes";

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
