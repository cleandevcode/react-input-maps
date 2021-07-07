import countryReducer from "./countryReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    country: countryReducer
})

export default rootReducer