import { ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT, LOAD_STUDENTS, LOADING_STUDENT } from "../actions" 

const initialState = {
    students_data: [],
    isloading: false
}

const studentReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case LOADING_STUDENT:
            return {
                students_data: [],
                isloading: true
            }
        case LOAD_STUDENTS: 
            return {
                students_data: payload.students,
                isloading: false
            }
        case ADD_STUDENT:
            return {
                students_data: [...state.students_data, payload.student],
                isloading: false
            }
        case EDIT_STUDENT: 
            const editstudentindex = state.students_data.findIndex(student => student._id === payload.student._id);
            state.students_data.splice(editstudentindex, 1, payload.student)
            return {
                ...state,
                isloading: false
            }
        case DELETE_STUDENT:
            const deletestudentindex = state.students_data.findIndex(student => student._id === payload.id);
            state.students_data.splice(deletestudentindex, 1)
            return{
                ...state,
                isloading: false
            }
        default:
            return state
    }
}

export { studentReducer }