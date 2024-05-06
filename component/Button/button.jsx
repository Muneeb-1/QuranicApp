import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button = ({
  text,
  onPress,
  width,
  height,
  elevation,
  color,
  imageSource,
  textColor,
  textSize,
  imageWidth,
  imageHeight,
  borderRadius
}) => {
  return (
    <TouchableOpacity
      style={{
        width: width ? width : wp('45%'),
        height: height ? height : hp('10%'),
        elevation: elevation ? elevation :0,
        backgroundColor: color ? color : '#fff',
        borderRadius:borderRadius?borderRadius:wp('2%'), 
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Image
        source={imageSource}
        style={{
          width: imageWidth ? imageWidth : wp('20%'),
          height: imageHeight ? imageHeight : hp('7%'),
        }}
      />
      <Text
        style={{
          fontSize: textSize ? textSize : hp('2.5%'),
          color: textColor ? textColor : '#000',
          marginTop:hp('1%'),
          fontWeight:'600',
          fontFamily: 'Popline-Regular'
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
