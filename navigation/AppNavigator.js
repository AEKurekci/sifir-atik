import {createStackNavigator} from "@react-navigation/stack";
import {Platform} from "react-native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import Home from "../screens/Home";
import Animals from "../screens/Animals";
import Profile from "../screens/Profile";
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
                options={defaultHeaderStyle}
                />
            <HomeStackNavigator.Screen
                name='ProductDetailsScreen'
                component={ProductDetailsScreen}
                options={defaultHeaderStyle}
            />
        </HomeStackNavigator.Navigator>
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
                options={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        return(
                            <FontAwesome5 name='home' size={24} color={fontColor} />
                        )
                    },
                    tabBarLabel: 'Ana Sayfa'
                })} />
            <Tab.Screen
                name='Animals'
                component={Animals}
                options={({route}) => ({
                    tabBarIcon: () => {
                        return(
                            <FontAwesome5 name='paw' size={24} color={fontColor}/>
                        )
                    },
                    tabBarLabel: 'Patiler'
                })}/>
            <Tab.Screen name='Profile'
                        component={Profile}
                        options={() => ({
                            tabBarIcon: () => {
                                return(
                                    <FontAwesome5 name='user' size={24} color={fontColor} />
                                )
                            },
                            tabBarLabel: 'Profilim'
                        })} />
        </Tab.Navigator>
    )
}

export default TabNavigator;