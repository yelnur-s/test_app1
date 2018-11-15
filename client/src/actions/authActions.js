import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {getUsers} from "./usersAction";

export const registerUser = (userData, history)=> dispatch => {
    axios.post('/api/user/register', userData)
        .then(res=>{
            dispatch(loginUser(userData, history));
        })
        .catch( err => {

            dispatch({
                type: GET_ERRORS,
                payload:  err.response.data
            })
        })
}


export const loginUser = (userData, history)=> dispatch => {

    axios.post('/api/user/login', userData)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            setAuthToken();
            history.push("/profile");
        })
        .catch( err => {

            dispatch({
                type: GET_ERRORS,
                payload:  err.response.data
            })
        })
}

export const logoutUser = (history)=> dispatch => {
    axios.post('/api/user/logout')
        .then(res => {
            localStorage.removeItem("token");
            setAuthToken();
            dispatch({
                type:SET_CURRENT_USER,
                payload: {
                    isAuthenticated:false,
                    user: null
                }
            })
            history.push("/");
        })
        .catch( err => {

            dispatch({
                type: GET_ERRORS,
                payload:  err.response.data
            })
        })
}