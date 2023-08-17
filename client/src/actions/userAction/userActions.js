import { UPDATE_ACCOUNT } from "../actionTypes";

export const updateUser = (user) => (dispatch) => {
  dispatch({
    type: UPDATE_ACCOUNT,
    payload: user,
  });
};
