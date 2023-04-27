import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { colors } from '../../colors';
import { CustomCalendar } from '../components'
import { getDaysWithEvent, getFirstDayOfMonth, getLastDayOfMonth, getNextDayOfSelectedDay } from '../utils';

const GET_EVENTS = gql`
  query Events($arg:eventsQueryInput) {
    events(arg: $arg) {
      title
      id
     startDate
    }
 }
`
const GET_EVENT = gql`
  query Events($arg:eventsQueryInput) {
    events(arg: $arg) {
      title
      id
     startDate
    }
 }
`
export function Calendar() {
  const d = new Date();
  let thisYear = d.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(d.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(d.getDate());
  const [selectedDayDateString, setSelectedDayDateString] = useState(`2023-04-05`);

  let selectedMonthFirstDay = getFirstDayOfMonth(thisYear, selectedMonth);
  let selectedMonthLastDay = getLastDayOfMonth(thisYear, selectedMonth);

  //this will get this month all events
  const { data: allEvents } = useQuery(GET_EVENTS, {
    variables: { arg: { from: selectedMonthFirstDay, to: selectedMonthLastDay } },
    refetchWritePolicy: 'merge',
  });
  const nextdayofselectedDay = getNextDayOfSelectedDay(selectedMonth, selectedDay);
  const daysWithEvents = getDaysWithEvent(allEvents?.events);
  const { data: userSelectedDayEvents } = useQuery(GET_EVENT, {
    variables: { arg: { from: selectedDayDateString, to: nextdayofselectedDay } },
    refetchWritePolicy: 'merge',
  });

  const markedDates = {
    ...daysWithEvents,
    [selectedDayDateString]:
    {
      selected: true,
      selectedColor: colors['secondary'],
      selectedTextColor: 'white'
    },
  };
  function onDayPress(day: any) {
    setSelectedDayDateString(day.dateString);
    setSelectedDay(day.day);
  }
  function onMonthChange(date: any) {
    setSelectedMonth(date.month);
  }
  return (
    <SafeAreaView className='bg-white w-full flex flex-1'>
      <CustomCalendar
        markeddates={markedDates}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
      />
    </SafeAreaView>
  )
}
