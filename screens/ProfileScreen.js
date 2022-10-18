import React, {useEffect} from "react";
import {FlatList, Image, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import Product from "../components/Product";

const ProfileScreen = (props) => {
    const user = useSelector(state => state.users.user)
    const userProducts = useSelector(state => state.products.userProducts)
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: user.name
        })
    }, [user])

    const HeaderComp = () => {
        return <Image style={styles.img} source={{uri: user.imageURL}} />
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={userProducts}
                style={styles.screen}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={HeaderComp}
                renderItem={(renderItem) => {
                    return (
                        <Product
                            navigation={props.navigation}
                            product={renderItem.item}
                            user
                            />
                    )
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    img:{
        width: '100%',
        height: 100
    }
})

export default ProfileScreen;