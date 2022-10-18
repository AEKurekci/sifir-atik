import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Platform} from "react-native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from "../constants/Colors";
import Home from "../screens/Home";
import Animals from "../screens/Animals";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

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
                options={defaultHeaderStyle}/>
            <HomeStackNavigator.Screen
                name='ProductDetailsScreen'
                component={ProductDetailsScreen}
                options={defaultHeaderStyle}
            />
        </ProfileStackNavigator.Navigator>
    )
}

const AnimalsStackNavigator = createStackNavigator();

const AnimalsNavigator = () => {
    return (
        <AnimalsStackNavigator.Navigator>
            <AnimalsStackNavigator.Screen
                name='AnimalsScreen'
                component={Animals}
                options={defaultHeaderStyle} />
        </AnimalsStackNavigator.Navigator>
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
                name='Animals'
                component={AnimalsNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='paw' size={24} color={fontColor}/>
                        )
                    },
                    tabBarLabel: 'Patiler'
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