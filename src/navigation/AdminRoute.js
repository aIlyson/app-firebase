// lembrar de alterar
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { theme } from '../core/theme'
import { HomeAdmin, Admin, Resumo } from '../screens';

const Tab = createBottomTabNavigator();
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
    },
}


const Navigator = () => {
    return (
        <Tab.Navigator initialRouteName="HomeAdmin" screenOptions={detailsTab}>
            <Tab.Screen name="HomeAdmin" component={HomeAdmin}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity style={{
                            alignItems: "center", justifyContent: "center", padding: focused ? 10 : 0
                        }}>
                            <Text style={{ fontSize: 20, color: theme.colors.secondary, }}>Inicio</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen name="Cadastrar" component={Admin}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity style={{
                            alignItems: "center", justifyContent: "center", padding: focused ? 10 : 0
                        }}>
                            <Text style={{ fontSize: 20, color: theme.colors.secondary }}>Cadastrar</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen name="Resumo" component={Resumo}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity style={{
                            alignItems: "center", justifyContent: "center", padding: focused ? 10 : 0
                        }}>
                            <Text style={{ fontSize: 20, color: theme.colors.secondary }}>Resumo</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Navigator;

 