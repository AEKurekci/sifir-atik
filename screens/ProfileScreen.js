import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import Product from "../components/Product";
import Colors from "../constants/Colors";

const ProfileScreen = (props) => {
    const [userProducts, setUserProducts] = useState([]);
    const me = useSelector(state => state.users.user)
    const [user, setUser] = useState(me)
    const users = useSelector(state => state.users.users);
    const userId = props.route !== undefined && props.route.params !== undefined ? props.route.params.userId : undefined

    const products = useSelector(state => state.products.products)

    useEffect(() => {
        if(userId !== undefined){
            const filteredUsers = users.filter(u => u.id === userId);
            if(filteredUsers.length > 0){
                setUser(filteredUsers[0])
            }
        }
        if(user){
            props.navigation.setOptions({
                headerTitle: user.name
            })
            setUserProducts(products.filter(p => p.owner.id === user.id))
        }
    }, [users, products, user, userId])

    if(userProducts.length === 0){
        return <ActivityIndicator style={styles.screen} size='large' color={Colors.primary} />
    }

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