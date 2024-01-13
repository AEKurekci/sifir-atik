import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Product from "../components/Product";

const FavoritesScreen = (props) => {
    console.log('FavoritesScreen: ',props.route.name)
    const productScreenPath = props.route.params ? props.route.params.productScreenPath : null;
    const profileScreenPath = props.route.params ? props.route.params.profileScreenPath : null;
    const [favorites, setFavorites] = useState([]);
    const products = useSelector(state => state.products.products)
    const user = useSelector(state => state.users.user)

    useEffect(() => {
        if(products && products.length > 0){
            setFavorites(products.filter(p => user.favorites.includes(p.id)))
        }
    }, [products])

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={favorites}
                style={styles.screen}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={(renderItem) =>
                    <Product
                        navigation={props.navigation}
                        product={renderItem.item}
                        productScreenPath={productScreenPath}
                        profileScreenPath={profileScreenPath}
                    />
                }/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})

export default FavoritesScreen;