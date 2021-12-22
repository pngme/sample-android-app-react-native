import React, {useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import { UserProvider } from './context/user-provider';
import Login from './screens/login';
import Signup from './screens/signup';
import LoggedWelcomeScreen from './screens/loggedWelcomeScreen';
import Permissions from './screens/permissions';
import LoanApplicationAmount from './screens/loanApplicationAmount';

const Stack = createNativeStackNavigator();
const AppNameToShowOnNavBar = "Acme Bank";


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: AppNameToShowOnNavBar }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: AppNameToShowOnNavBar }}/>
          <Stack.Screen name="LoggedWelcomeScreen" component={LoggedWelcomeScreen} options={{ title: AppNameToShowOnNavBar }}/>
          <Stack.Screen name="Permissions" component={Permissions} options={{ title: AppNameToShowOnNavBar }}/>
          <Stack.Screen name="LoanApplicationAmount" component={LoanApplicationAmount} options={{ title: AppNameToShowOnNavBar }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    
  );
};

export default App;
