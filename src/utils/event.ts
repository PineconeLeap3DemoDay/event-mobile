import { colors } from "../../colors";

export function getDaysWithEvent(events: [any]) {
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
export function getNextDayOfSelectedDay(month: any, day: any) {
  const date = (new Date(`2023-${month}-${day}`).toISOString().split('-').map((el) => parseInt(el)))
  date[2]++;
  return date.join('-')
}
export function getFirstDayOfMonth(year: any, month: any) {
  return new Date(year, month - 1, 2);
}
export function getLastDayOfMonth(year: any, month: any) {
  return new Date(year, month, 1);
}
export function convertMonthAsString(month: number) {
  switch (month) {
    case 1:
      return 'Нэгдүгээр'
    case 2:
      return 'Хоёрдугаар'
    case 3:
      return 'Гуравдугаар'
    case 4:
      return 'Дөрөвдүгээр'
    case 5:
      return 'Тавдугаар'
    case 6:
      return 'Зургаадугаар'
    case 7:
      return 'Долоодугаар'
    case 8:
      return 'Наймдугаар'
    case 9:
      return 'Ёс дүгээр'
    case 10:
      return 'Арав дугаар'
    case 11:
      return 'Арван нэгдүгээр'
    case 12:
      return 'Арван хоёрдугаар'
  }
}
export function convertDayAsString(day: string) {
  switch (day) {
    case 'Mon':
      return 'Да'
    case 'Tue':
      return 'Мя'
    case 'Web':
      return 'Лха'
    case 'Thu':
      return 'Пүр'
    case 'Fri':
      return 'Баасан'
    case 'Sat':
      return 'Ба'
    case 'Sun':
      return 'Ня'
  }
}
export function formatEventDate(date: number) {
  const d = new Date(date);
  const hour = d.getHours();
  const minute = d.getMinutes();
  const dayAsString = convertDayAsString((d.toDateString().slice(0, 3)))
  const month = (d.getMonth());
  const dayAsNumber = (d.getDate());
  
  return `${dayAsString}, ${month} сарын ${dayAsNumber} ны ${hour}:${minute} цагт`
}
