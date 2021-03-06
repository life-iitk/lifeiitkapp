import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { View } from 'react-native';

const Strip = props => {
  return (
    <View>
      <CalendarStrip
        selectedDate={props.date}
        onDateSelected={props.onChange}
        daySelectionAnimation={{
          type: 'background',
          highlightColor: '#4b5cb8'
        }}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: 'white' }}
        calendarColor={'#32408F'}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        highlightDateNumberStyle={{ color: 'white' }}
        highlightDateNameStyle={{ color: 'white' }}
        iconContainer={{ flex: 0.1 }}
        markedDates={props.dots}
      />
    </View>
  );
};

export default Strip;
