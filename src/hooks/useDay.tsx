import {
  getNextDayOfSelectedDay,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from '../utils';
export function getnextday(date: Date) {
  const date1 = new Date(date)
    .toISOString()
    .split('-')
    .map(el => parseInt(el));
  date1[2]++;
  return new Date(date1.join('-'));
}
export default function useDay() {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const tomorrow = getnextday(today).toISOString().slice(0, 10);
  const firstDayOfThisMonth = getFirstDayOfMonth(thisYear, thisMonth)
    .toISOString()
    .slice(0, 10);
  const lastDayOfThisMonth = getLastDayOfMonth(thisYear, thisMonth + 1)
    .toISOString()
    .slice(0, 10);
  const lastDayOfThisWeek = new Date(
    thisYear,
    thisMonth,
    today.getDate() - (today.getDay() - 1) + 7,
  )
    .toISOString()
    .slice(0, 10);

  return {
    today: today.toISOString().slice(0, 10),
    tomorrow,
    firstDayOfThisMonth,
    lastDayOfThisMonth,
    lastDayOfThisWeek,
    getNextDayOfSelectedDay,
  };
}
