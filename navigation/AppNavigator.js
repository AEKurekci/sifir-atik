import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Platform} from "react-native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from "../constants/Colors";
import Home from "../screens/Home";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetailsScreen, {screenOptions as ProductDetailsOptions} from "../screens/ProductDetailsScreen";
import AddProductScreen from "../screens/AddProductScreen";
import MessagesScreen from "../screens/MessagesScreen";

const defaultHeaderStyle = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleAlign: 'center',
    headerTitleStyle:{
        color: 'white'
    },
    headerTintColor: 'white'
}

const productDetailHeaderStyle = {
    headerTransparent: true
}

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={Home}
                options={{...defaultHeaderStyle, ...{
                    headerTitle: "Bi'Kap"
                }}}
                />
            <HomeStackNavigator.Screen
                name='ProductDetailsScreen'
                component={ProductDetailsScreen}
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProductDetailsOptions(props)
                    }
                } }
            />
            <HomeStackNavigator.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={defaultHeaderStyle}
            />
        </HomeStackNavigator.Navigator>
    )
}

const ProfileStackNavigator = createStackNavigator();

const ProfileNavigator = () => {
    return (
        <ProfileStackNavigator.Navigator>
            <ProfileStackNavigator.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={defaultHeaderStyle}
            />
            <ProfileStackNavigator.Screen
                name='ProductDetailsScreen'
                component={ProductDetailsScreen}
                options={{...defaultHeaderStyle, ...productDetailHeaderStyle}}
            />
            <ProfileStackNavigator.Screen
                name='AddProductScreen'
                component={AddProductScreen}
                options={defaultHeaderStyle}
                />
        </ProfileStackNavigator.Navigator>
    )
}

const FavoritesStackNavigator = createStackNavigator();

const FavoritesNavigator = () => {
    return (
        <FavoritesStackNavigator.Navigator>
            <FavoritesStackNavigator.Screen
                name='Favorilerim'
                component={FavoritesScreen}
                options={defaultHeaderStyle} />
            <FavoritesStackNavigator.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={defaultHeaderStyle}
            />
        </FavoritesStackNavigator.Navigator>
    )
}

const AddNewStackNavigator = createStackNavigator();

const AddNewNavigator = () => {
    return (
        <AddNewStackNavigator.Navigator>
            <AddNewStackNavigator.Screen
                name='Ne Paylaşıyorsun?'
                component={FavoritesScreen}
                options={defaultHeaderStyle} />
        </AddNewStackNavigator.Navigator>
    )
}

const MessagingStackNavigator = createStackNavigator();

const MessagingNavigator = () => {
    return (
        <MessagingStackNavigator.Navigator>
            <MessagingStackNavigator.Screen
                name='Mesajlarımda Ara...'
                component={MessagesScreen}
                options={defaultHeaderStyle} />
        </MessagingStackNavigator.Navigator>
    )
}

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const TabNavigator = () => {
    const isAndroid = Platform.OS === 'android';
    const fontColor = isAndroid ? Colors.secondary : Colors.primary;
    return(
        <Tab.Navigator
            labeled={true}
            shifting={true}
            activeColor={Colors.secondary}
            inactiveColor={Colors.secondary}
            barStyle={{
                backgroundColor: Colors.primary,
            }}>
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='home' size={24} color={fontColor} />
                        )
                    },
                    tabBarLabel: 'Ana Sayfa'
                })} />
            <Tab.Screen
                name='Favorites'
                component={FavoritesNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='heart' size={24} color={fontColor}/>
                        )
                    },
                    tabBarLabel: 'Favoriler'
                })}/>
            <Tab.Screen
                name='Paylaş'
                component={AddNewNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='add-circle' size={24} color={fontColor}/>
                        )
                    }
                })}/>
            <Tab.Screen
                name='Mesajlarım'
                component={MessagingNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='chatbubble-ellipses' size={24} color={fontColor}/>
                        )
                    }
                })}/>
            <Tab.Screen name='Profile'
                        component={ProfileNavigator}
                        options={() => ({
                            tabBarIcon: () => {
                                return(
                                    <FontAwesome name='user' size={24} color={fontColor} />
                                )
                            },
                            tabBarLabel: 'Profilim'
                        })} />
        </Tab.Navigator>
    )
}

export default TabNavigator;