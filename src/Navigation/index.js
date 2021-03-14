import 'react-native-gesture-handler';
import * as React from 'react';
import { navigationRef } from "../Common/Navoigator";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavKeys from '../Common/AppNavKeys';
import AppContainer from '../Screens/AppContainer';

const Stack = createStackNavigator();


function HomeStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="Home"   headerMode="none" >
        <Stack.Screen
          name={AppNavKeys.Home}
          component={AppContainer.Home}
        />
        <Stack.Screen
          name={AppNavKeys.AddMovie}
          component={AppContainer.AddMovie}
        />
        <Stack.Screen
          name={AppNavKeys.Character}
          component={AppContainer.Character}
        />
      </Stack.Navigator>
  );
}


function MainRouteConfig() {
        return (
            <NavigationContainer ref={ref => navigationRef.current = ref}>
                <Stack.Navigator headerMode="none">
                <Stack.Screen
                  name="App"
                  component={HomeStack}
                  options={{
                    animationEnabled: false
                  }}
                />
                </Stack.Navigator>
          </NavigationContainer>
    );
}
export default MainRouteConfig;

