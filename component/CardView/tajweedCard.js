import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TajweedCard = ({onPress, path}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{padding: hp('0.6m%')}}>
      <ImageBackground
        style={{
          width: wp('20%'),
          minHeight: hp('13%'),
        }}
        resizeMode="contain"
        source={path}></ImageBackground>
    </TouchableOpacity>
  );
};

export default TajweedCard;

const styles = StyleSheet.create({});
