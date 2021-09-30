export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const  FORGOT_PASSWORD_FAILURE ='FORGOT_PASSWORD_FAILURE'


export const forgotPasswordRequest = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST
    }
}

export const forgotPasswordSuccess = user => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: user
    }
}

export const forgotPasswordFailure = error => {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: error
    }
}