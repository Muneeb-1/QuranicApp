import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CardView = ({title, path, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: wp('45%'),
        height: hp('9%'),
        backgroundColor: 'white',
        elevation: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Image source={path} />
      <Text style={{color: 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CardView;
