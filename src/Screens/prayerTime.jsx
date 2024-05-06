import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import moment2 from 'moment-hijri';

const PrayerTime = ({route}) => {
  const navigation = useNavigation();

  const [islamicMonth, setIslamicDate] = useState('Loading ...');

  useEffect(() => {
    moment2.locale('en');
    // Get the current date in the Islamic calendar
    const currentIslamicDate = moment2().format('iD iMMMM iYYYY');

    // Set the Islamic date state
    setIslamicDate(currentIslamicDate);
  }, []);

  const {prayerTimes, locationData, upcomingPrayer} = route.params;
  const {rise, set} = locationData.annotations.sun;
  console.log(upcomingPrayer);

  const formatTime = time => {
    // Convert time to 24-hour format
    const formattedTime = moment(time, 'hh:mm').format('HH:mm');
    // Format the time with AM/PM
    return moment(formattedTime, 'HH:mm').format('hh:mm A');
  };

  const currentDate = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Prayers</Text>
        <Text style={{color: '#fff',padding:4}}>
          {locationData.components.suburb},{' '}
          {locationData.components.county.split(' ')[0]}
        </Text> */}
      <StatusBar backgroundColor="black" translucent={true}></StatusBar>
      <View style={styles.header}>
        <View
          style={{
            width: wp('70%'),
            height: hp('6%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: wp('2%'),
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="arrowleft" size={25} color={'#fff'} />
          </TouchableOpacity>

          <Text style={styles.heading}>Prayer Timings</Text>
        </View>
      </View>

      <View style={styles.section1}>
        <ImageBackground
          source={require('../../image/prayerTimeImage.jpeg')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <View style={styles.imageView1}>
            <Text style={{...styles.txt, paddingLeft: hp('11%')}}>
              {islamicMonth}
            </Text>
            <Text
              style={{
                color: '#fff',
                paddingLeft: hp('3%'),
                fontFamily: 'Popline-Regular',
              }}>
              {formattedDate}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('2%'),
                paddingLeft: hp('4%'),
              }}>
              <Entypo name="location" color={'#fff'} size={25} />
              <Text style={styles.txt}>{locationData.components.county}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          marginTop: hp('3%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={
            formatTime(upcomingPrayer.time) === formatTime(prayerTimes.Fajr)
              ? {...styles.card, borderColor: 'green', borderWidth: 1}
              : styles.card
          }>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.prayerName}>{'Fajr'}</Text>
              <Text style={{color: '#333'}}>
                {'Sunrise'}{' '}
                {new Date(rise.apparent * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            <Text style={styles.prayerTime}>
              {formatTime(prayerTimes.Fajr)}
            </Text>
          </View>
        </View>

        <View
          style={
            formatTime(upcomingPrayer.time) === formatTime(prayerTimes.Dhuhr)
              ? {...styles.card, borderColor: 'green', borderWidth: 1}
              : styles.card
          }>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.prayerName}>{'Dhuhr'}</Text>
            <Text style={styles.prayerTime}>
              {formatTime(prayerTimes.Dhuhr)}
            </Text>
          </View>
        </View>

        <View
          style={
            formatTime(upcomingPrayer.time) === formatTime(prayerTimes.Asr)
              ? {...styles.card, borderColor: 'green', borderWidth: 1}
              : styles.card
          }>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.prayerName}>{'Asr'}</Text>
            <Text style={styles.prayerTime}>{formatTime(prayerTimes.Asr)}</Text>
          </View>
        </View>

        <View
          style={
            formatTime(upcomingPrayer.time) === formatTime(prayerTimes.Maghrib)
              ? {...styles.card, borderColor: 'green', borderWidth: 1}
              : styles.card
          }>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.prayerName}>{'Maghrib'}</Text>
              <Text style={{color: '#333'}}>
                {'Sunset'}{' '}
                {new Date(set.apparent * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            <Text style={styles.prayerTime}>
              {formatTime(prayerTimes.Maghrib)}
            </Text>
          </View>
        </View>

        <View
          style={
            formatTime(upcomingPrayer.time) === formatTime(prayerTimes.Isha)
              ? {...styles.card, borderColor: 'green', borderWidth: 1}
              : styles.card
          }>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.prayerName}>{'Isha'}</Text>
            <Text style={styles.prayerTime}>
              {formatTime(prayerTimes.Isha)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    marginTop: hp('3.95%'),
  },
  heading: {
    fontSize: hp('3%'),
    fontWeight: '600',
    color: '#fff',
    padding: 4,
    fontFamily: 'Popline-Regular',
  },
  card: {
    width: wp('90%%'),
    height: hp('8%'),
    justifyContent: 'center',
    padding: 10,
    marginBottom: hp('2%'),
    backgroundColor: '#FDFEFF',
    elevation: 10,
    borderRadius: wp('1%'),
    shadowColor: 'gray',
  },
  prayerName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: hp('2%'),
    fontFamily: 'Popline-Regular',
  },
  prayerTime: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: hp('2%'),
    fontFamily: 'Popline-Regular',
  },
  section1: {
    height: hp('26%'),
  },
  header: {
    height: hp('6%'),
    backgroundColor: '#317873',
    elevation: 5,
  },
  imageView1: {
    padding: hp('3%'),
    flexDirection: 'column',
  },
  txt: {
    color: '#fff',
    fontWeight: '800',
    fontSize: hp('2%'),
    fontFamily: 'Popline-Regular',
  },
});

export default PrayerTime;
