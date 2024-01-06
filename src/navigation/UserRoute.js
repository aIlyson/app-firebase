import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { theme } from '../core/theme'
import { Home, Mapa, Lista, Perfil, Suporte } from '../screens';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const detailsTab = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 70,
        width: '100%',
        backgroundColor: theme.colors.navColor,
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        zIndex: 1,
    },
    tabBarItemStyle: {
        borderBottomWidth: 2,
        borderBottomColor: "#191B28",
    }
}


const Navigator = () => {
    return (
        <Tab.Navigator initialRouteName="Início" screenOptions={detailsTab}>
            <Tab.Screen name="Mapa" component={Mapa}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity style={{
                            alignItems: "center", justifyContent: "center", padding: focused ? 10 : 0
                        }}>
                            <FontAwesome name="map" size={25} color={focused ? "#191B28" : "#B8B8BA"} bottom={focused ? 5 : 0} />
                            {focused && <View style={{ position: 'absolute', bottom: 0, height: 8, width: 8, borderRadius: 4, backgroundColor: '#191B28' }} />}
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen name="Início" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity style={{
                            alignItems: "center", justifyContent: "center", padding: focused ? 10 : 0
                        }}>
                            <AntDesign name="home" size={25} color={focused ? "#191B28" : "#B8B8BA"} bottom={focused ? 5 : 0} />
                            {focused && <View style={{ position: 'absolute', bottom: 0, height: 8, width: 8, borderRadius: 4, backgroundColor: '#191B28' }} />}
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen name="Lista" component={Lista}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity style={{
                            alignItems: "center", justifyContent: "center", padding: focused ? 10 : 0
                        }}>
                            <FontAwesome name="list-ul" size={25} color={focused ? "#191B28" : "#B8B8BA"} bottom={focused ? 5 : 0} />
                            {focused && <View style={{ position: 'absolute', bottom: 0, height: 8, width: 8, borderRadius: 4, backgroundColor: '#191B28' }} />}
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};



const MainNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: {
                    backgroundColor: "#191B28",
                    borderBottomWidth: 2,
                    borderBottomColor: "#3785a9",
                },
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#3785a9',
                headerTitleAlign: "center",
                drawerLabelStyle: {
                    marginLeft: -20,
                    color: '#fff',
                    fontSize: 16,
                },
            }}
        >
            <Drawer.Screen
                name="Início"
                component={Navigator}
                options={{
                    drawerIcon: ({ }) => (
                        <MaterialIcons name="home" size={30} color={'#fff'} />
                    ),
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    drawerIcon: ({ }) => (
                        <FontAwesome name="user" size={30} color={'#fff'} />
                    ),
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Suporte"
                component={Suporte}
                options={{
                    drawerIcon: ({ }) => (
                        <MaterialIcons name="support-agent" size={25} color={'#fff'} />
                    ),
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
};

export default MainNavigator;

