import { create } from "zustand";
export interface ICalendarStore {
    selectedDay: number,
    selectedMonth: number,
    setSelectedDay: () => void,
    setSelectedMonth: () => void,
}

const useCalendar = create<ICalendarStore>((set) => {
    const d = new Date();
    let thisYear = d.getFullYear();
    // const [selectedMonth] = useState(d.getMonth());
    // const [selectedDay] = useState('');
    let selectedMonthFirstDay = new Date(`${thisYear}-${d.getMonth()}-1`)
    let selectedMonthLastDay = new Date(thisYear, d.getMonth(), 0);
    return({
        selectedDay: 1,
        selectedMonth: d.getMonth(),
        setSelectedDay: () => {},
        setSelectedMonth: () => {}
    })
});
export default useCalendar;