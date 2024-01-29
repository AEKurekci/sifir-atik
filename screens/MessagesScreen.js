import {FlatList, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import MessagingLine from "../components/MessagingLine";
import Colors from "../constants/Colors";
import {Searchbar} from "react-native-paper";

const MessagesScreen = (props) => {
    const user = useSelector(state => state.users.user)
    const users = useSelector(state => state.users.users)
    const products = useSelector(state => state.products.products)
    const [searchMessage, setSearchMessage] = useState('');

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: () => (
                <Searchbar
                    style={styles.search}
                    placeholderTextColor={'#ccc'}
                    placeholder="Mesajlarda ara..."
                    onChangeText={setSearchMessage}
                    value={searchMessage}
                    inputStyle={styles.searchInput}
                />
            )
        })
    }, [searchMessage])

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                hidden={false}
                backgroundColor={Colors.primary}
                style={styles.screen}/>
            <FlatList
                data={user.messages}
                style={styles.screen}
                keyExtractor={item => item.id.toString()}
                renderItem={(renderItem) => {
                    let date = new Date(renderItem.item.message[renderItem.item.message.length - 1].t);
                    let targetUser = users.filter(u => u.id === renderItem.item.user)
                    let targetProduct = products.filter(p => p.id === renderItem.item.productId)
                    return (
                        <MessagingLine
                            message={renderItem.item}
                            user={user}
                            target={targetUser[0]}
                            product={targetProduct[0]}
                            rightIcon='trash'
                            date={date} />
                    )
                }}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        paddingHorizontal: 3
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

export default MessagesScreen;