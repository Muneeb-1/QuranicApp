import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasbehCountModal = ({visible, closeModal, count}) => {
  const [tasbehCount, setTasbehCount] = useState(count);

  const handleSetCount = async () => {
    try {
      await AsyncStorage.setItem('tasbehCount', String(tasbehCount));
      closeModal(); // Close the modal after saving the count
    } catch (error) {
      console.log('Error saving count: ', error);
      // Handle error saving count
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.section1}>
            <Text style={styles.headingText}>Tasbeh Count</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#333'}
              value={String(tasbehCount)}
              onChangeText={text => setTasbehCount(text)}
            />
          </View>
          <TouchableOpacity style={styles.section2} onPress={handleSetCount}>
            <Text style={styles.btnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TasbehCountModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentContainer: {
    height: hp('40%'),
    width: wp('80%'),
    backgroundColor: '#fff',
  },
  section1: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  headingText: {
    color: '#333',
    fontWeight: '600',
    fontSize: hp('3%'),
  },
  input: {
    width: wp('70%'),
    borderBottomWidth: 1,
    borderColor: '#333',
    color: '#333',
  },
  btnText: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    color: '#333',
  },
});
