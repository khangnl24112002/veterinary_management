import {
  ADD_NEW_DRUG,
  DELETE_DRUG,
  FETCH_ALL_DRUGS,
  FETCH_ALL_DRUG_CATEGORIES,
  UPDATE_DRUG,
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
    case ADD_NEW_DRUG: {
      return {
        ...state,
        drug: [...state.drug, action.payload],
      };
    }
    case UPDATE_DRUG: {
      const index = state.drug.findIndex(
        (drug) => drug.id === action.payload.id
      );
      state.drug[index] = action.payload;
      return state;
    }

    case DELETE_DRUG: {
      const newState = state.drug.filter((drug) => drug.id !== action.payload);
      return {
        ...state,
        drug: newState,
      };
    }
    default:
      return state;
  }
};

export default drugReducer;
