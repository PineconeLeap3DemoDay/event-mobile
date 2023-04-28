import React from 'react';
import { Calendar as RNCalender, LocaleConfig } from 'react-native-calendars';
import { colors } from '../../colors';
import { responsiveWidth } from '../utils/width';
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
      <RNCalender
        //@ts-ignore
        theme={theme}
        style={{marginTop: responsiveWidth(20)}}
        onMonthChange={onMonthChange}
        onDayPress={onDayPress}
        markedDates={markeddates}
      />
  )
}

const theme = {
  dayTextColor: 'black',
  todayTextColor: 'black',
  arrowColor: colors.secondary,
  monthTextColor: 'black',
  textMonthFontWeight: 'bold',
  textSectionTitleColor: 'black',
  textDayFontSize: responsiveWidth(14),
}
