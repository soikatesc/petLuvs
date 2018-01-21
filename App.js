import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import FirstScreen from './src/screens/FirstScreen/FirstScreen';
import SecondScreen from './src/screens/SecondScreen/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen/ThirdScreen';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Registers Screens
Navigation.registerComponent("petLuvs.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("petLuvs.FirstScreen", () => FirstScreen, store, Provider);
Navigation.registerComponent("petLuvs.SecondScreen", () => SecondScreen, store, Provider);
Navigation.registerComponent("petLuvs.ThirdScreen", () => ThirdScreen, store, Provider);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "petLuvs.AuthScreen",
    title: "Login"
  }
})