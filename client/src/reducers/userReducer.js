import { UPDATE_ACCOUNT } from "../actions/actionTypes";

const initialState = {
  user: {
    name: "John Doe",
    phoneNumber: "123-456-7890",
    address: "123 Main St, City",
    email: "john.doe@example.com",
    avatar: "https://picsum.photos/200",
  },
};

// Tao reducer de quan ly trang thai cua User
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
