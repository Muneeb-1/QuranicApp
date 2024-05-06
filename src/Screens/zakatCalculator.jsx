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

const ZakatCalculator = () => {
  const [totalZakatAmount, setZakatAmount] = useState(0);
  //////
  const [zakatOnCash, setzakatOnCash] = useState(0);
  const [zakatOnGold, setzakatOnGold] = useState(0);
  const [zakatOnSilver, setzakatOnSilver] = useState(0);
  //////
  const [cashWorth, setCashWorth] = useState(0);
  const [goldWorth, setGoldWorth] = useState(0);
  const [silverWorth, setSilverWorth] = useState(0);
  /////
  const [worth, setWorth] = useState(0);

  const calculateZakatOnCash = cash => {
    const nisabThreshold = 1473000;
    setCashWorth(cash);
    const cashValue = parseFloat(cash) || 0; // Convert cash to a number or default to 0 if empty
    const zakatAmount = cashValue >= nisabThreshold ? cashValue * 0.025 : 0;
    setzakatOnCash(zakatAmount.toFixed(2));
  };

  const calculateZakatOnGold = weight => {
    const nisabThreshold = 87.48;
    const goldPrice = 18879;
    const goldWeight = parseFloat(weight) || 0;
    // Convert weight to a number or default to 0 if empty
    const totalValue = goldWeight * goldPrice;
    setGoldWorth(totalValue);
    const zakatAmount = goldWeight >= nisabThreshold ? totalValue * 0.025 : 0;
    setzakatOnGold(zakatAmount.toFixed(2));
  };

  const calculateZakatOnSilver = weight => {
    const nisabThreshold = 612.36;
    const silverPrice = 223;
    const silverWeight = parseFloat(weight) || 0;
    const totalValue = silverWeight * silverPrice;
    setSilverWorth(totalValue);
    const zakatAmount = silverWeight >= nisabThreshold ? totalValue * 0.025 : 0;
    setzakatOnSilver(zakatAmount.toFixed(2));
  };

  const handleCalculation = () => {
    console.log('C', cashWorth);
    console.log('G', goldWorth);
    console.log('S', silverWorth);
    const totalzakat =
      parseFloat(zakatOnCash) +
      parseFloat(zakatOnGold) +
      parseFloat(zakatOnSilver);

    const totalworth =
      parseFloat(cashWorth) + parseFloat(goldWorth) + parseFloat(silverWorth);

    setTimeout(() => {
      setZakatAmount(totalzakat.toFixed(2));
      setWorth(totalworth.toFixed(2));
    }, 500);
  };

  const resetValue = () => {
    setZakatAmount(0);
    setzakatOnCash(0);
    setzakatOnGold(0);
    setzakatOnSilver(0);
    setSilverWorth(0);
    setCashWorth(0);
    setGoldWorth(0);
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
              ⚪ Cash in Hand (approximately Rs. 1,473,000)
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
                  onChangeText={text => calculateZakatOnCash(text)}
                  style={styles.input}></TextInput>
              </View>

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
                  onChangeText={text => calculateZakatOnGold(text)}
                  style={styles.input}></TextInput>
              </View>

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
                  onChangeText={text => calculateZakatOnSilver(text)}
                  style={styles.input}></TextInput>
              </View>

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
