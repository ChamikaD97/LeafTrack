import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import DailyEntryScreen from './src/screens/DailyEntryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (



    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="DailyEntry" component={DailyEntryScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
            <Toast />

    </NavigationContainer>
  );
};

export default App;
