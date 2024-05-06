/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {setupTrackerPlayer} from './src/Component/setupPlayer';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => setupTrackerPlayer);
