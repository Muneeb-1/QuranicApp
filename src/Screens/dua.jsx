import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data = [
  {
    url: require('../../image/DuaImages/1.png'),
  },
  {
    url: require('../../image/DuaImages/2.png'),
  },
  {
    url: require('../../image/DuaImages/3.png'),
  },
  {
    url: require('../../image/DuaImages/4.png'),
  },
  {
    url: require('../../image/DuaImages/5.png'),
  },
  {
    url: require('../../image/DuaImages/6.png'),
  },
  {
    url: require('../../image/DuaImages/7.png'),
  },
  {
    url: require('../../image/DuaImages/8.png'),
  },
  {
    url: require('../../image/DuaImages/9.png'),
  },
  {
    url: require('../../image/DuaImages/10.png'),
  },
  {
    url: require('../../image/DuaImages/11.png'),
  },
  {
    url: require('../../image/DuaImages/12.png'),
  },
  {
    url: require('../../image/DuaImages/13.png'),
  },
  {
    url: require('../../image/DuaImages/14.png'),
  },
];

const Dua = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../../image/nameOfAllah.jpeg')}
        style={styles.image}> */}
      <FlatList
        data={data}
        keyExtractor={item => item.Id}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
        renderItem={({item}) => (
          <View style={styles.cardView}>
            <Image source={item.url} style={styles.image} />
          </View>
        )}
      />
      {/* </ImageBackground> */}
    </View>
  );
};

export default Dua;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: hp('2%'),
    resizeMode: 'contain',
  },
  cardView: {
    width: wp('90%'),
    height: hp('35%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
