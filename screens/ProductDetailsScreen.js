import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import useHttp from "../hooks/use-http";
import Colors from "../constants/Colors";
import Line from "../components/Line";
import MapPreview from "../components/MapPreview";
import Carousel from "../components/Carousel";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import {FontAwesome5} from "@expo/vector-icons";
import Bubble from "../components/Bubble";
import ProfileLine from "../components/ProfileLine";

const ProductDetailsScreen = (props) => {
    console.log(props.route.name)
    const product = props.route.params ? props.route.params.product : null;
    const profileScreenPath = props.route.params ? props.route.params.profileScreenPath : null;
    console.log('product detail profile path: ', profileScreenPath)
    const [createdAt, setCreatedAt] = useState(null);
    const [expires, setExpires] = useState(null);
    const owner = props.route.params ? props.route.params.owner : null;
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [address, setAddress] = useState(null)

    const getAddress = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try{
            const data = await useHttp(`addresses/${owner.addressId}`, '3003')
            console.log(data)
            setAddress(data);
        }catch (err) {
            setError('Fetching Address Fail -' + err.message)
        }finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if(owner.addressId !== undefined){
            getAddress()
        }
    }, [owner])

    useEffect(() => {
        const createDate = new Date(product.createdAt);
        setCreatedAt(createDate.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'}))
        const expireDate = new Date(product.expiresIn);
        setExpires(expireDate.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'}))
    }, [product])

    useEffect(() => {
        if(owner){
            props.navigation.setOptions({
                headerTransparent: true,
                headerTitle: ''
            })
        }
    }, [owner])

    const onScrollHandler = (e) => {
        const {navigation} = props;
        const currentOffset = e.nativeEvent.contentOffset.y;
        const dif = currentOffset - (this.offset || 0);
        if(dif < 0){
            navigation.setOptions({
                tabBarStyle:{
                    display: 'flex'
                }
            })
        }else{
            navigation.setOptions({
                tabBarStyle:{
                    display: 'none'
                }
            })
        }
        this.offset = currentOffset;
    }

    const onPressProfileHandler = (userId) => {
        props.navigation.navigate(profileScreenPath, {
            userId,
            detailPath: props.route.name,
            profileScreenPath
        })
    }

    if(isLoading || !address){
        return <ActivityIndicator style={styles.screen} size='large' color={Colors.primary} />
    }

    if(!isLoading && error){
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                hidden={true}
                style={styles.screen}/>
            <ScrollView style={styles.screen}>
                    <Carousel items={product.images} />
                    <View style={styles.detailsContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{product.title}</Text>
                        </View>
                        <View style={styles.locationDate}>
                            <View style={styles.row}>
                                <Ionicons name='ios-location-sharp' size={14} color='black' />
                                <Text style={styles.subTitle}>{address.text}</Text>
                            </View>
                            <View style={styles.col}>
                                <View style={styles.row}>
                                    <Text style={styles.subTitle}>Paylaşıldı: {createdAt}</Text>
                                    <FontAwesome5 style={{paddingLeft: 2}} name='calendar-alt' size={14} color='black' />
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.subTitle}>Son: {expires}</Text>
                                    <Ionicons style={{paddingLeft: 2}} name='time-sharp' size={14} color='black' />
                                </View>
                            </View>
                        </View>
                        <Line />
                        <View style={styles.description}>
                            <Title>Detaylar</Title>
                            <View style={styles.row}>
                                {product.keywords.map((k, i) => (
                                    <Bubble index={i} key={i.toString()}>{k}</Bubble>
                                ))}
                            </View>
                        </View>
                        <Line />
                        <View style={styles.description}>
                            <Title>Açıklama</Title>
                            <Text>{product.description}</Text>
                        </View>
                        <Line/>
                        <Title>Paylaşan</Title>
                        <ProfileLine user={product.owner} rightIcon='chatbubble-ellipses' onPressProfile={onPressProfileHandler}/>
                        <Line/>
                        <Title>İlan Konumu</Title>
                        <View style={styles.mapContainer}>
                            <MapPreview location={address.location} text={address.text} />
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
}

export const screenOptions = (navData) => {
    return {
        headerRight: () =>(
            <TouchableOpacity style={styles.rightHeader}>
                <Ionicons name='share-social' size={22} color='white' />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    detailsContainer:{
        paddingHorizontal: 8,
        backgroundColor: '#e3e3e3'
    },
    screen: {
        width: '100%',
        height: '100%'
    },
    imageContainer:{
        width: '100%',
        height: 300,
        marginTop: 20
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 2
    },
    locationDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 2
    },
    title:{
        fontWeight: '700',
        fontSize: 22,
        fontFamily: 'poppins-semi-bold'
    },
    subTitle:{
        fontSize: 14,
        fontFamily: 'poppins'
    },
    description: {
        paddingHorizontal: 10,
        minHeight: 130,
        backgroundColor: '#d7d6d6',
        borderRadius: 8,
        marginVertical: 10
    },
    row:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    col:{
        display:"flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-end"
    },
    mapContainer:{
        paddingTop: 10
    },
    rightHeader:{
        paddingRight: 15
    }
})
export default ProductDetailsScreen;