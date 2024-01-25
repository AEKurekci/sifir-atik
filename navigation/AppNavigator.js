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
import ProfileScreen, {screenOptions as ProfileScreenOptions} from "../screens/ProfileScreen";
import ProductDetailsScreen, {screenOptions as ProductDetailsOptions} from "../screens/ProductDetailsScreen";
import AddProductScreen from "../screens/AddProductScreen";
import MessagesScreen from "../screens/MessagesScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import FollowingsScreen from "../screens/FollowingsScreen";
import AddDetailsScreen from "../screens/AddDetailsScreen";
import AddressScreen, {screenOptions as AddressScreenOptions} from "../screens/AddressScreen";

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
                name='ProductDetailsScreenFromHome'
                component={ProductDetailsScreen}
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProductDetailsOptions(props)
                    }
                } }
                initialParams={{
                    profileScreenPath: 'ProfileScreenFromHome'
                }}
            />
            <HomeStackNavigator.Screen
                name='ProfileScreenFromHome'
                component={ProfileScreen}
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProfileScreenOptions(props)
                    }
                } }
                initialParams={{
                    productScreenPath: 'ProductDetailsScreenFromHome',
                    profileScreenPath: 'ProfileScreenFromHome'
                }}
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
                initialParams={{
                    productScreenPath: 'ProductDetailsScreenFromProfile',
                    profileScreenPath: 'ProfileScreen'
                }}
            />
            <ProfileStackNavigator.Screen
                name='ProductDetailsScreenFromProfile'
                component={ProductDetailsScreen}
                options={{...defaultHeaderStyle, ...productDetailHeaderStyle}}
                initialParams={{
                    productScreenPath: 'ProductDetailsScreenFromProfile',
                    profileScreenPath: 'ProfileScreen'
                }}
            />
            <ProfileStackNavigator.Screen
                name='AddProductScreen'
                component={AddProductScreen}
                options={defaultHeaderStyle}
                />
        </ProfileStackNavigator.Navigator>
    )
}

const FavTopTabNavigator = createMaterialTopTabNavigator();

const FavTopNavigator = () => {
    return (
        <FavTopTabNavigator.Navigator>
            <FavTopTabNavigator.Screen
                name='FavoritesScreen'
                component={FavoritesScreen}
                options={{
                    tabBarLabel: 'Favori Ürünler'
                }}
                initialParams={{
                    productScreenPath: 'ProductDetailsScreenFromFav',
                    profileScreenPath: 'ProfileScreenFromFav'
                }}
            />
            <FavTopTabNavigator.Screen
                name='FollowingsScreen'
                component={FollowingsScreen}
                options={{
                    tabBarLabel: 'Takip Ettiklerim'
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
                name='FavTopNavigator'
                component={FavTopNavigator}
                options={{
                    ...defaultHeaderStyle,
                    ...{headerTitle: 'Favoriler'}
                }} />
            <FavStack.Screen
                name='ProductDetailsScreenFromFav'
                component={ProductDetailsScreen}
                options={{...defaultHeaderStyle, ...productDetailHeaderStyle}}
                initialParams={{
                    productScreenPath: 'ProductDetailsScreenFromFav',
                    profileScreenPath: 'ProfileScreenFromFav'
                }}
            />
            <FavStack.Screen
                name='ProfileScreenFromFav'
                component={ProfileScreen}
                options={(props) => {
                    return {
                        ...defaultHeaderStyle,
                        ...ProfileScreenOptions(props),
                        animationEnabled: true
                    }
                } }
                initialParams={{
                    productScreenPath: 'ProductDetailsScreenFromFav',
                    profileScreenPath: 'ProfileScreenFromFav'
                }}
            />
        </FavStack.Navigator>
    )
}

const AddNewStackNavigator = createStackNavigator();

const AddNewNavigator = () => {
    return (
        <AddNewStackNavigator.Navigator>
            <AddNewStackNavigator.Screen
                name='TabNavigator'
                component={TabNavigator}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerTitle: '',
                        headerTransparent: true,
                    }
                }} />
            <AddNewStackNavigator.Screen
                name='AddDetailsScreen'
                component={AddDetailsScreen}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerTitle: 'Detay Ekle'
                    }
                }} />
            <AddNewStackNavigator.Screen
                name='AddressScreen'
                component={AddressScreen}
                options={props => ({
                    ...defaultHeaderStyle,
                    ...AddressScreenOptions(props),
                    ...{
                        headerTitle: 'Konum'
                    }
                })} />
        </AddNewStackNavigator.Navigator>
    )
}

const AddProductNewStackNavigator = createStackNavigator();

const AddProductNewNavigator = () => {
    return (
        <AddProductNewStackNavigator.Navigator>
            <AddProductNewStackNavigator.Screen
                name='AddProductScreen'
                component={AddProductScreen}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerShown: true,
                        headerTitle: 'Ne Paylaşıyorsun..',
                        headerTransparent: false,
                    }
                }} />
        </AddProductNewStackNavigator.Navigator>
    )
}

const MessagingStackNavigator = createStackNavigator();

const MessagingNavigator = () => {
    return (
        <MessagingStackNavigator.Navigator>
            <MessagingStackNavigator.Screen
                name='MessagesScreen'
                component={MessagesScreen}
                options={{
                    ...defaultHeaderStyle,
                    ...{
                        headerTitle: 'Mesajlarımda Ara...'
                    }
                }} />
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
                backgroundColor: Colors.primary
            }}
            backBehavior='none'
            /*tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;

                        return label;
                    }}
                />
            )}*/
        >
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
                })}/>
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
                name='AddProductNewNavigator'
                component={AddProductNewNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='add-circle' size={24} color={fontColor}/>
                        )
                    },
                    tabBarLabel: 'Paylaş'
                })}/>
            <Tab.Screen
                name='MessagingNavigator'
                component={MessagingNavigator}
                options={() => ({
                    tabBarIcon: () => {
                        return(
                            <Ionicons name='chatbubble-ellipses' size={24} color={fontColor}/>
                        )
                    },
                    tabBarLabel: 'Mesajlarım'
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

export default AddNewNavigator;