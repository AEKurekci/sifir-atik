import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product/product-reducer";
import userReducer from "./user/user-reducer";
import addressReducer from "./address/address-reducer";
import authReducer from "./auth/auth-reducer";

const store = configureStore({
    reducer: {
        products: productReducer.reducer,
        users: userReducer.reducer,
        address: addressReducer.reducer,
        auth: authReducer.reducer
    }
})

export default store;