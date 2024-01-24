import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product/product-reducer";
import userReducer from "./user/user-reducer";
import addressReducer from "./address/address-reducer";

const store = configureStore({
    reducer: {
        products: productReducer.reducer,
        users: userReducer.reducer,
        address: addressReducer.reducer
    }
})

export default store;