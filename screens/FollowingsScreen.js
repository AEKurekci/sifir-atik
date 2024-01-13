import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ProfileLine from "../components/ProfileLine";

const FollowingsScreen = (props) => {
    console.log('FollowingsScreen: ',props.route.name)
    const [favorites, setFavorites] = useState([]);
    const users = useSelector(state => state.users.users)
    const user = useSelector(state => state.users.user)

    useEffect(() => {
        if(users && users.length > 0){
            setFavorites(users.filter(u => user.favorites.includes(u.id)))
        }
    }, [users])

    const onPressProfileHandler = (userId) => {
        props.navigation.navigate('ProfileScreenFromFav', {
            userId,
            productScreenPath: 'ProductDetailsScreenFromFav',
            profileScreenPath: 'ProfileScreenFromFav'
        })
    }

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={favorites}
                style={styles.screen}
                keyExtractor={item => item.id.toString()}
                renderItem={(renderItem) => {
                    return (
                        <ProfileLine
                            user={renderItem.item}
                            rightIcon='chevron-forward-outline'
                            onPressProfile={onPressProfileHandler}/>
                    )
                }}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        paddingHorizontal: 3
    }
})

export default FollowingsScreen;