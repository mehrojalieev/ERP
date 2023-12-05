import { ADD_STUDENT, ADD_STUDENT_ERROR, ADD_STUDENT_LOADING, LOAD_STUDENTS, LOADING_STUDENT, EDIT_STUDENT_ERROR, EDIT_STUDENT_LOADING, EDIT_STUDENT, DELETE_STUDENT, DELETE_STUDENT_ERROR, DELETE_STUDENT_LOADING } from "./index";
import axios from "../../services/api"
import {toast} from "react-toastify";

const add_student = (student, message) => {
    toast.success(message)
    return {
        type: ADD_STUDENT,
        payload: {
            student,
            message
        }
    }
}

const add_student_loading = (message) => {
    toast.warning(message, {
        autoClose: 500
    })
    return {
        type: ADD_STUDENT_LOADING,
        payload: {
            message
        }
    }
}

const add_student_error = (message) => {
    toast.error(message)
    return {
        type: ADD_STUDENT_ERROR,
        payload: {
            message
        }
    }
}

const load_students = (students) => {
    return {
        type: LOAD_STUDENTS,
        payload: {
            students
        }
    }
}

const loading_students = () => {
    return {
        type: LOADING_STUDENT
    }
}

const edit_student = (student, message) => {
    toast.success(message);
    return {
        type: EDIT_STUDENT,
        payload: {
            student,
            message
        }
    }
}

const edit_student_loading = (message) => {
    toast.warning(message, {
        autoClose: 500
    })
    return {
        type: EDIT_STUDENT_LOADING,
        payload: {
            message
        }
    }
}

const edit_student_error = (message) => {
    toast.error(message)
    return {
        type: EDIT_STUDENT_ERROR,
        payload: {
            message
        }
    }
}

const delete_student = (id, message) => {
    toast.success(message);
    return {
        type: DELETE_STUDENT,
        payload: {
            id,
            message
        }
    }
}

const delete_student_loading = (message) => {
    toast.warning(message, {
        autoClose: 500
    })
    return {
        type: DELETE_STUDENT_LOADING,
        payload: {
            message
        }
    }
}

const delete_student_error = (message) => {
    toast.error(message)
    return {
        type: DELETE_STUDENT_ERROR,
        payload: {
            message
        }
    }
}

const addStudent = (STUDENT) => async dispatch => {
    dispatch(add_student_loading("Loading..."))
    axios.post("/student/addStudent", STUDENT)
        .then(response => {
            dispatch(add_student(response.data, "Successfully added"))
        })
        .catch(error => {
            dispatch(add_student_error(error.response.data.message))
        })
}

const editStudent = (STUDENT) => async dispatch => {
    dispatch(edit_student_loading("Loading..."))
    axios.put(`/student/${STUDENT._id}`, STUDENT)
        .then(response => {
            dispatch(edit_student(response.data, "Successfully updated student"))
        })
        .catch(error => {
            dispatch(edit_student_error(error.response.data.message))
        })
}

const deleteStudent = (id) => async dispatch => {
    dispatch(delete_student_loading("Loading..."))
    axios.delete(`/student/${id}`)
        .then(() => {
            dispatch(delete_student(id, "Successfully deleted student"))
        })
        .catch(error => {
            dispatch(delete_student_error(error.response.data.message))
        })
}

const loadStudents = () => async dispatch => {
    dispatch(loading_students())
    axios.get("/student/all")
        .then(response => dispatch(load_students(response.data.students)))
        .catch(error => console.log(error.response.data.message))
}



export { addStudent, loadStudents, editStudent, deleteStudent }