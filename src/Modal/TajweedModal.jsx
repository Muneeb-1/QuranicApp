import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import TajweedCard from '../../component/CardView/tajweedCard';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const audioMapping = {
  male: {
    '1Alef': require('../../TajweedSounds/MaleSounds/1Alef.mp3'),
    '2Baa': require('../../TajweedSounds/MaleSounds/2Baa.mp3'),
    '3Taa': require('../../TajweedSounds/MaleSounds/3Taa.mp3'),
    '4Saa': require('../../TajweedSounds/MaleSounds/4Saa.mp3'),
    '5jeem': require('../../TajweedSounds/MaleSounds/5jeem.mp3'),
    '6Ha': require('../../TajweedSounds/MaleSounds/6Ha.mp3'),
    '7Kha': require('../../TajweedSounds/MaleSounds/7Kha.mp3'),
    '8Dal': require('../../TajweedSounds/MaleSounds/8Dal.mp3'),
    '9Zal': require('../../TajweedSounds/MaleSounds/9Zal.mp3'),
    '10Ra': require('../../TajweedSounds/MaleSounds/10Ra.mp3'),
    '11Za': require('../../TajweedSounds/MaleSounds/11Za.mp3'),
    '12Seen': require('../../TajweedSounds/MaleSounds/12Seen.mp3'),
    '13Sheen': require('../../TajweedSounds/MaleSounds/13Sheen.mp3'),
    '14Sad': require('../../TajweedSounds/MaleSounds/14Sad.mp3'),
    '15Dad': require('../../TajweedSounds/MaleSounds/15Dad.mp3'),
    '16Tua': require('../../TajweedSounds/MaleSounds/16Tua.mp3'),
    '17Zua': require('../../TajweedSounds/MaleSounds/17Zua.mp3'),
    '18Aen': require('../../TajweedSounds/MaleSounds/18Aen.mp3'),
    '19Ghaen': require('../../TajweedSounds/MaleSounds/19Ghaen.mp3'),
    '20Fa': require('../../TajweedSounds/MaleSounds/20Fa.mp3'),
    '21Qaf': require('../../TajweedSounds/MaleSounds/21Qaf.mp3'),
    '22Kaf': require('../../TajweedSounds/MaleSounds/22Kaf.mp3'),
    '23Laam': require('../../TajweedSounds/MaleSounds/23Laam.mp3'),
    '24Meem': require('../../TajweedSounds/MaleSounds/24Meem.mp3'),
    '25Noon': require('../../TajweedSounds/MaleSounds/25Noon.mp3'),
    '26wao': require('../../TajweedSounds/MaleSounds/26wao.mp3'),
    '27Haa': require('../../TajweedSounds/MaleSounds/27Haa.mp3'),
    '28Hamza': require('../../TajweedSounds/MaleSounds/28Hamza.mp3'),
    '29Ya': require('../../TajweedSounds/MaleSounds/29Ya.mp3'),
    '30Ya': require('../../TajweedSounds/MaleSounds/30Ya.mp3'),
  },
  female: {
    '1Alef': require('../../TajweedSounds/FemaleSounds/1Alef.mp3'),
    '2Baa': require('../../TajweedSounds/FemaleSounds/2Baa.mp3'),
    '3Taa': require('../../TajweedSounds/FemaleSounds/3Taa.mp3'),
    '4Saa': require('../../TajweedSounds/FemaleSounds/4Saa.mp3'),
    '5jeem': require('../../TajweedSounds/FemaleSounds/5jeem.mp3'),
    '6Ha': require('../../TajweedSounds/FemaleSounds/6Ha.mp3'),
    '7Kha': require('../../TajweedSounds/FemaleSounds/7Kha.mp3'),
    '8Dal': require('../../TajweedSounds/FemaleSounds/8Dal.mp3'),
    '9Zal': require('../../TajweedSounds/FemaleSounds/9Zal.mp3'),
    '10Ra': require('../../TajweedSounds/FemaleSounds/10Ra.mp3'),
    '11Za': require('../../TajweedSounds/FemaleSounds/11Za.mp3'),
    '12Seen': require('../../TajweedSounds/FemaleSounds/12Seen.mp3'),
    '13Sheen': require('../../TajweedSounds/FemaleSounds/13Sheen.mp3'),
    '14Sad': require('../../TajweedSounds/FemaleSounds/14Sad.mp3'),
    '15Dad': require('../../TajweedSounds/FemaleSounds/15Dad.mp3'),
    '16Tua': require('../../TajweedSounds/FemaleSounds/16Tua.mp3'),
    '17Zua': require('../../TajweedSounds/FemaleSounds/17Zua.mp3'),
    '18Aen': require('../../TajweedSounds/FemaleSounds/18Aen.mp3'),
    '19Ghaen': require('../../TajweedSounds/FemaleSounds/19Ghaen.mp3'),
    '20Fa': require('../../TajweedSounds/FemaleSounds/20Fa.mp3'),
    '21Qaf': require('../../TajweedSounds/FemaleSounds/21Qaf.mp3'),
    '22Kaf': require('../../TajweedSounds/FemaleSounds/22Kaf.mp3'),
    '23Laam': require('../../TajweedSounds/FemaleSounds/23Laam.mp3'),
    '24Meem': require('../../TajweedSounds/FemaleSounds/24Meem.mp3'),
    '25Noon': require('../../TajweedSounds/FemaleSounds/25Noon.mp3'),
    '26wao': require('../../TajweedSounds/FemaleSounds/26wao.mp3'),
    '27Haa': require('../../TajweedSounds/FemaleSounds/6Ha.mp3'),
    '28Hamza': require('../../TajweedSounds/FemaleSounds/28Hamza.mp3'),
    '29Ya': require('../../TajweedSounds/FemaleSounds/29Ya.mp3'),
    '30Ya': require('../../TajweedSounds/FemaleSounds/29Ya.mp3'),
  },
};

const TajweedModal = ({visible, closeModal, qariType}) => {
  console.log(qariType);
 
  /// Play Audio ///
  const playAudio = async audioUrls => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({url: audioUrls});
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ImageBackground
            source={require('../../image/tajweedbackground.jpeg')}
            style={{
              flex: 1,
              resizeMode: 'cover',
              flexDirection: 'row-reverse',
              padding: hp('2%'),
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TajweedCard
              path={require('../../image/TajweedImages/1-alif.png')}
              onPress={() => {
                playAudio(audioMapping[qariType]['1Alef']);
              }}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/2-baa.png')}
              onPress={() => {
                playAudio(audioMapping[qariType]['2Baa']);
              }}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/3-taa.png')}
              onPress={() => playAudio(audioMapping[qariType]['3Taa'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/4-saa.png')}
              onPress={() => playAudio(audioMapping[qariType]['4Saa'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/4-jeem.png')}
              onPress={() => playAudio(audioMapping[qariType]['5jeem'])}
            />

            <TajweedCard
              path={require('../../image/TajweedImages/5-khaa.png')}
              onPress={() => playAudio(audioMapping[qariType]['6Ha'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/6-khoo.png')}
              onPress={() => playAudio(audioMapping[qariType]['7Kha'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/7-daal.png')}
              onPress={() => playAudio(audioMapping[qariType]['8Dal'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/8-zaal.png')}
              onPress={() => playAudio(audioMapping[qariType]['9Zal'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/9-raah.png')}
              onPress={() => playAudio(audioMapping[qariType]['10Ra'])}
            />

            <TajweedCard
              path={require('../../image/TajweedImages/10-zaa.png')}
              onPress={() => playAudio(audioMapping[qariType]['11Za'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/11-seen.png')}
              onPress={() => playAudio(audioMapping[qariType]['12Seen'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/12-sheen.png')}
              onPress={() => playAudio(audioMapping[qariType]['13Sheen'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/13-sawad.png')}
              onPress={() => playAudio(audioMapping[qariType]['14Sad'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/14-dawad.png')}
              onPress={() => playAudio(audioMapping[qariType]['15Dad'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/15-tawa.png')}
              onPress={() => playAudio(audioMapping[qariType]['16Tua'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/16-zawa.png')}
              onPress={() => playAudio(audioMapping[qariType]['17Zua'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/17-ayeen.png')}
              onPress={() => playAudio(audioMapping[qariType]['18Aen'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/18-ghayeen.png')}
              onPress={() => playAudio(audioMapping[qariType]['19Ghaen'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/19-faah.png')}
              onPress={() => playAudio(audioMapping[qariType]['20Fa'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/20-quof.png')}
              onPress={() => playAudio(audioMapping[qariType]['21Qaf'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/21-kaaf.png')}
              onPress={() => playAudio(audioMapping[qariType]['22Kaf'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/22-laam.png')}
              onPress={() => playAudio(audioMapping[qariType]['23Laam'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/23-meem.png')}
              onPress={() => playAudio(audioMapping[qariType]['24Meem'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/24-noon.png')}
              onPress={() => playAudio(audioMapping[qariType]['25Noon'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/25-waawo.png')}
              onPress={() => playAudio(audioMapping[qariType]['26wao'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/26-haa.png')}
              onPress={() => playAudio(audioMapping[qariType]['27Haa'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/27-hamzaa.png')}
              onPress={() => playAudio(audioMapping[qariType]['28Hamza'])}
            />
            <TajweedCard
              path={require('../../image/TajweedImages/28-ayaah.png')}
              onPress={() => playAudio(audioMapping[qariType]['29Ya'])}
            />

            <TajweedCard
              path={require('../../image/TajweedImages/29-yaah.png')}
              onPress={() => playAudio(audioMapping[qariType]['30Ya'])}
            />
          </ImageBackground>
        </ScrollView>
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
  },
});
