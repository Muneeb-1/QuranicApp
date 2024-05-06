import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
const Calender = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
    />
  );
};

export default Calender;
