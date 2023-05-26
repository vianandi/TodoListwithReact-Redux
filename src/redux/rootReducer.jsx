import { combineReducers } from "redux";
import { operationsReducer } from "./todo/reducers/operation";

export const rootReducer = combineReducers({
    operationsReducer,
    // more reducers can be added here
})