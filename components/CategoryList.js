import React, {useCallback, useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import Category from "./Category";

const CategoryList = props => {
    const [categories, setCategories] = useState([
        {text: 'Tümü', value: -1, icon: 'Ionicons', iconText: 'fast-food-outline', selected: true},
        {text: 'Yemek', value: 0, icon: 'Ionicons', iconText: 'fast-food-outline', selected: false},
        {text: 'Giyim', value: 1, icon: 'MaterialCommunityIcons', iconText: 'tshirt-crew', selected: false},
        {text: 'Ayakkabı', value: 2, icon: 'MaterialCommunityIcons', iconText: 'shoe-heel', selected: false},
        {text: 'Mobilya', value: 3, icon: 'FontAwesome5', iconText: 'couch', selected: false},
        {text: 'Elektronik', value: 4, icon: 'Ionicons', iconText: 'phone-portrait-outline', selected: false},
        {text: 'Kitap & Kırtasiye', value: 5, icon: 'MaterialCommunityIcons', iconText: 'bookshelf', selected: false},
        {text: 'Hobi & Yaşam', value: 6, icon: 'Ionicons', iconText: 'basketball-outline', selected: false},
        {text: 'Patiler', value: 7, icon: 'Ionicons', iconText: 'paw', selected: false}
    ]);

    const filterProductHandler = useCallback((categoryId) => {
        setCategories(categories.map(c => ({
            ...c,
            selected: c.value === categoryId
        })))
        props.filterProduct(categoryId);
    }, [categories, props.filterProduct])

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.screen}
            keyExtractor={item => item.value}
            data={categories}
            horizontal
            renderItem={(renderItem) => {
                return <Category item={renderItem.item} filterProduct={filterProductHandler} />
        }}/>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '8%',
        backgroundColor: '#ccc'
    }
})

export default CategoryList;