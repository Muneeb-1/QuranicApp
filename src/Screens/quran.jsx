import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReadQuranModal from '../Modal/ReadQuranModal';
import Slider from '@react-native-community/slider';
import LoaderModal from '../Modal/loader';


const Quran = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [surahName, setSurahName] = useState();
  const [sliderValue, setSliderValue] = useState(0);
  const playBackState = usePlaybackState();
  const [Loading, setLoading] = useState(false);

  /// Get Surah Name ///
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        const surahList = response.data.data;
        setLoading(false);
        setSurahs(surahList);
      } catch (error) {
        Alert.alert(error);
      }
    };
    fetchSurahs();
  }, []);

  /// Get Surah ///
  const fetchSurahData = async item => {
    try {
      setSurahName(item);
      setLoading(true);
      const textResponse = await axios.get(
        `https://quranenc.com/api/v1/translation/sura/urdu_junagarhi/${item.number}}`,
      );
      console.log(textResponse.data);
      setSelectedSurah(textResponse.data);
      if (textResponse.data) {
        setLoading(false);
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  /// Play Audio ///
  const playAudio = async item => {
    try {
      setSurahName(item);
      const surahAudioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${item.number}.mp3`;
      await TrackPlayer.reset();
      setAudioPlaying(true);
      await TrackPlayer.add({id: 'url', url: surahAudioUrl});
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  /// Update Slider Value ///
  useEffect(() => {
    const updateSlider = async () => {
      try {
        const position = await TrackPlayer.getPosition();
        const duration = await TrackPlayer.getDuration();
        setSliderValue(position / duration);
      } catch (error) {
        console.log('Error updating slider:', error);
      }
    };

    if (isAudioPlaying) {
      const interval = setInterval(updateSlider, 1000);
      return () => clearInterval(interval);
    }
  }, [isAudioPlaying]);

  const togglePlayBack = async playBackState => {
    console.log(playBackState);
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack != null) {
      if (playBackState === 'paused') {
        await TrackPlayer.play();
      } else if (playBackState === 'ended') {
        playAudio(surahName);
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#317873'} translucent={true} />
      <FlatList
        data={surahs}
        initialNumToRender={10}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.section1}>
              <Text style={{...styles.surahName, color: 'orange'}}>
                {item.number}. {item.englishName}
              </Text>
              <Text
                style={{...styles.surahName, textAlign: 'left', marginLeft: 4}}>
                {item.name}
              </Text>
            </View>
            <View style={styles.section2}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => playAudio(item)}>
                <Icon name="controller-play" size={30} color={'green'} />
                <Text style={styles.buttonText}>PLAY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => fetchSurahData(item)}>
                <Ionicons name="book-sharp" size={22} color={'orange'} />
                <Text style={{...styles.buttonText, marginLeft: 7}}>READ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.number.toString()}
      />
      {modalVisible ? (
        <ReadQuranModal
          visible={modalVisible}
          surah={selectedSurah}
          surahName={surahName.name}
          closeModal={() => setModalVisible(false)}
        />
      ) : null}

      {surahName && isAudioPlaying ? (
        <View style={styles.audioControls}>
          <Slider
            style={{marginTop: -5, width: wp('100%')}}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            trackStyle={{height: 10, borderRadius: 5}}
            onSlidingComplete={async value => {
              const duration = await TrackPlayer.getDuration();
              await TrackPlayer.seekTo(value * duration);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              alignContent: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={async () => {
                  await TrackPlayer.stop();
                  setAudioPlaying(false);
                }}>
                <Ionicons name="close" size={25} color={'#333'} />
              </TouchableOpacity>
              <View style={{marginLeft: 10}}>
                <Text style={styles.audioText}>{surahName?.name}</Text>
                <Text style={styles.audioText}>{surahName?.englishName}</Text>
              </View>
            </View>
            {playBackState.state == 'buffering' ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => togglePlayBack(playBackState.state)}>
                <Ionicons
                  name={
                    playBackState.state === 'playing'
                      ? 'pause-circle'
                      : 'play-circle'
                  }
                  size={40}
                  color={'green'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : null}

      <LoaderModal isVisible={Loading} message={'Loading ...'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'gray',
    height: hp('10%'),
    width: wp('100%'),
  },
  surahName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: hp('5%'),
    alignItems: 'center',
    width: '45%',
    height: '55%',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedSurahContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop: 20,
  },
  selectedSurahName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section1: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  section2: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  audioControls: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    elevation: 10,
    width: wp('100%'),
  },
  audioText: {
    textAlign: 'left',
    color: '#333',
  },
  controlButton: {
    marginHorizontal: 10,
  },
});

export default Quran;
