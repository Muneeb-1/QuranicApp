import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';

const AudioQuranModal = ({closeModal, audioUrls}) => {
  /// Play Audio ///
  const playAudio = async audioUrls => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(audioUrls.map(url => ({id: url, url})));
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  /// Stop Audio ///
  const stopAudio = async () => {
    try {
      await TrackPlayer.stop();
    } catch (error) {
      console.log('Error stopping audio:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}></View>
    </Modal>
  );
};

export default AudioQuranModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
