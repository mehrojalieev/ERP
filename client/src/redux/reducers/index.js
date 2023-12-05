import { combineReducers } from "redux";
import { authreducer } from "./auth-reducer";
import { studentReducer } from "./student-reducer";
import { profileReducer } from "./profile-reducer";

const rootReducer = combineReducers({
    auth: authreducer,
    student: studentReducer,
    profile: profileReducer
})

export default rootReducer