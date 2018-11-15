import axios from "axios";
import jwt_decode from 'jwt-decode';
import store from "../store";
import {SET_CURRENT_USER} from "../actions/types";
export default function() {

    const token = localStorage.getItem("token")



	if(token) {
        const decoded = jwt_decode(token);
        if(decoded.exp < Date.now()/1000) {
            localStorage.removeItem("token");
        } else {
            axios.defaults.headers.common["Authorization"] = token;

            store.dispatch({
                type:SET_CURRENT_USER,
                payload: {
                    isAuthenticated:true,
                    user: decoded
                }
            })

        }
	} else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];

    }

}
