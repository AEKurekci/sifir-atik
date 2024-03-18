import useHttp, {defaultHeader} from "../../hooks/use-http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authActions} from "./auth-reducer";


export const login = (body) => {
    return async dispatch => {
        try{
            const data = await useHttp('api/v1/authentication/sign-in', '3333', 'POST', defaultHeader, JSON.stringify(body));
            console.log(data)
            await saveDataToStorage(data.accessToken, data.refreshToken)
            await dispatch(authActions.setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }))
        }catch (err){
            console.log(err.message)
        }
    }
}

export const signUp = (user) => {
    return async dispatch => {
        try{
            const data = await useHttp('api/v1/authentication/sign-up', '3333', 'POST', defaultHeader, JSON.stringify(user));
            console.log(data)
        }catch (err){
            console.log(err.message)
        }
    }
}

const saveDataToStorage = async (
    token,
    refreshToken
) => {
    await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
            token: token
        })
    );
    await AsyncStorage.setItem("refreshToken", refreshToken);
};