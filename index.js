/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import './src/utils/ignore-warnings';

import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
