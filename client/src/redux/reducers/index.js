import { combineReducers } from "redux";
import { authreducer } from "./auth-reducer";
import { studentReducer } from "./student-reducer";
import { attendanceReducer } from "./attendace-reducer";

const rootReducer = combineReducers({
    auth: authreducer,
    student: studentReducer,
    attendance: attendanceReducer
})

export default rootReducer