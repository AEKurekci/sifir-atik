import React, {useCallback, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Button} from "react-native-paper";
import {SelectList} from "react-native-dropdown-select-list";
import {useSelector} from "react-redux";

const AddressScreen = (props) => {
    const [city, setCity] = useState('İl')
    const [district, setDistrict] = useState('İlçe')
    const cities = useSelector(state => state.address.cities)
    const [districts, setDistricts] = useState([])

    const goToSelectLocation = () => {
        props.navigation.navigate('AddressScreen')
    }

    const citySelectHandler = useCallback(plaka => {
        setCity(plaka)
        for(let i = 0; i < cities.length; i++){
            if(cities[i].plaka_kodu === plaka){
                setDistricts(cities[i].ilceler)
                break
            }
        }
    }, [cities])

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView style={styles.form}>
                <Button
                    key={'location'}
                    style={styles.input}
                    buttonColor={'#fff'}
                    textColor={'#000'}
                    textAlignments='left'
                    theme={{
                        roundness: 3
                    }}
                    contentStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
                    onPress={goToSelectLocation}
                    icon='map-marker'
                    mode='outlined'>
                    Mevcut Konum
                </Button>
                <SelectList
                    boxStyles={styles.selectList}
                    setSelected={val => citySelectHandler(val)}
                    data={cities.map(c => ({
                        key: c.plaka_kodu,
                        value: c.il_adi
                    }))}
                    save='key'
                    placeholder='İl'
                    searchPlaceholder='Ara..'
                />
                <SelectList
                    boxStyles={styles.selectList}
                    setSelected={val => setDistrict(val)}
                    data={districts.map(c => ({
                        key: c.ilce_kodu,
                        value: c.ilce_adi
                    }))}
                    save='key'
                    placeholder='İlçe'
                    searchPlaceholder='Ara..'
                    notFoundText='Önce İl seçiniz...'
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export const screenOptions = (navData) => {
    return {
        headerBackImage: () => (
            <TouchableOpacity style={styles.leftHeader} onPress={() => navData.navigation.goBack(null)}>
                <MaterialCommunityIcons name="close" size={22} color="white" />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    screen:{
        display: "flex"
    },
    form:{
        marginHorizontal: 3
    },
    input:{
        marginTop: 7
    },
    selectList:{
        borderRadius: 15,
        marginTop: 7,
        backgroundColor: '#fff'
    },
    leftHeader:{
        paddingLeft: 15
    }
})

export default AddressScreen;