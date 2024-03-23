import useHttp, {defaultHeader} from "../../hooks/use-http";
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

export const getUser = (body, accessToken = null) => {
    return async (dispatch, getState) => {
        try{
            const token = accessToken ? accessToken : getState().auth.accessToken;
            const data = await useHttp('api/v1/user/getUser', '3333', 'POST',
                {
                    ...defaultHeader,
                    Authorization: 'Bearer ' + token
                },
                JSON.stringify(body));
            await dispatch(userActions.setUser({
                user: data
            }))
        }catch (err){
            console.log(err.message)
        }
    }
}
