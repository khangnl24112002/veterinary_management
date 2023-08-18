import { UPDATE_ACCOUNT } from "../actionTypes";

export const updateUser = (user) => async (dispatch) => {
  // Goi API
  try {
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: user,
    });
  } catch (err) {
    return err;
  }
};
