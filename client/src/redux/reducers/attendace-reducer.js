import { LOAD_ATTENDANCE } from "../actions"

const initialState = {
    attendance_data: []
}


const attendanceReducer = (state = initialState, {type, payload}) => {
    console.log(payload);
    switch(type){
        case LOAD_ATTENDANCE: 
            return {
                attendance_data: payload.attendance
            }
        default: return state
    }
}


export {attendanceReducer}