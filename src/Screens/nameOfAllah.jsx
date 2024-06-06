import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {data} from '../Data/nameofAllah';
import Share from 'react-native-share';

const ITEMS_PER_PAGE = 10; // Number of items per page

const NameOfAllah = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, [page]);

  const loadItems = () => {
    const newItems = data.slice(0, page * ITEMS_PER_PAGE);
    setItems(newItems);
  };

  const loadMore = () => {
    if (items.length < data.length) {
      setPage(page + 1);
    }
  };

  const shareCard = item => {
    const shareOptions = {
      message: `${item.Id}. ${item.name}\n\n${item.urdu}\n\n${item.meaning}`,
    };
    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => err && console.log(err));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/nameOfAllah.jpeg')}
        style={styles.image}>
        <FlatList
          data={items}
          keyExtractor={item => item.Id.toString()}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
          horizontal
          renderItem={({item}) => (
            <View style={styles.cardView}>
              <View style={styles.numbView}>
                <Text style={styles.numbText}>{item.Id.toString()}.</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.urduText}>{item.urdu}</Text>
                <Text style={styles.meaningText}>{item.meaning}</Text>
              </View>
              <TouchableOpacity
                onPress={() => shareCard(item)}
                style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </ImageBackground>
    </View>
  );
};

export default NameOfAllah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    width: wp('80%'),
    height: hp('60%'),
    gap: 30,
    backgroundColor: '#fff',
    borderRadius: hp('2%'),
    elevation: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbText: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: '600',
  },
  nameText: {
    color: 'gray',
    fontSize: hp('4.5%'),
    fontWeight: '600',
  },
  urduText: {
    color: 'green',
    fontSize: hp('3%'),
    textAlign: 'center',
    marginTop: 30,
  },
  meaningText: {
    color: '#333',
    fontSize: hp('2.5%'),
    marginTop: 20,
    textAlign: 'center',
    maxWidth: '90%',
  },
  shareButton: {
    marginBottom:20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#008CBA',
    borderRadius: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
  },
});
