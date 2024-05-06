import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment2 from 'moment-hijri';
import Calender from '../../component/Calender/calender';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data = [
  {
    id: 1,
    name: 'Hajj',
    hijriDate: '8–13 Dhū al-Ḥijja',
    date: '14–19 June 2024',
  },
  {
    id: 2,
    name: 'Day of Arafah',
    hijriDate: '9 Dhū al-Ḥijja',
    date: '15 June 2024',
  },
  {
    id: 3,
    name: 'Eid al-Adha',
    hijriDate: '10 Dhū al-Ḥijja',
    date: '16 June 2024',
  },
  {
    id: 4,
    name: 'Eid al-Ghadeer',
    hijriDate: '18 Dhū al-Ḥijja',
    date: '24 June 2024',
  },
  {
    id: 5,
    name: 'Eid al-Mubahalah',
    hijriDate: '24 Dhū al-Ḥijja',
    date: '30 June 2024',
  },
];

const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const IslamicCalender = ({navigation}) => {
  const [islamicMonth, setIslamicDate] = useState('Loading ...');

  useEffect(() => {
    moment2.locale('en');
    // Get the current date in the Islamic calendar
    const currentIslamicDate = moment2().format('iD iMMMM iYYYY');

    // Set the Islamic date state
    setIslamicDate(currentIslamicDate);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#317873"
        translucent={true}></StatusBar>
      <SafeAreaView>
        <Header
          title={islamicMonth}
          subTitle={new Date().toLocaleDateString('en-US', options)}
          flex={6}
          textAlign={'left'}
          onPress={() => navigation.goBack()}
        />
        <Calender />

        <ScrollView contentContainerStyle={styles.contentView}>
          {data?.map(item => (
            <View style={styles.card} key={item.id}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.mainText}>{item.name}</Text>
                  <Text style={styles.innerText}>{item.hijriDate}</Text>
                </View>
                <View style={{padding: 5}}>
                  <Text style={{color: 'green'}}>{item.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default IslamicCalender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    width: wp('95%'),
    minHeight: hp('10%'),
    marginTop: hp('2%'),
    backgroundColor: '#fff',
    borderRadius: hp('2%'),
    alignSelf: 'center',
  },
  card: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    minHeight: hp('6%'),
    justifyContent: 'center',
    padding: 10,
  },
  mainText: {
    color: '#333',
    fontWeight: '600',
    fontSize: hp('2%'),
  },
  innerText: {
    color: 'gray',
  },
});
