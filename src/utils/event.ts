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