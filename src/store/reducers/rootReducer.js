import countryReducer from "./searchReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    country: countryReducer
})

export default rootReducer