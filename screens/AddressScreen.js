import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Button, Checkbox} from "react-native-paper";
import {SelectList} from "react-native-dropdown-select-list";
import {useSelector} from "react-redux";
import MapPreview from "../components/MapPreview";

const AddressScreen = (props) => {
    const user = props.route.params ? props.route.params.user : null;
    const category = props.route.params ? props.route.params.category : null;
    const [city, setCity] = useState(null)
    const [district, setDistrict] = useState(null)
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const cities = useSelector(state => state.address.cities)
    const [districts, setDistricts] = useState([])
    const [useMyAddress, setUseMyAddress] = useState(false);

    const goToSelectLocation = () => {
        props.navigation.navigate('AddressScreen')
    }

    const citySelectHandler = city => {
        setCity(city.il_adi)
        setDistricts(city.ilceler)
        setLat(city.lat)
        setLng(city.lng);
    }

    const districtSelectHandler = val => {
        console.log(val)
        if(val){
            let firstLetter = val.ilce_adi[0]
            let remainLetters = val.ilce_adi.substring(1)
            let dist = firstLetter + remainLetters.toLocaleLowerCase();
            console.log(dist)
            setDistrict(dist)
            setLat(val.lat)
            setLng(val.lng);
        }
    }

    const checkboxHandler = useCallback(() => {
        if(user && user.address !== undefined && user.address !== null){
            if(!useMyAddress){
                setUseMyAddress(true)
                setLat(user.address.lat)
                setLng(user.address.lng)
                let addressList = user.address.text.split('/')
                setCity(addressList[0])
                setDistrict(addressList[1])
            }else{
                setUseMyAddress(false)
                setLat(null)
                setLng(null)
                setCity(null)
                setDistrict(null)
            }
        }
    }, [user, useMyAddress])

    useEffect(() => {
        if(district !== null && district !== undefined && city !== null && city !== undefined &&
            lat !== null && lat !== undefined && lng !== null && lng !== undefined){
            props.navigation.navigate('AddDetailsScreen', {
                category,
                address: {
                    text: district + '/' + city,
                    lat,
                    lng
                }
            })
        }
    }, [city, category, lat, lng, district])

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
                        key: c,
                        value: c.il_adi
                    }))}
                    save='key'
                    placeholder='İl'
                    searchPlaceholder='Ara..'
                />
                <SelectList
                    boxStyles={styles.selectList}
                    setSelected={val => districtSelectHandler(val)}
                    data={districts.map(d => ({
                        key: d,
                        value: d.ilce_adi
                    }))}
                    save='key'
                    placeholder='İlçe'
                    searchPlaceholder='Ara..'
                    notFoundText='Önce İl seçiniz...'
                />
                <Checkbox.Item
                    label='Kayıtlı Adresimi Kullan'
                    status={useMyAddress ? 'checked' : 'unchecked'}
                    onPress={checkboxHandler} />
                {lat !== null && lng !== null &&
                    <View style={styles.mapContainer}>
                        <MapPreview lat={lat} lng={lng}/>
                    </View>}
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
    },
    mapContainer:{
        paddingTop: 10
    }
})

export default AddressScreen;