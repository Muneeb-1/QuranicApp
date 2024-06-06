import React, {useEffect, useState} from 'react';
import CompassHeading from 'react-native-compass-heading';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const QiblaDirection = () => {
  const [heading, setHeading] = useState(0);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    const degreeUpdateRate = 3;

    CompassHeading.start(degreeUpdateRate, ({heading, accuracy}) => {
      console.log('CompassHeading: ', heading, accuracy);
      setHeading(heading);

      // Rotate the compass image
      Animated.timing(rotateValue, {
        toValue: heading,
        duration: 100,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  const rotateStyle = {
    transform: [{rotate: `${-heading}deg`}],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../image/compassbackground.jpeg')}
        style={styles.imageContainer}>
        <View style={styles.compassContainer}>
          <Animated.Image
            source={require('../../image/qiblacompass.png')}
            style={[styles.compassImage, rotateStyle]}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#333',
  },
  compassContainer: {
    width: wp('70%'),
    height: wp('70%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('35%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp('0.5%')},
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 5,
  },
  compassImage: {
    width: wp('70%'),
    height: wp('60%'),
  },
  headingValue: {
    fontSize: wp('4.5%'),
    marginTop: hp('2%'),
    color: '#555',
  },
  cardinalDirection: {
    fontSize: wp('4.5%'),
    marginTop: hp('1%'),
    color: '#555',
  },
});

export default QiblaDirection;
