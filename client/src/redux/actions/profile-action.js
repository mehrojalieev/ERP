import axios from "../../services/api"


const loading_profile = (user) => {
    return {
        type: "LOADING_PROFILE",
        payload: {
            user
        }
    }
}

const loadPRofile = () => async dispatch => {
    dispatch(loading_profile())
    axios.get('/users/profile')
    .then(response => dispatch(loading_profile(response.data)))
    .catch(error => console.log(error))
}


export {loadPRofile}