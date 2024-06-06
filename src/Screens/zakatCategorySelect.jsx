import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ZakatCategorySelect = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Gold and Cash');

  const handleCategorySelect = category => {
    setSelectedCategory(category);
  };

  const handleNext = () => {
    console.log(selectedCategory);
    navigation.navigate('Calculator', {category: selectedCategory});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Zakat Category</Text>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === 'Gold and Cash' && styles.selectedCategory,
        ]}
        onPress={() => handleCategorySelect('Gold and Cash')}>
        <Icon name="gold" size={wp('7%')} color="#ff8c00" style={styles.icon} />
        <Text style={styles.categoryText}>Gold and Cash</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === 'Silver and Cash' && styles.selectedCategory,
        ]}
        onPress={() => handleCategorySelect('Silver and Cash')}>
        <Icon name="cash" size={wp('7%')} color="#ff8c00" style={styles.icon} />
        <Text style={styles.categoryText}>Silver and Cash</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ZakatCategorySelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: '#333',
    marginBottom: hp('2%'),
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    marginVertical: hp('1%'),
    width: wp('70%'),
    justifyContent: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedCategory: {
    backgroundColor: '#ffecd2',
    borderColor: '#ff8c00',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: wp('5%'),
    color: '#333',
    marginLeft: wp('2%'),
  },
  selectedText: {
    marginTop: hp('2%'),
    fontSize: wp('5%'),
    color: '#ff8c00',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: wp('2%'),
  },
  nextButton: {
    backgroundColor: 'orange',
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginTop: hp('3%'),
    width: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: wp('5%'),
    color: '#fff',
    fontWeight: 'bold',
  },
});
