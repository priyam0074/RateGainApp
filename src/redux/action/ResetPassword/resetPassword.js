export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE ='RESET_PASSWORD_FAILURE'


export const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export const resetPasswordSuccess = user => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: user
    }
}

export const resetPasswordFailure = error => {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: error
    }
}