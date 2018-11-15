
import {GET_USERS, SET_USER, DELETE_USER, UPDATE_USER} from "../actions/types"

const initialState = {
    users: [],
    page: 0,
    pages: 0,
    countUsers: 0,
    search: ''
}

export default function (state=initialState, action) {

    switch (action.type) {
        case GET_USERS:
            return {
                ...state, // spread operator
                users: action.payload.users,
                page: action.payload.page,
                pages: action.payload.pages,
                countUsers: action.payload.countUsers,
            }
        case SET_USER:
            state.users.push(action.payload);
            return {
                ...state
            }
        case DELETE_USER:
            state.users.splice(state.users.indexOf(action.payload, 1));

            return {
                ...state
            }
        case UPDATE_USER:
            // state.userBlogs.splice(state.userBlogs.indexOf(action.payload, 1));
            console.log(findById(state.users, action.payload._id), state.users, action.payload)
            state.users[findById(state.users, action.payload._id)] = action.payload;
            return {
                ...state
            }
        default:
            return state;

    }

}


const findById = (arr, id)=>{
    for(var i = arr.length - 1; i >= 0 ; i--)
        if(arr[i]._id===id) return i;
}