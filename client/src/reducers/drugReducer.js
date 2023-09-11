import {
  FETCH_ALL_DRUGS,
  FETCH_ALL_DRUG_CATEGORIES,
} from "../actions/actionTypes";

const initialState = {
  drug: {},
  categories: {},
};

// Tao reducer de quan ly trang thai cua User
const drugReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DRUGS:
      return {
        ...state,
        drug: action.payload,
      };
    case FETCH_ALL_DRUG_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default drugReducer;
