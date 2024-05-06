import React, {useEffect, useState} from 'react';
import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';
import Header from '../../component/Header/Header';

const ReadQuranModal = ({visible, closeModal, surah, surahName}) => {
  console.log('surah', surah);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <Header title={surahName} onPress={closeModal} />
        <ScrollView>
          {surah?.result?.map(ayah => (
            <View style={styles.cardContainer} key={ayah.aya}>
              <Text style={styles.arabicText}>{ayah.arabic_text}</Text>
              <Text style={styles.translationText}>{ayah.translation}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#f0f0f0',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  arabicText: {
    fontSize: 20,
    fontFamily: 'Amiri',
    textAlign: 'right',
    color: '#333',
  },
  translationText: {
    fontSize: 16,
    textAlign: 'right',
    fontStyle: 'italic',
    color: '#555',
    marginTop: 10,
    color: '#333',
  },
});

export default ReadQuranModal;
