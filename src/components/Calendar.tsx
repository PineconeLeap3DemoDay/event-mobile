import React from 'react';
import { Calendar as RNCalender, LocaleConfig } from 'react-native-calendars';
import { colors } from '../../colors';
import { responsiveWidth } from '../utils/width';
import { useTheme } from '../hooks';
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
  const {isDark} = useTheme();
  const theme = {
    calendarBackground: isDark ? colors.dark.primary : colors.white,
    dayTextColor: isDark ? colors.white : 'black',
    todayTextColor: isDark ? colors.white : 'black',
    arrowColor: colors.secondary,
    monthTextColor: isDark ? colors.white : 'black',
    textMonthFontWeight: 'bold',
    textSectionTitleColor: isDark ? colors.white : 'black',
    textDayFontSize: responsiveWidth(14),
  }
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


