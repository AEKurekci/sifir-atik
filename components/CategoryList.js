import React from "react";
import {FlatList, StyleSheet} from "react-native";
import Category from "./Category";

const CategoryList = props => {

    const categories = [
        {text: 'Tümü', value: -1, icon: 'Ionicons', iconText: 'fast-food-outline'},
        {text: 'Yemek', value: 0, icon: 'Ionicons', iconText: 'fast-food-outline'},
        {text: 'Giyim', value: 1, icon: 'MaterialCommunityIcons', iconText: 'tshirt-crew'},
        {text: 'Ayakkabı', value: 2, icon: 'MaterialCommunityIcons', iconText: 'shoe-heel'},
        {text: 'Mobilya', value: 3, icon: 'FontAwesome5', iconText: 'couch'},
        {text: 'Elektronik', value: 4, icon: 'Ionicons', iconText: 'phone-portrait-outline'},
        {text: 'Kitap & Kırtasiye', value: 5, icon: 'MaterialCommunityIcons', iconText: 'bookshelf'},
        {text: 'Hobi & Yaşam', value: 6, icon: 'Ionicons', iconText: 'basketball-outline'},
        {text: 'Patiler', value: 7, icon: 'Ionicons', iconText: 'paw'}
    ]

    return (
        <FlatList
            style={styles.screen}
            keyExtractor={item => item.value}
            data={categories}
            horizontal
            renderItem={(renderItem) => {
                return <Category item={renderItem.item} filterProduct={props.filterProduct} />
        }}/>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '8%',
        backgroundColor: '#abc'
    }
})

export default CategoryList;