import * as TYPES from "../actions/actionTypes";

var initValues = {
    candidates: [],
    country: null
}


const countryReducer = (state = initValues, action) => {
    switch (action.type) {
        case TYPES.SET_COUNTRY_CANDIDATES:
            return { ...state, candidates: action.payload };
        case TYPES.SET_COUNTRY: 
            return {...state, country: action.payload}
        default:
            return { ...state }
    }
}

export default countryReducer