import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {useSelector} from "react-redux";
import Product from "../components/Product";
import Colors from "../constants/Colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ProfileHeader from "../components/ProfileHeader";

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
            if(props.navigation.getParent() !== undefined){
                props.navigation.getParent().setOptions({
                    headerTransparent: true,
                    headerTitle: ''
                })
            }
            props.navigation.setOptions({
                headerTransparent: true,
                headerTitle: ''
            })
            setUserProducts(products.filter(p => p.owner.id === user.id))
        }
    }, [users, products, user, userId])

    useEffect(() => {
        const subs = BackHandler.addEventListener('hardwareBackPress', () => {
            if(props.navigation.getParent() !== undefined){
                props.navigation.getParent().setOptions({
                    headerTransparent: false,
                    headerTitle: 'Favoriler'
                })
            }
        })
        return () => subs.remove();
    })

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
                            />
                    )
                }}/>
        </SafeAreaView>
    )
}

export const screenOptions = (navData) => {
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