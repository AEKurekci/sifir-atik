import {productActions} from "./product-reducer";
import {HOST} from "../../hooks/use-http";

export const fetchProduct = () => {
    return async dispatch => {
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
            const data = await response.json()
            return data;
        }

        try{
            const response = await fetchData('shares');
            dispatch(productActions.fetchProducts({
                productList: response
            }));

        }catch (err){
            console.log(err.message)
        }
    }
}