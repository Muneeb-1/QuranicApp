import axios from 'axios';

const getLocationName = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?key=${'8088aa01d497491199a5a0ba7b977029'}&q=${latitude}+${longitude}&pretty=1`,
    );

    const {results} = response.data;
    if (results.length > 0) {
      const locationName = results[0];
      return locationName;
    } else {
      return 'Unknown Location';
    }
  } catch (error) {
    console.error('Error fetching location name:', error.message);
    return 'Unknown Location';
  }
};

export default getLocationName;
