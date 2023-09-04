import {
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_INFO,
  UPDATE_USER,
} from "../actionTypes";

export const updateUser = (user) => async (dispatch) => {
  // Goi API
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const updateAccount = (account) => async (dispatch) => {
  // Goi API
  dispatch({
    type: UPDATE_ACCOUNT,
    payload: account,
  });
};

export const updateAccountInfo = (accountInfo) => async (dispatch) => {
  // Goi API
  dispatch({
    type: UPDATE_ACCOUNT_INFO,
    payload: accountInfo,
  });
};
