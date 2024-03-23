import useHttp, {defaultHeader} from "../../hooks/use-http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authActions} from "./auth-reducer";
import {getUser} from "../user/user-actions";
import {fetchUserProducts} from "../product/product-actions";


export const login = (body) => {
    return async dispatch => {
        try{
            const data = await useHttp('api/v1/authentication/sign-in', '3333', 'POST', defaultHeader, JSON.stringify(body));
            console.log(data)
            await saveDataToStorage(data.accessToken, data.refreshToken, data.expiration, data.email, data.userId)
            await dispatch(authenticate(data.accessToken, data.refreshToken, data.userId, data.email))
        }catch (err){
            console.log('login-->', err.message)
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

export const refreshData = (body) => {
    return async dispatch => {
        try{
            const data = await useHttp('api/v1/authentication/refresh-token', '3333', 'POST', defaultHeader, JSON.stringify(body));
            console.log(data)
            await saveDataToStorage(data.accessToken, data.refreshToken, data.expiration, data.email, data.userId)
            await dispatch(authenticate(data.accessToken, data.refreshToken, data.userId, data.email))
        }catch (err){
            throw err;
        }
    }
}

export const authenticate = (accessToken, refreshToken, userId, email) => {
    return async dispatch => {
        await dispatch(getUser({email}, accessToken))
        await dispatch(fetchUserProducts(accessToken))
        await dispatch(authActions.setTokens({
            userId,
            accessToken,
            refreshToken
        }))
    }
}

const saveDataToStorage = async (
    token,
    refreshToken,
    expiration,
    email,
    userId
) => {
    await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
            token: token,
            expiration: expiration,
            email,
            userId
        })
    );
    await AsyncStorage.setItem("refreshToken", refreshToken);
};

export const logout = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("refreshToken");
        dispatch(authActions.setDidTry({
            didTry: true
        }));
    }
};