import {Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ProductList from "../components/ProductList";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../store/user/user-actions";
import {fetchProduct, fetchUserProducts} from "../store/product/product-actions";
import CategoryList from "../components/CategoryList";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import {productActions} from "../store/product/product-reducer";
import {fetchAddress} from "../store/address/address-action";
import {Searchbar} from "react-native-paper";

const Home = (props) => {
    console.log(props.route.name)
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const isAndroid = Platform.OS === 'android';
    const fontColor = isAndroid ? Colors.secondary : Colors.primary;

    const user = useSelector(state => state.users.user)
    const products = useSelector(state => state.products.products)
    const filteredProducts = useSelector(state => state.products.filteredProducts)

    const fetchData = useCallback(async () => {
        setIsRefreshing(true)
        setError(null)
        try{
            await dispatch(fetchProduct());
        }catch (err){
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [])

    const filterProduct = useCallback(async (category) => {
        setIsRefreshing(true)
        setError(null)
        try{
            let productList;
            if(category > -1)
                productList = products.filter(product => product.category.id === category);
            else
                productList = products;
            await dispatch(productActions.filterProduct({
                productList
            }))
        }catch (err){
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [products])

    useEffect(() => {
        fetchData()
        dispatch(fetchUsers())
        //dispatch(login())
        dispatch(fetchAddress())
    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: () => (
                <Searchbar
                    style={styles.search}
                    placeholderTextColor={'#ccc'}
                    placeholder="İhtiyaçlarını ara..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    inputStyle={styles.searchInput}
                />
            ),
            headerRight: () => (
                <Ionicons style={{paddingRight: 5}} name='notifications' size={30} color='white' />
            )
        })
    }, [searchQuery])

    useEffect(() => {
        if(user){
            dispatch(fetchUserProducts())
        }
    }, [user])

    if(!isRefreshing && error){
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                hidden={false}
                backgroundColor={Colors.primary}
                style={styles.screen}/>
            <View style={styles.row}>
                <View style={styles.categoryList}>
                    <CategoryList filterProduct={filterProduct}/>
                </View>
                <TouchableOpacity useForeground style={styles.icon}>
                    <Ionicons name="md-options" size={Dimensions.get('window').width / 10} color={fontColor}/>
                </TouchableOpacity>
            </View>
            <ProductList
                navigation={props.navigation}
                products={filteredProducts}
                headerItems={products}
                fetchData={fetchData}
                isRefreshing={isRefreshing} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    row:{
        display:"flex",
        flexDirection: "row"
    },
    categoryList:{
        flex:8
    },
    icon:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ccc'
    },
    search:{
        width: 250,
        height: '70%'
    },
    searchInput: {
        textAlignVertical: 'top',
        paddingTop: 7,
        lineHeight: 27
    }
})

export default Home;