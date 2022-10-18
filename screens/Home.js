import {StyleSheet, View} from "react-native";
import ProductList from "../components/ProductList";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, login} from "../store/user/user-actions";
import {fetchUserProducts} from "../store/product/product-actions";

const Home = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(login())
    }, [])

    useEffect(() => {
        if(user){
            dispatch(fetchUserProducts())
        }
    }, [user])

    return (
        <View style={styles.screen}>
            <ProductList navigation={props.navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})

export default Home;