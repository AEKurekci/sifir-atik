import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import Product from "../components/Product";
import Colors from "../constants/Colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ProfileHeader from "../components/ProfileHeader";

const ProfileScreen = (props) => {
    console.log('ProfileScreen: ', props.route.name)
    const productScreenPath = props.route.params ? props.route.params.productScreenPath : null;
    const profileScreenPath = props.route.params ? props.route.params.profileScreenPath : null;
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
                headerTransparent: true,
                headerTitle: ''
            })
            setUserProducts(products.filter(p => p.owner.id === user.id))
        }
    }, [users, products, user, userId])

    if(userProducts.length === 0){
        return <ActivityIndicator style={styles.screen} size='large' color={Colors.primary} />
    }

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                hidden={true}
                style={styles.screen}/>
            <FlatList
                data={userProducts}
                style={styles.screen}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={<ProfileHeader user={user} />}
                renderItem={(renderItem) => {
                    return (
                        <Product
                            navigation={props.navigation}
                            product={renderItem.item}
                            user
                            productScreenPath={productScreenPath}
                            profileScreenPath={profileScreenPath}
                            />
                    )
                }}/>
        </SafeAreaView>
    )
}

export const screenOptions = () => {
    return {
        headerRight: () =>(
            <TouchableOpacity style={styles.rightHeader}>
                <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    rightHeader:{
        paddingRight: 15
    }
})

export default ProfileScreen;