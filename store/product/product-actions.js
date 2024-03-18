import {productActions} from "./product-reducer";
import useHttp, {HOST} from "../../hooks/use-http";

export const fetchProduct = () => {
    return async (dispatch, getState) => {
        const fetchData = async (path) => {
            const response = await fetch(HOST + ':3001/' + path, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error('Unable to fetch product data :(')
            }
            return await response.json();
        }

        try{
            const response = await fetchData('shares');
            dispatch(productActions.fetchProducts({
                productList: response
            }));
            const user = getState().users.user;
            if(user){
                dispatch(productActions.fetchUserProducts({
                    userProductList: response.filter(product => product.ownerId === user.id)
                }))
            }

        }catch (err){
            console.log(err.message)
        }
    }
}

export const saveProduct = (product) => {
    return async (dispatch) => {
        try{
            const response = await useHttp(
                    'shares',
                    3001,
                    'POST',
                    {"Content-Type": "application/json"},
                    JSON.stringify(product)
                );
            console.log(response)
            dispatch(productActions.addProduct({
                product: response
            }))
        } catch (err) {
            console.log(err.message)
        }
    }
}

export const fetchUserProducts = () => {
    return async (dispatch, getState) => {
        try{
            const response = await useHttp('shares', 3001);
            const user = getState().users.user;
            console.log(user)
            if(user){
                dispatch(productActions.fetchUserProducts({
                    userProductList: response.filter(product => product.ownerId === user.id)
                }))
            }
        }catch (err) {
            console.log(err.message)
        }
    }
}