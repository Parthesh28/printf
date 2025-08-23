import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
);