import useHttp from "../../hooks/use-http";
import {addressActions} from "./address-reducer";


export const fetchAddress = () => {
    return async (dispatch) => {
        try{
            const response = await useHttp('cities', '3004');
            dispatch(addressActions.fetchAddress({
                cities: response
            }))
        }catch (err){
            console.log(err.message)
        }
    }
}