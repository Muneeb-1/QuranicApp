import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const lesson = [
  {
    id: 1,
    Lesson: 1,
  },
  {
    id: 2,
    Lesson: 2,
  },
];

const TajweedLesson = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/tajweedbackground.jpeg')}
        style={{
          flex: 1,
          resizeMode: 'cover',
          padding: 10,
          flexDirection: 'row-reverse',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {lesson.map(item => (
          <TouchableOpacity
            style={styles.card}
            key={item.id.toString()}
            onPress={() =>
              navigation.navigate('Tajweed', {lesson: item.Lesson})
            }>
            <Text style={styles.title}>Lesson</Text>
            <Text style={styles.number}>{item.Lesson.toString()}</Text>
          </TouchableOpacity>
        ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: wp('40%'),
    height: hp('13%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 5,
  },
  title: {
    color: '#333',
    fontWeight: '700',
    fontSize: hp('4%'),
  },
  number: {
    color: '#317873',
    fontSize: hp('3%'),
  },
});

export default TajweedLesson;
