import * as actionTypes from './actionTypes'
import axios from 'axios'
const API_KEY = 'AIzaSyBH0HVMj5eAPMP_cNuK2iqLuomBV00r9nU'

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('expirationTime')
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())
        },expirationTime*1000)
    }
}


export const authSuccess = (idToken,localId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : idToken,
        localId : localId
        
    }
}

export const auth = (email,password,isSignup) => {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    if(!isSignup){
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }
    console.log(url)
    return dispatch => {
        dispatch(authStart())
        const signupData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        axios.post(`${url}`,signupData)
        .then(response => {
            console.log("RESPONSE: ",response.data)
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('user_id',response.data.localId)
            localStorage.setItem('expirationTime',expirationTime)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            console.log(error.response.data.error)
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if(expirationTime <= new Date()){
            dispatch(logout())
        }
        const localId = localStorage.getItem('user_id')
        dispatch(authSuccess(token,localId))
        dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000))
    }
}