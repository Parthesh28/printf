import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/authContext';
import AuthStack from './authStack';
import AppStack from './appStack';
import Loading from '../screens/loading';


const Routes = () => {
    const { isLoading, isLoggedIn } = useAuth();

    if (isLoading) return <Loading/>

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Routes;