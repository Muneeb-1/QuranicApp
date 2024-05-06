import React, {useState} from 'react';
import {View, Image, StyleSheet, FlatList, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomImageSwiper = () => {
  const images = [
    require('../../image/umrahGuide3.jpeg'),
    require('../../image/umrahGuide2.jpeg'),
    require('../../image/umrahGuide1.jpeg'),
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / Dimensions.get('window').width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.slide}>
              <Image source={item} style={styles.image} resizeMode="contain" />
            </View>
          )}
          style={styles.flatList}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  slide: {
    width: wp('100%'),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: wp('90%'), height: hp('85%')},
  flatList: {
    flexGrow: 0, // To prevent the FlatList from stretching to fill the container
    // Set a fixed height for the FlatList
  },
});

export default CustomImageSwiper;
