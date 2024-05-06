import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../component/Button/button';
import SwiperFlatList from 'react-native-swiper-flatlist';

const HajjAndUmrah = ({navigation}) => {
  const youtubeVideoUrl =
    'https://www.youtube.com/live/moQtMet7F7w?si=hLOkFl9cJqFLG6l9';

  const handleButtonPress = () => {
    Linking.openURL(youtubeVideoUrl).catch(err =>
      console.error('An error occurred', err),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/hajjImage.jpeg')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <ImageBackground
          source={require('../../image/rectangleimage.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            alignItems: 'center',
          }}>
          <View style={styles.section}>
            <Text style={styles.heading}>Hajj && Umrah</Text>
          </View>
          <View style={styles.section}>
            <Button
              width={wp('60%')}
              height={hp('25%')}
              elevation={hp('4%')}
              imageWidth={wp('30%')}
              imageHeight={hp('15%')}
              borderRadius={wp('5%')}
              text={'Live'}
              imageSource={require('../../image/hajjlive.jpeg')}
              onPress={handleButtonPress}
            />
          </View>

          <View style={{...styles.section, marginTop: hp('5%')}}>
            <Button
              width={wp('60%')}
              height={hp('25%')}
              elevation={hp('4%')}
              imageWidth={wp('30%')}
              imageHeight={hp('15%')}
              borderRadius={wp('5%')}
              text={'Umrah Guide'}
              imageSource={require('../../image/umrahGuide.jpeg')}
              onPress={() => navigation.navigate('UmrahGuide')}
            />
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: hp('8%'),
    alignItems: 'center',
  },
  heading: {
    fontSize: hp('4%'),
    color: '#fff',
    fontFamily: 'Popline-Regular',
  },
  swiperContainer: {
    height: hp('85%'),
    width: wp('98%'), // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('1%'),
  },
});

export default HajjAndUmrah;
