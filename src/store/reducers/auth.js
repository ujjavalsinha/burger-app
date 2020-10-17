import * as actionTypes from '../actions/actionTypes'
const initialState = {
    userData : null,
    idToken : null,
    localId : null,
    error : false,
    loading : false,
    authRedirectPath : '/'
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case(actionTypes.SET_AUTH_REDIRECT_PATH):
            return {
                ...state,
                authRedirectPath : action.path
            }
        case(actionTypes.AUTH_LOGOUT):
            return {
                ...state,
                idToken : null,
                localId : null
            }
            
        case(actionTypes.AUTH_START):
            return {
                ...state,
                loading : true
            }
        case(actionTypes.AUTH_FAIL):
            return {
                ...state,
                error : action.error,
                loading : false
            }
        case(actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                idToken : action.idToken,
                localId : action.localId,
                loading : false
            }
        default:
            return state
    }
}
export default reducer;