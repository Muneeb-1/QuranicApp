import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  StatusBar
} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import CardView from '../../component/CardView/card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import getLocationName from '../../component/Location/getLocation';
import {setupTrackerPlayer} from '../Component/setupPlayer';
import {useDispatch, useSelector} from 'react-redux';
import {LATITUDE_LONGITUDE} from '../Redux/Constants/constants';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.deviceLocationReducer);
  console.log(data);
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [upcomingPrayer, setUpcomingPrayer] = useState({name: '', time: ''});
  const [locationName, setLocationName] = useState('Loading...');
  const [locationData, setLocationData] = useState('Loading...');

  // Define the specific prayers you want to display
  const targetPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const formatTime = time => {
    // Convert time to 24-hour format
    const formattedTime = moment(time, 'hh:mm').format('HH:mm');
    // Format the time with AM/PM
    return moment(formattedTime, 'HH:mm').format('hh:mm A');
  };

  // //////////////////////////////////////////////////

  useEffect(()=>{
  setupTrackerPlayer()
  },[])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch({type: LATITUDE_LONGITUDE, payload: {latitude, longitude}});
        getLocationName(latitude, longitude).then(name => {
          setLocationData(name);
          setLocationName(name.components.municipality);
        });
        fetchPrayerTimes(latitude, longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const fetchPrayerTimes = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2`,
      );

      console.log(response.data.data[0].timings);
      setPrayerTimes(response.data.data[0].timings);
      const today = new Date();
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentTime = `${currentHour}:${currentMinute}`;

      // Filter out only the specified prayers
      const filteredPrayers = Object.entries(response.data.data[0].timings)
        .filter(([prayerName, _]) => targetPrayers.includes(prayerName))
        .reduce((obj, [prayerName, prayerTime]) => {
          obj[prayerName] = prayerTime;
          return obj;
        }, {});

      // Find the upcoming prayer and its time
      const upcomingPrayerArray = Object.entries(filteredPrayers).filter(
        ([_, time]) => time > currentTime,
      );

      if (upcomingPrayerArray.length > 0) {
        const [upcomingPrayerName, upcomingPrayerTime] = upcomingPrayerArray[0];
        setUpcomingPrayer({
          name: upcomingPrayerName,
          time: upcomingPrayerTime,
        });
      } else {
        // If all prayers for the day are completed, show the first prayer of the next day
        const firstPrayerName = Object.keys(filteredPrayers)[0];
        const firstPrayerTime = Object.values(filteredPrayers)[0];
        setUpcomingPrayer({name: firstPrayerName, time: firstPrayerTime});
      }

      setPrayerTimes(filteredPrayers);
    } catch (error) {
      console.error('Error fetching prayer times:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>

      <View style={styles.section1}>
        <ImageBackground
          source={require('../../image/featureimage.png')}
          style={{flex: 1, resizeMode: 'cover'}}>
          <ImageBackground
            source={require('../../image/rectangleimage.png')}
            style={{
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.overlay1}
              source={require('../../image/bismilla.png')}
            />

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('4%'),
                color: '#fff',
              }}>
              {upcomingPrayer?.name ? upcomingPrayer.name : '...'}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('3%'),
                color: '#fff',
              }}>
              {upcomingPrayer?.time ? formatTime(upcomingPrayer.time) : '...'}
            </Text>

            {locationName && (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('2%'),
                  left: -140,
                  marginTop: hp('4%'),
                  color: '#fff',
                }}>
                {locationName.split(' ')[0]}
              </Text>
            )}
          </ImageBackground>
        </ImageBackground>
      </View>

      {/* Wrap section2 with ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section2}>
          <CardView
            title={'The Quran'}
            path={require('../../image/thequran.png')}
            onPress={() => navigation.navigate('Quran')}
          />
          <CardView
            title={'Tajweed'}
            path={require('../../image/tajweed.png')}
            onPress={() => navigation.navigate('Tajweed')}
          />
        </View>
        <View style={styles.section2}>
          <CardView
            title={'Prayer Times'}
            path={require('../../image/prayertimes.png')}
            onPress={() => {
              prayerTimes.length != 0
                ? navigation.navigate('PrayerTime', {
                    prayerTimes,
                    locationData,
                    upcomingPrayer,
                  })
                : null;
            }}
          />
          <CardView
            title={'Name of Allah'}
            path={require('../../image/masjidfinder.png')}
            onPress={() => navigation.navigate('NameOfAllah')}
          />
        </View>
        <View style={styles.section2}>
          <CardView
            title={'Tasbeh'}
            path={require('../../image/tasbeh.png')}
            onPress={() => navigation.navigate('Tasbeh')}
          />
          <CardView
            title={'Qibla Direction'}
            path={require('../../image/qibladirection.png')}
            onPress={() => navigation.navigate('QiblaDirecton')}
          />
        </View>
        <View style={styles.section2}>
          <CardView
            title={`Dua's`}
            path={require('../../image/dua.png')}
            onPress={() => navigation.navigate('Dua')}
          />
          <CardView
            title={'Zakat Calculator'}
            path={require('../../image/zakatcal.png')}
            onPress={() => navigation.navigate('Calculator')}
          />
        </View>
        <View style={styles.section2}>
          <CardView
            title={'Islamic Calender'}
            path={require('../../image/islamiccalender.png')}
            onPress={() => navigation.navigate('IslamicCalender')}
          />
          <CardView
            title={'Hajj && Umrah'}
            path={require('../../image/hajjandumrah.png')}
            onPress={() => navigation.navigate('HajjAndUmrah')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  section1: {
    height: hp('44%'),
    backgroundColor: 'green',
  },
  section2: {
    marginTop: hp('1.4%'),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  // Add this style for ScrollView content container
  scrollViewContent: {
    // Adjust this value based on the height of your bottom tab navigation
    flexGrow: 1,
  },
  overlayImage: {
    position: 'absolute', // Set position to absolute for overlay
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Adjust based on your overlay requirement
    alignItems: 'center', // Adjust based on your overlay requirement
    opacity: 0.8,
    flexDirection: 'column', // You can adjust opacity as required
  },
  overlay1: {
    marginTop: hp('7%'),
  },
  overlay2: {
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
});
