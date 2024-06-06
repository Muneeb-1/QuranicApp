import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TajweedCard from '../../component/CardView/tajweedCard';
import TrackPlayer from 'react-native-track-player';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  audioMappingLesson1,
  audioMappingLesson2,
  lessonImages02,
  lessonImagesLesson1,
} from '../Data/tajweed';
import Icon from 'react-native-vector-icons/Ionicons';

const TajweedModal = ({visible, closeModal, qariType, lesson}) => {
  const [currentIndex, setCurrentIndex] = useState(lesson);
  const [lessonImages, setLessonImages] = useState([]);
  const [audioMapping, setAudioMapping] = useState({});

  useEffect(() => {
    const selectedLessonImages =
      currentIndex === 1 ? lessonImagesLesson1 : lessonImages02;
    const selectedAudioMapping =
      currentIndex === 1 ? audioMappingLesson1 : audioMappingLesson2;

    setLessonImages(selectedLessonImages);
    setAudioMapping(selectedAudioMapping);
  }, [currentIndex]);

  const playAudio = async audioUrls => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({url: audioUrls});
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const nextImage = () => {
    if (currentIndex < lessonImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../image/tajweedbackground.jpeg')}
          style={{
            flex: 1,
            resizeMode: 'cover',
          }}>
          <View style={styles.section}>
            <Text style={styles.heading}>Lesson {currentIndex}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {lessonImages.map(lesson => (
              <TajweedCard
                key={lesson.id}
                path={lesson.image}
                onPress={() => playAudio(audioMapping[qariType][lesson.id])}
              />
            ))}
          </ScrollView>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={{...styles.btn, opacity: currentIndex == 1 ? 1 : 0.3}}
              disabled={currentIndex == 1 ? false : true}
              onPress={nextImage}>
              <Text style={styles.btnTxt}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.btn, opacity: currentIndex == 1 ? 0.3 : 1}}
              disabled={currentIndex == 1 ? true : false}
              onPress={prevImage}>
              <Text style={styles.btnTxt}>Previous</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default TajweedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'row-reverse',
    padding: hp('2%'),
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 5,
  },
  section: {
    alignItems: 'center',
  },
  heading: {
    fontSize: hp('4%'),
    color: '#fff',
    fontFamily: 'Popline-Regular',
  },
  arrowLeft: {},
  arrowRight: {
    opacity: 0.3,
  },
  btn: {
    backgroundColor: 'orange',
    width: wp('30%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5
  },
  btnTxt: {},
});
