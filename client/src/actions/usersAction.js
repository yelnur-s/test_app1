import axios from "axios";
import {GET_ERRORS, GET_USERS, SET_USER, DELETE_USER, UPDATE_USER} from "./types";


export  const addUser = (userData, showModal) => dispatch => {

        axios({
            method: 'post',
            url: '/api/user',
            data: userData
        })
        .then(res=>{
            dispatch(getUsers(0));
            showModal();
        }).catch(err=>{

            if(err.response&&err.response.data&&err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }


        })
}

export  const updateUser = (userData, showModal) => dispatch => {


    axios({
            method: 'put',
            url: '/api/user',
            data: userData
        })
        .then(res=>{

            dispatch({
                type: UPDATE_USER,
                payload: res.data
            })

            showModal();

        }).catch(err=>{

        if(err.response&&err.response.data&&err.response.data.msg) {
            alert(err.response.data.msg);
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }



    })
}


export  const getUsers = (page) => dispatch => {

    if(!page) page = 0;
    axios.get(`/api/user/${page}/pagination`)
        .then(res=>{
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        }).catch(err=>{
        if(err.response&&err.response.data&&err.response.data.msg) {
            alert(err.response.data.msg);
        } else {
            alert(err.response.data.msg);
        }
        })
}

export  const searchUsers = (key, page) => dispatch => {

    if(!page) page = 0;
    axios.get(`/api/user/${page}/${key}/search`)
        .then(res=>{
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        }).catch(err=>{
        if(err.response&&err.response.data&&err.response.data.msg) {
            alert(err.response.data.msg);
        } else {
            alert(err.response.data.msg);
        }
    })
}



export  const deleteUser = (userData, page, search) => dispatch => {

    axios.delete(`/api/user/${userData._id}`)
        .then(()=>{
            if(search&&search.length>0) {
                dispatch(searchUsers(search, page));
            } else {
                dispatch(getUsers(page));
            }

        }).catch(err=>{
            if(err.response&&err.response.data&&err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                alert(err.response.data.msg);
            }

        })
}

