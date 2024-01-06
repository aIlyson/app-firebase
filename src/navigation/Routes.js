import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import AcessAdmin from './AdminRoute';
import AcessUser from './UserRoute';

const Stack = createStackNavigator();


const Route = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="AcessAdmin" component={AcessAdmin} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="AcessUser" component={AcessUser} options={{
        headerShown: false,
      }} />
    </Stack.Navigator>
  );
};

export default Route;

