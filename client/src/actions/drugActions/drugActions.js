import { FETCH_ALL_DRUGS, FETCH_ALL_DRUG_CATEGORIES, ADD_NEW_DRUG, UPDATE_DRUG} from "../actionTypes";

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

export const addNewDrug = (drug)=> async (dispatch)=>{
  dispatch({
    type: ADD_NEW_DRUG,
    payload: drug,
  })
}

export const updateDrug = (drug)=> async (dispatch)=>{
  dispatch({
    type: UPDATE_DRUG,
    payload: drug,
  })
}