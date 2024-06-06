// ZakatCalculator.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ZakatCalculator = ({route}) => {
  console.log(route?.params.category);
  const [category, setSelectedCategory] = useState(route?.params.category);
  const [totalZakatAmount, setZakatAmount] = useState(0);
  //////
  const [totalCash, setTotalCash] = useState(0);
  const [totalGold, setTotalGold] = useState(0);
  const [totalSilver, setTotalSilver] = useState(0);
  //////
  const [nishabCount, setNishabCount] = useState(0);
  /////
  const [worth, setWorth] = useState(0);

  const goldPricePerGram = 18879;
  const silverPricePerGram = 266.21;
  const goldNisab = 87.48;
  const silverNisab = 612.36;
  const silverAmountNisab = 135179;

  const handleCalculation = () => {
    const totalWorth =
      parseFloat(totalCash) +
      parseFloat(totalGold * goldPricePerGram) +
      parseFloat(totalSilver * silverPricePerGram);
    console.log(totalWorth);
    let nishabValue;
    let totalZakat;
    if (totalGold >= goldNisab) {
      nishabValue = goldNisab * goldPricePerGram;
      totalZakat = totalWorth >= nishabValue ? totalWorth * 0.025 : 0;
    } else if (totalGold < goldNisab && totalCash == 0) {
      nishabValue = goldNisab * goldPricePerGram;
      totalZakat = 0;
    } else if (totalGold < goldNisab && totalCash > 0) {
      nishabValue = silverAmountNisab;
      totalZakat = totalWorth >= nishabValue ? totalWorth * 0.025 : 0;
    } else if (totalSilver >= silverNisab) {
      nishabValue = silverAmountNisab;
      totalZakat = totalWorth >= nishabValue ? totalWorth * 0.025 : 0;
    } else if (totalSilver < silverNisab && totalCash == 0) {
      nishabValue = goldNisab * goldPricePerGram;
      totalZakat = totalWorth >= nishabValue ? totalWorth * 0.025 : 0;
    } else if (totalSilver < silverNisab) {
      nishabValue = silverAmountNisab;
      totalZakat = totalWorth >= nishabValue ? totalWorth * 0.025 : 0;
    }

    setZakatAmount(totalZakat.toFixed(2));
    setWorth(totalWorth.toFixed(2));
    setNishabCount(nishabValue.toFixed(2));
  };

  const resetValue = () => {
    setZakatAmount(0);
    setTotalCash(0);
    setTotalGold(0);
    setTotalSilver(0);
    setNishabCount(0);
    setWorth(0);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/zakatBackImage.jpeg')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <ImageBackground
          source={require('../../image/rectangleimage.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            alignItems: 'center',
          }}>
          <View style={styles.section}>
            <Text style={styles.heading}>Zakat Calculator</Text>
            <Text style={{...styles.txt, color: 'yellow'}}>
              Zakat, which is prescribed as the equivalent
            </Text>
            <Text style={{...styles.txt, color: 'yellow'}}>
              of 87.48 grams (7.5tola) of gold and 612.36
            </Text>
            <Text style={{...styles.txt, color: 'yellow'}}>
              grams (52.5 tola) of silver,respectively.
            </Text>
          </View>

          <View
            style={{
              ...styles.section,
              marginTop: hp('3%'),
              alignItems: 'flex-start',
            }}>
            <Text style={{...styles.txt, color: '#fff'}}>
              ⚪ Cash in Hand (approximately Rs. 1,35,179)
            </Text>
            <Text style={{...styles.txt, color: '#fff'}}>
              ⚪ Value of Gold (approximately 87.48 Gram)
            </Text>

            <Text style={{...styles.txt, color: '#fff'}}>
              ⚪ Value of Silver (approximately 612.36 Gram)
            </Text>
          </View>
          {totalZakatAmount == 0 && worth == 0 ? (
            <>
              <View
                style={{
                  ...styles.section,
                  marginTop: hp('3%'),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.heading,
                    color: 'yellow',
                    marginBottom: hp('1%'),
                  }}>
                  Cash
                </Text>
                <Text
                  style={{
                    ...styles.txt,
                    color: '#fff',
                    marginBottom: hp('0.3%'),
                  }}>
                  Cash in hand & in Bank account
                </Text>
                <TextInput
                  placeholder="Rs 0.00"
                  placeholderTextColor={'#808080'}
                  keyboardType="numeric"
                  textAlign="center"
                  onChangeText={text => setTotalCash(text)}
                  style={styles.input}></TextInput>
              </View>
              {category == 'Gold and Cash' ? (
                <View
                  style={{
                    ...styles.section,
                    marginTop: hp('3%'),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...styles.heading,
                      color: 'yellow',
                      marginBottom: hp('1%'),
                    }}>
                    Gold
                  </Text>

                  <Text
                    style={{
                      ...styles.txt,
                      color: '#fff',
                      marginBottom: hp('0.3%'),
                    }}>
                    Value of Gold in grams
                  </Text>
                  <TextInput
                    placeholder="0.00 g"
                    placeholderTextColor={'#808080'}
                    keyboardType="numeric"
                    textAlign="center"
                    onChangeText={text => setTotalGold(text)}
                    style={styles.input}></TextInput>
                </View>
              ) : (
                <View
                  style={{
                    ...styles.section,
                    marginTop: hp('3%'),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...styles.heading,
                      color: 'yellow',
                      marginBottom: hp('1%'),
                    }}>
                    Silver
                  </Text>
                  <Text
                    style={{
                      ...styles.txt,
                      color: '#fff',
                      marginBottom: hp('0.3%'),
                    }}>
                    Value of Silver in grams
                  </Text>
                  <TextInput
                    placeholder="0.00 g"
                    placeholderTextColor={'#808080'}
                    keyboardType="numeric"
                    textAlign="center"
                    onChangeText={text => setTotalSilver(text)}
                    style={styles.input}></TextInput>
                </View>
              )}

              <View style={{...styles.section, marginTop: hp('5%')}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleCalculation()}>
                  <Text style={styles.heading}>Calculate</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={{...styles.section, marginTop: hp('6%')}}>
                <Text style={styles.heading}>TOTAL NET WORTH</Text>
                <Text style={{...styles.heading, color: 'yellow'}}>
                  RS {worth}
                </Text>
              </View>

              <View style={{...styles.section, marginTop: hp('4%')}}>
                <Text style={styles.heading}>ZAKAT PAYABLE</Text>
                <Text style={{...styles.heading, color: 'yellow'}}>
                  Rs {totalZakatAmount}
                </Text>
              </View>

              <View style={{...styles.section, marginTop: hp('5%')}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => resetValue()}>
                  <Text style={styles.heading}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default ZakatCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    color: 'black',
    fontFamily: 'Popline-Regular',
  },
  heading: {
    fontSize: hp('3%'),
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Popline-Regular',
  },
  section: {
    alignItems: 'center',
    marginTop: hp('6%'),
  },
  input: {
    backgroundColor: '#fff',
    width: wp('74%'),
    height: hp('6%'),
    borderRadius: wp('1%'),
    fontSize: hp('2.5%'),
    justifyContent: 'center',
    color: '#333',
    fontFamily: 'Popline-Regular',
  },
  btn: {
    backgroundColor: 'orange',
    width: wp('50%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1%'),
  },
});
