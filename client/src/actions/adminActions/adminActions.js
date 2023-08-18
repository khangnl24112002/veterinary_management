import updateAdminInfo from "../../services/admin.services";
import { UPDATE_ACCOUNT } from "../actionTypes";

export const updateUser = (user) => async (dispatch) => {
  // Goi API
  try {
    const response = await updateAdminInfo(user);
    console.log(response);
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: user,
    });
  } catch (err) {
    return err;
  }
};
