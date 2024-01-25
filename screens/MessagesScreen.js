import {FlatList, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import MessagingLine from "../components/MessagingLine";
import Colors from "../constants/Colors";

const MessagesScreen = (props) => {
    const user = useSelector(state => state.users.user)
    const users = useSelector(state => state.users.users)
    const products = useSelector(state => state.products.products)

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
    }
})

export default MessagesScreen;