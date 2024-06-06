import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../component/Button/button';
import TajweedModal from '../Modal/TajweedModal';

const Tajweed = ({route}) => {
  const lesson = route.params.lesson;
  const [modalVisible, setModalVisible] = useState(false);
  const [qari, setQari] = useState('');
  const handleModalOpen = data => {
    setQari(data);
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setQari('');
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/tajweedbackground.jpeg')}
        style={{flex: 1, resizeMode: 'cover', alignItems: 'center'}}>
        <View style={styles.section}>
          <Text style={styles.heading}>Tajweed</Text>
        </View>
        <View style={styles.section}>
          <Button
            width={wp('60%')}
            height={hp('25%')}
            elevation={hp('4%')}
            imageWidth={wp('30%')}
            imageHeight={hp('15%')}
            borderRadius={wp('5%')}
            text={'Male Qari'}
            imageSource={require('../../image/maleQari.jpeg')}
            onPress={() => handleModalOpen('male')}
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
            text={`Female Qari'ah`}
            imageSource={require('../../image/femaleQari.jpeg')}
            onPress={() => handleModalOpen('female')}
          />
        </View>
        <TajweedModal
          visible={modalVisible}
          qariType={qari}
          lesson={lesson}
          closeModal={() => handleModalClose()}
        />
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

export default Tajweed;
