import { combineReducers } from "redux";
import { authreducer } from "./auth-reducer";
import { studentReducer } from "./student-reducer";
import {profileReducer} from "./profile-reducers"

const rootReducer = combineReducers({
    auth: authreducer,
    student: studentReducer,
    profile: profileReducer
})

export default rootReducer