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
interface ICalenderProps {
  markeddates: any;
  onDayPress: any;
  onMonthChange: any;
}
export function CustomCalendar({markeddates,onDayPress, onMonthChange}:ICalenderProps) {
  return (
    <SafeAreaView className='bg-white w-full flex flex-1'>
      <RNCalender
        theme={theme}
        onMonthChange={onMonthChange}
        onDayPress={onDayPress}
        markedDates={markeddates}
      />
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