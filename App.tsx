import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateReportScreen from "./src/views/CreateReportScreen";
import HomeScreen from "./src/views/HomeScreen";
import LoginScreen from "./src/views/LoginScreen";
import SignUpScreen from "./src/views/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateReport" component={CreateReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}