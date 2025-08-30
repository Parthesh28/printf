import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home'
import Create from '../screens/create';
import Details from '../screens/details';
import Summary from '../screens/summary';
import Settings from '../screens/settings';
import Confirmed from '../screens/confirmed';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Confirmed" component={Confirmed} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
    );
};

export default AppStack;