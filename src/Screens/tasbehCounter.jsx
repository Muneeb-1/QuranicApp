import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import TasbehCountModal from '../Modal/TasbehCountModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasbehCounter = () => {
  const [count, setCount] = useState(0);
  const [countedSet, setCountedSet] = useState(0);
  const [targetCount, setTargetCount] = useState(34);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (count == targetCount) {
      setCountedSet(countedSet + 1);
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const fetchCount = async () => {
    try {
      const count = await AsyncStorage.getItem('tasbehCount');
      if (count !== null) {
        setTargetCount(Number(count));
      }
    } catch (error) {
      console.log('Error fetching count: ', error);
      // Handle error fetching count
    }
  };

  useEffect(() => {
    fetchCount();
  }, []); // Empty dependency array means this effect runs only once on component mount

  const updateCounter = newCounter => {
    setTargetCount(newCounter);
  };

  const handleReset = () => {
    setCount(0);
  };

  const progress = count / targetCount;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/compassbackground.jpeg')}
        style={{flex: 1, flex: 1, resizeMode: 'cover'}}>
        <View style={styles.section1}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setModalVisible(true)}>
            <Icon name="edit" color={'#333'} size={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.section2} onPress={handlePress}>
          {countedSet > 0 ? (
            <Text style={{...styles.counterText, marginBottom: 20}}>
              Set {countedSet}
            </Text>
          ) : null}
          <ProgressCircle
            size={250} // Set the size of the circle
            progress={progress} // Set the progress value
            color="red" // Set the color of the progress bar
            showsText // Show the progress value as text inside the circle
            formatText={() => `${count}`} // Format the text
            textStyle={{fontSize: hp('4%'), color: 'red', fontWeight: '900'}} // Style for the progress text
            thickness={5} // Set the thickness of the circle
            endAngle={0.3}
            // Respect device font scale setting
            direction={'clockwise'} // Direction of the circle (clockwise or counter-clockwise)
            strokeCap={'butt'} // Stroke Cap style for the circle (butt, square, or round)
            borderColor={'#fff'}
            borderWidth={2} // Fill color of the inner circle
          />
          <Text style={styles.counterText}>Out of {targetCount}</Text>
          <Text style={styles.txt}>
            Tap any where on the screen to increase the counter
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <TasbehCountModal
        visible={modalVisible}
        closeModal={() => {
          fetchCount();
          setModalVisible(false);
        }}
        count={targetCount}
        updateCounter={updateCounter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  section2: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: hp('3%'),
    color: '#333',
    marginTop: 40,
  },
  txt: {
    fontSize: hp('2.5%'),
    color: '#333',
    marginTop: 90,
    textAlign: 'center',
    maxWidth: wp('75%'),
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: 'orange',
    width: wp('70%'),
    alignItems: 'center',
    padding: 10,
    borderRadius: wp('1%'),
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: hp('2.5%'),
  },
});

export default TasbehCounter;
