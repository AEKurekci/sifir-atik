import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authActions} from "../store/auth/auth-reducer";
import {fetchUserProducts} from "../store/product/product-actions";
import {authenticate, logout, refreshData} from "../store/auth/auth-actions";

const AuthenticationStartupScreen = props => {
    const dispatch = useDispatch();
    //dispatch(logout());
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            console.log('userData', userData)
            if(!userData){
                dispatch(authActions.setDidTry({
                    didTry: true
                }))
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, expiration, email, userId} = transformedData;
            console.log(expiration)
            const expirationDate = new Date(expiration);
            console.log(expirationDate)
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            try{
                if(expirationDate <= new Date() || !token || !email){
                    //expired, refresh token
                    await dispatch(refreshData({refreshToken}))
                    await dispatch(fetchUserProducts())
                }else{
                    //logged in
                    await dispatch(authenticate(token, refreshToken, userId, email))
                }
            }catch (err) {
                Alert.alert('Error!', err.message.toString(), [
                    {
                        text: 'Tamam',
                        onPress: () => {
                            dispatch(logout());
                        }
                    }
                ])
            }
        }
        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text>Kimlik Doğrulanıyor...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AuthenticationStartupScreen;