import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const Header = ({
  title,
  subTitle,
  onPress,
  txtSize,
  subTextSize,
  flex,
  textAlign,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Icon name={'arrowleft'} size={30} color={'#fff'} />
      </TouchableOpacity>
      <View
        style={{
          flex: flex ? flex : 12,
          flexDirection: 'column',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            textAlign: textAlign ? textAlign : 'center',
            color: '#fff',
            fontSize: txtSize ? txtSize : hp('2.5%'),
          }}>
          {title}
        </Text>
        <Text
          style={{
            textAlign: textAlign ? textAlign : 'center',
            color: '#fff',
            fontSize: subTextSize ? subTextSize : hp('1.5%'),
          }}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp('7%'),
    width: wp('100%'),
    backgroundColor: '#317873',
    elevation: 10,
    padding: 10,
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    alignSelf: 'center',
  },
  titleText: {},
});
