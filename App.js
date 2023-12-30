import React, {useCallback, useEffect, useState} from "react";
import * as Font from 'expo-font';
import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import {Provider} from "react-redux";
import store from "./store";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
        'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'roboto': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
        'roboto-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
        'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf')
    });
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);
/*
    const main = <Provider store={store}>
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    </Provider>

    useEffect(() => {
        async function prepare(){
            try{
                console.log('font')
                await Font.loadAsync({
                    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
                    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
                    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
                    'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
                    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
                    'roboto': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
                    'roboto-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
                    'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf')
                });
                console.log('fontt')
            }catch (e) {
                console.log('An error occurred while loading fonts')
                console.warn(e)
            }finally {
                console.log('fonttt')
                setFontLoaded(true)
            }
        }
        prepare();
    }, [])

    const onLayoutRootView = useCallback(async () => {
        console.log(fontLoaded)
        if(fontLoaded){
            console.log('hide')
            await SplashScreen.hideAsync();
        }
    }, [fontLoaded])

    if(!fontLoaded){
        return null
    }

    console.log('log')
*/

    useEffect(() => {
        async function prepare() {
            try {
                await fetchFonts();
            } catch (e) {
                console.error('An error occurred while loading fonts')
            } finally {
                // Tell the application to render
                setFontLoaded(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if(fontLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontLoaded])

    if (!fontLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <NavigationContainer onReady={onLayoutRootView}>
                <AppNavigator/>
            </NavigationContainer>
        </Provider>
    );
}
