import {StyleSheet, View} from "react-native";
import ProductList from "../components/ProductList";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchUsers} from "../store/user/user-actions";

const Home = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'Sıfır Atık'
        })
    }, [])

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