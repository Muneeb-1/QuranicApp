import {StatusBar, StyleSheet, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationBarColor from 'react-native-navigation-bar-color';

import TabNavigation from './component/navigation/tabNavigation';
import PrayerTime from './src/Screens/prayerTime';
import ZakatCalculator from './src/Screens/zakatCalculator';
import HajjAndUmrah from './src/Screens/hajjAndumrah';
import UmrahGuide from './src/Screens/umrahGuide';
import QiblaDirecton from './src/Screens/qiblaDirection';
import Quran from './src/Screens/quran';
import Tajweed from './src/Screens/tajweed';
import IslamicCalender from './src/Screens/islamicCalender';
import TasbehCounter from './src/Screens/tasbehCounter';
import {useEffect} from 'react';
import NameOfAllah from './src/Screens/nameOfAllah';
import Dua from './src/Screens/dua';
import {Provider, useDispatch} from 'react-redux';
import store from './src/Redux/Store/store';
import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_LONGITUDE} from './src/Redux/Constants/constants';
import TajweedLesson from './src/Screens/tajweedLesson';
import ZakatCategorySelect from './src/Screens/zakatCategorySelect';

const Stack = createNativeStackNavigator();
StatusBar.setBackgroundColor('#317873');

export default function App() {
  /////////////////////////////////////////////////////
  useEffect(() => {
    try {
      // Change the color of the navigation bar (bottom bar)
      NavigationBarColor('#317873', true);

      // Clean up on component unmount
      return async () => {
        NavigationBarColor('#0000', true); // Reset to the default color if needed
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="PrayerTime" component={PrayerTime} />
          <Stack.Screen name="ZakatCategory" component={ZakatCategorySelect} />
          <Stack.Screen name="Calculator" component={ZakatCalculator} />
          <Stack.Screen name="HajjAndUmrah" component={HajjAndUmrah} />
          <Stack.Screen
            name="UmrahGuide"
            component={UmrahGuide}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#317873', // Set your desired color here
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="QiblaDirecton" component={QiblaDirecton} />
          <Stack.Screen
            name="Quran"
            component={Quran}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#317873', // Set your desired color here
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="Tajweed" component={Tajweed} />
          <Stack.Screen name="IslamicCalender" component={IslamicCalender} />
          <Stack.Screen
            name="Tasbeh"
            component={TasbehCounter}
            options={{
              headerShown: true,
              title: 'Tasbeh Counter',
              headerStyle: {
                backgroundColor: '#317873', // Set your desired color here
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen
            name="NameOfAllah"
            component={NameOfAllah}
            options={{
              headerShown: true,
              title: '99 Name of Allah(S.W.T)',
              headerStyle: {
                backgroundColor: '#317873', // Set your desired color here
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen
            name="Dua"
            component={Dua}
            options={{
              headerShown: true,
              title: `Dua's`,
              headerStyle: {
                backgroundColor: '#317873', // Set your desired color here
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen
            name="Tajweed Lesson"
            component={TajweedLesson}
            options={{
              headerShown: true,
              title: `Tajweed Lesson`,
              headerStyle: {
                backgroundColor: '#317873', // Set your desired color here
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
