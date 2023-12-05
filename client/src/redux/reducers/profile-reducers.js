const initialState = {
    user_profile: null
}


const profileReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case "LOADING_PROFILE": 
        return {
            user_profile: payload.user
        }
        default: 
            return state     
    }
}

export {profileReducer}