import React, {useState} from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import AddCategory from "../components/AddCategory";
import Colors from "../constants/Colors";

const AddProductScreen = (props) => {
    const [categories, setCategories] = useState([
        {id: 0, text: 'Yemek', value: 0, icon: 'Ionicons', iconText: 'fast-food-outline', selected: false},
        {id: 1, text: 'Giyim', value: 1, icon: 'MaterialCommunityIcons', iconText: 'tshirt-crew', selected: false},
        {id: 2, text: 'Ayakkabı', value: 2, icon: 'MaterialCommunityIcons', iconText: 'shoe-heel', selected: false},
        {id: 3, text: 'Mobilya', value: 3, icon: 'FontAwesome5', iconText: 'couch', selected: false},
        {id: 4, text: 'Elektronik', value: 4, icon: 'Ionicons', iconText: 'phone-portrait-outline', selected: false},
        {id: 5, text: 'Kitap & Kırtasiye', value: 5, icon: 'MaterialCommunityIcons', iconText: 'bookshelf', selected: false},
        {id: 6, text: 'Hobi & Yaşam', value: 6, icon: 'Ionicons', iconText: 'basketball-outline', selected: false},
        {id: 7, text: 'Patiler', value: 7, icon: 'Ionicons', iconText: 'paw', selected: false}
    ]);

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                hidden={false}
                backgroundColor={Colors.primary}
                style={styles.screen}/>
            <FlatList
                data={categories}
                keyExtractor={c => c.value.toString()}
                numColumns={2}
                renderItem={(renderItem) => (
                    <AddCategory item={renderItem.item} navigation={props.navigation} />
            )} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        display: "flex"
    }
})

export default AddProductScreen;