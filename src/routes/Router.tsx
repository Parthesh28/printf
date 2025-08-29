import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/authContext';

// Stacks
import AuthStack from './authStack';
import AppStack from './appStack';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { isLoading, isLoggedIn } = useAuth();

    // While checking login state, show a loading indicator
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Routes;
