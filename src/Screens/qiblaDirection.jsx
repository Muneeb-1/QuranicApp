import React, {useState, useEffect, useCallback} from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';
import CompassHeading from 'react-native-compass-heading';

const QiblaDirection = () => {
  const data = useSelector(state => state.deviceLocationReducer);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const calculateQiblaDirection = () => {
      const qiblaLatitude = 21.4225;
      const qiblaLongitude = 39.8262;
      const dy = qiblaLongitude - data.longitude;
      const y =
        Math.sin((dy * Math.PI) / 180) *
        Math.cos((qiblaLatitude * Math.PI) / 180);
      const x =
        Math.cos((latitude * Math.PI) / 180) *
          Math.sin((qiblaLatitude * Math.PI) / 180) -
        Math.sin((data.latitude * Math.PI) / 180) *
          Math.cos((qiblaLatitude * Math.PI) / 180) *
          Math.cos((dy * Math.PI) / 180);
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      const qiblaDirection = (angle + 360) % 360;
      setRotation(qiblaDirection);
    };

    if (data) {
      calculateQiblaDirection();
    }
    const degreeUpdateRate = 1;
    CompassHeading.start(degreeUpdateRate, ({heading}) => {
      setRotation(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/compassbackground.jpeg')}
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../image/qiblacompass.png')}
          style={{
            ...styles.compass,
            transform: [{rotate: `${rotation}deg`}],
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  compass: {
    width: '95%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default QiblaDirection;
