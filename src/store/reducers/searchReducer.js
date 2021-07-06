import * as TYPES from "../actions/actionTypes";

var initValues = {
    candidates: []
}


const countryReducer = (state = initValues, action) => {
    switch (action.type) {
        case TYPES.SET_COUNTRY_CANDIDATES:
            return { ...state, candidates: action.payload };
        default:
            return { ...state }
    }
}

export default countryReducer