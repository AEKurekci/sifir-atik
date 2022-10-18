import useHttp from "../../hooks/use-http";
import {userActions} from "./user-reducer";

export const fetchUsers = () => {
    return async dispatch => {
        try{
            const data = await useHttp('owners', '3002');
            dispatch(userActions.fetchUsers({
                users: data
            }))
        }catch (err){
            console.log(err.message)
        }
    }
}

export const login = () => {
    return async dispatch => {
        try{
            const data = await useHttp('owners', '3002');
            dispatch(userActions.login({
                user: data[0]
            }))
        }catch (err){
            console.log(err.message)
        }
    }
}