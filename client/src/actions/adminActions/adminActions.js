import updateAdminInfo from "../../services/admin.services";
import { UPDATE_ACCOUNT } from "../actionTypes";

export const updateUser = (user) => async (dispatch) => {
  // Goi API
  try {
    const response = await updateAdminInfo(user);
    console.log(response.data);
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: response.data.data,
    });
  } catch (err) {
    return err;
  }
};
