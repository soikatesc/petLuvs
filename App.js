import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import FirstScreen from './src/screens/FirstScreen/FirstScreen';
import SecondScreen from './src/screens/SecondScreen/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen/ThirdScreen';

// Registers Screens
Navigation.registerComponent("petLuvs.AuthScreen", () => AuthScreen);
Navigation.registerComponent("petLuvs.FirstScreen", () => FirstScreen);
Navigation.registerComponent("petLuvs.SecondScreen", () => SecondScreen);
Navigation.registerComponent("petLuvs.ThirdScreen", () => ThirdScreen);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "petLuvs.AuthScreen",
    title: "Login"
  }
})