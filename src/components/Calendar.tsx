import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar as RNCalender, LocaleConfig, Agenda } from 'react-native-calendars';
import { gql, useQuery } from '@apollo/client';
import { colors } from '../../colors';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Нэгдүгээр сар',
    'Хоёрдугаар сар',
    'Гуравдугаар сар',
    'Дөрөвдүгээр сар',
    'Тавдугаар сар',
    'Зургаадугаар сар',
    'Долоодугаах сар',
    'Наймдугаар сар',
    'Ёс дүгээр сар',
    'Арав дугаар сар',
    'Арван нэгдүгээр сар',
    'Арван хоёрдугаар сар'
  ],
  monthNamesShort: [
    'Нэгдүгээр сар',
    'Хоёрдугаар сар',
    'Гуравдугаар сар',
    'Дөрөвдүгээр сар',
    'Тавдугаар сар',
    'Зургаадугаар сар',
    'Долоодугаах сар',
    'Наймдугаар сар',
    'Ёс дүгээр сар',
    'Арав дугаар сар',
    'Арван нэгдүгээр сар',
    'Арван хоёрдугаар сар'
  ],
  dayNames: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'],
  dayNamesShort: ['Да', 'Мя', 'Лха', 'Пүр', 'Баа', 'Бя', 'Ня'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

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
export function CustomCalendar() {
  const d = new Date();
  let thisYear = d.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(d.getMonth());
  const [selectedDay, setSelectedDay] = useState('');
  let selectedMonthFirstDay = new Date(`${thisYear}-${selectedMonth + 1}-1`)
  let selectedMonthLastDay = new Date(thisYear, selectedMonth + 1, 0);

  //this will get this month all events
  const { data: allEvents } = useQuery(GET_EVENTS, {
    variables: { arg: { from: selectedMonthFirstDay, to: selectedMonthLastDay } },
    refetchWritePolicy: 'merge'
  });

  //this will show days with events
  const daysWithEvents = getDaysWithEvent(allEvents?.events);
  
  // this is selected day's next day
  const nextdayofselectedDay = getNextDayOfSelectedDay(selectedDay);

  const { data: userSelectedDayEvents } = useQuery(GET_EVENT, {
    variables: { arg: { from: selectedDay, to: nextdayofselectedDay } },
    refetchWritePolicy: 'merge'
  });
  function onDayPress(day: any) {
    setSelectedDay(day.dateString)
  }
  function onMonthChange(month: any) {
    setSelectedMonth(month.month)
  }
  const markedDates = { ...daysWithEvents, 
    [selectedDay]: 
    { 
      selected: true, 
      selectedColor: colors['secondary'],
      selectedTextColor: 'white'
    } 
  }
  
  const isSelectedDayHasAnyEvents = userSelectedDayEvents?.events.length > 0;
  return (
    <SafeAreaView className='bg-white w-full flex flex-1'>
      <RNCalender
        theme={theme}
        onMonthChange={onMonthChange}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      
      {isSelectedDayHasAnyEvents ? userSelectedDayEvents?.events.map((event: any) => {
        return(
          <TouchableOpacity onPress={() => {
            console.log('gaa', event)
          }} key={event.id}>
            <Text>{event.title}</Text>
          </TouchableOpacity>
        )
      }) :
        <View>
          <Text>ene odor event baihgui baina</Text>
        </View>
      }
    </SafeAreaView>
  )
}



const theme = {
  dayTextColor: colors['primary'],
  todayTextColor: 'black'
}

function getDaysWithEvent(events: [any]) {
  const markedDates = events?.filter((event: any) => event.startDate = new Date(event.startDate).toISOString().slice(0, 10))
    .reduce((a: any, b: any) => {
      const { startDate } = b;
      a[startDate] = a[startDate] ?? {};
      a[startDate].marked = true;
      a[startDate].selectedColor = 'yellow',
      a[startDate].dotColor = colors['secondary']
      return a;
    }, {});
  return markedDates
}
function getNextDayOfSelectedDay(selectedDay: string) {
  const date = selectedDay.split('-').map((el) => parseInt(el));
  date[2]++;
  return date.join('-')
}