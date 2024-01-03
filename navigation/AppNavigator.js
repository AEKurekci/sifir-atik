import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Dimensions, Platform} from "react-native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from "../constants/Colors";
import Home from "../screens/Home";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen, {screenOptions as ProfileScreenOptions} from "../screens/ProfileScreen";
import ProductDetailsScreen, {screenOptions as ProductDetailsOptions} from "../screens/ProductDetailsScreen";
import AddProductScreen from "../screens/AddProductScreen";
import MessagesScreen from "../screens/MessagesScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import FollowingsScreen from "../screens/FollowingsScreen";

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
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProfileScreenOptions(props)
                    }
                } }
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
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProfileScreenOptions(props)
                    }
                } }
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
                name='FavNavigator'
                component={FavNavigator}
                options={{
                    headerShown: false
                }} />
            <FavoritesStackNavigator.Screen
                name='ProductDetailsScreen'
                component={ProductDetailsScreen}
                options={{...defaultHeaderStyle, ...productDetailHeaderStyle}}
            />
            <FavoritesStackNavigator.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProfileScreenOptions(props)
                    }
                } }
            />
        </FavoritesStackNavigator.Navigator>
    )
}

const FollowingsStackNavigator = createStackNavigator();

const FollowingsNavigator = () => {
    return (
        <FollowingsStackNavigator.Navigator>
            <FollowingsStackNavigator.Screen
                name='FavNavigator'
                component={FavNavigator}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerTitle: 'Favoriler'
                    }
                }} />
            <FollowingsStackNavigator.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProfileScreenOptions(props)
                    }
                } }
            />
        </FollowingsStackNavigator.Navigator>
    )
}

const FavTopTabNavigator = createMaterialTopTabNavigator();

const FavNavigator = () => {
    return (
        <FavTopTabNavigator.Navigator
            screenOptions={{
                tabBarScrollEnabled: true
            }}
        >
            <FavTopTabNavigator.Screen
                name='FavoritesScreen'
                component={FavoritesScreen}
                options={{
                    tabBarLabel: 'Favori Ürünler',
                    tabBarStyle:{
                        width: Dimensions.get('window').width + 100
                    }
                }}
            />
            <FavTopTabNavigator.Screen
                name='FollowingsScreen'
                component={FollowingsScreen}
                options={{
                    tabBarLabel: 'Takip Ettiklerim',
                    tabBarStyle:{
                        width: Dimensions.get('window').width + 100
                    }
                }}
            />
        </FavTopTabNavigator.Navigator>
    )
}

const FavStack = createStackNavigator();

const FavStackNavigator = () => {
    return (
        <FavStack.Navigator>
            <FavStack.Screen
                name='FavoritesNavigator'
                component={FavoritesNavigator}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerTitle: 'Favoriler'
                    }
            }}/>
            <FavStack.Screen
                name='FollowingsNavigator'
                component={FollowingsNavigator}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerTitle: 'Favoriler'
                    }
            }}/>
        </FavStack.Navigator>
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
                name='HomeNavigator'
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
                name='FavStackNavigator'
                component={FavStackNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='heart' size={24} color={fontColor}/>
                        )
                    },
                    tabBarLabel: 'Favoriler'
                })}/>
            <Tab.Screen
                name='AddNewNavigator'
                component={AddNewNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='add-circle' size={24} color={fontColor}/>
                        )
                    }
                })}/>
            <Tab.Screen
                name='MessagingNavigator'
                component={MessagingNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='chatbubble-ellipses' size={24} color={fontColor}/>
                        )
                    }
                })}/>
            <Tab.Screen name='ProfileNavigator'
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