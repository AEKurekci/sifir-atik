import React, {useState} from "react";
import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import AddCategory from "../components/AddCategory";

const AddProductScreen = () => {
    const [categories, setCategories] = useState([
        {text: 'Yemek', value: 0, icon: 'Ionicons', iconText: 'fast-food-outline', selected: false},
        {text: 'Giyim', value: 1, icon: 'MaterialCommunityIcons', iconText: 'tshirt-crew', selected: false},
        {text: 'Ayakkabı', value: 2, icon: 'MaterialCommunityIcons', iconText: 'shoe-heel', selected: false},
        {text: 'Mobilya', value: 3, icon: 'FontAwesome5', iconText: 'couch', selected: false},
        {text: 'Elektronik', value: 4, icon: 'Ionicons', iconText: 'phone-portrait-outline', selected: false},
        {text: 'Kitap & Kırtasiye', value: 5, icon: 'MaterialCommunityIcons', iconText: 'bookshelf', selected: false},
        {text: 'Hobi & Yaşam', value: 6, icon: 'Ionicons', iconText: 'basketball-outline', selected: false},
        {text: 'Patiler', value: 7, icon: 'Ionicons', iconText: 'paw', selected: false}
    ]);

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={categories}
                keyExtractor={c => c.value.toString()}
                numColumns={2}
                renderItem={(renderItem) => (
                    <AddCategory item={renderItem.item} />
            )} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{

    }
})

export default AddProductScreen;