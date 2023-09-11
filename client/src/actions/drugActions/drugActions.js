import { FETCH_ALL_DRUGS, FETCH_ALL_DRUG_CATEGORIES } from "../actionTypes";

export const fetchAllDrugs = (drugs) => async (dispatch) => {
  // Goi API
  dispatch({
    type: FETCH_ALL_DRUGS,
    payload: drugs,
  });
};

export const fetchAllCategories = (categories) => async (dispatch) => {
  dispatch({
    type: FETCH_ALL_DRUG_CATEGORIES,
    payload: categories,
  });
};
