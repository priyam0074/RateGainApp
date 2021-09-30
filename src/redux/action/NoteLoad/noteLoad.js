export const CONTACT_NOTES_LOAD_REQUEST = 'CONTACT_NOTES_LOAD_REQUEST'
export const CONTACT_NOTES_LOAD_SUCCESS = 'CONTACT_NOTES_LOAD_SUCCESS'
export const CONTACT_NOTES_LOAD_FAILURE ='CONTACT_NOTES_LOAD_FAILURE'


const CONTACT_NOTES_LOAD_ = 'CONTACT_NOTES_LOAD_'

export const contactNotesRequest = () => {
    return {
        type: CONTACT_NOTES_LOAD_+'REQUEST'
    }
}

export const contactNotesSuccess = user => {
    return {
        type: CONTACT_NOTES_LOAD_SUCCESS,
        payload: user
    }
}

export const contactNotesFailure = error => {
    return {
        type: CONTACT_NOTES_LOAD_FAILURE,
        payload: error
    }
}