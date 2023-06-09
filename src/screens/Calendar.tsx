import {gql, useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../colors';
import {CustomCalendar} from '../components';
import EventList from '../components/EventList';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import {useTheme} from '../hooks';
import {
  getDaysWithEvent,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNextDayOfSelectedDay,
} from '../utils';

const GET_EVENTS = gql`
  query Events($arg: eventsQueryInput) {
    events(arg: $arg) {
      title
      _id
      thumbnail
      startDate
    }
  }
`;
const GET_EVENT = gql`
  query Events($arg: eventsQueryInput) {
    events(arg: $arg) {
      title
      _id
      startDate
      about
      location
      thumbnail
    }
  }
`;

export function Calendar() {
  const d = new Date();
  let thisYear = d.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(d.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(d.getDate());
  const [selectedDayDateString, setSelectedDayDateString] =
    useState('2023-05-01');
  const {isDark} = useTheme();
  let selectedMonthFirstDay = getFirstDayOfMonth(thisYear, selectedMonth);
  let selectedMonthLastDay = getLastDayOfMonth(thisYear, selectedMonth);
  //this will get this month all events
  const {data: allEvents} = useQuery(GET_EVENTS, {
    variables: {arg: {from: selectedMonthFirstDay, to: selectedMonthLastDay}},
    refetchWritePolicy: 'merge',
  });
  const nextdayofselectedDay = getNextDayOfSelectedDay(
    selectedMonth,
    selectedDay,
  );
  const daysWithEvents = getDaysWithEvent(allEvents?.events);
  const {data: userSelectedDayEvents} = useQuery(GET_EVENT, {
    variables: {arg: {from: selectedDayDateString, to: nextdayofselectedDay}},
    refetchWritePolicy: 'merge',
  });
  console.log({from: selectedDayDateString, to: nextdayofselectedDay});
  const markedDates = {
    ...daysWithEvents,
    [selectedDayDateString]: {
      selected: true,
      selectedColor: colors.secondary,
      selectedTextColor: 'white',
    },
  };
  function onDayPress(day: any) {
    setSelectedDayDateString(day.dateString);
    setSelectedDay(day.day);
  }
  function onMonthChange(date: any) {
    setSelectedMonth(date.month);
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? colors.dark.primary : 'white',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackArrow />
      <CustomCalendar
        markeddates={markedDates}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
      />
      <EventList
        notFoundTitle="Энэхүү өдөр эвэнт байхгүй байна"
        cartDirection="row"
        events={userSelectedDayEvents?.events}
      />
    </SafeAreaView>
  );
}
