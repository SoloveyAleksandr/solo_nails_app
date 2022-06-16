import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface IDayItem {
  fullDate: string,
  day: string,
  month: string,
  year: string,
  isWeekend: boolean,
  isPrevMonth: boolean,
  isNextMonth: boolean,
  isToday: boolean,
}

export interface IDay {
  fullDate: string,
  day: string,
  month: string,
  workList: IWorkItem[],
}

export interface IWorkItem {
  id: string,
  time: string,
  reserved: boolean,
  client: {
    name: string,
    phone: string,
    comment: string,
  }
}

const selectedMonth: IDayItem[] = [];
const month: number = 0;
const year: number = 0;
const selectedDate: string = '';
const selectedDay: IDay = {
  fullDate: '',
  day: '',
  month: '',
  workList: [],
};
const isAdmin: boolean = false;

const AppStore = createSlice({
  name: 'AppStore',

  initialState: {
    selectedMonth,
    month,
    year,
    selectedDay,
    selectedDate,
    isAdmin,
  },

  reducers: {
    setSelectedMonth(state, action: { payload: IDayItem[] }) {
      state.selectedMonth = action.payload;
    },

    setMonth(state, action: { payload: number }) {
      state.month = action.payload;
    },

    setYear(state, action: { payload: number }) {
      state.year = action.payload;
    },

    setNextMonth(state) {
      if (state.month < 12) {
        state.month = state.month + 1;
      } else {
        state.month = 1;
        state.year = state.year + 1;
      }
    },

    setPrevMonth(state) {
      if (state.month > 1) {
        state.month = state.month - 1;
      } else {
        state.month = 12;
        state.year = state.year - 1;
      }
    },

    setSelectedDay(state, action: { payload: IDay }) {
      state.selectedDay = action.payload;
    },

    setSelectedDate(state, action: { payload: string }) {
      state.selectedDate = action.payload;
    },
    setIsAdmin(state, action: { payload: boolean }) {
      state.isAdmin = action.payload;
    },
  },
});

export const {
  setSelectedMonth,
  setMonth,
  setYear,
  setNextMonth,
  setPrevMonth,
  setSelectedDay,
  setSelectedDate,
  setIsAdmin,
} = AppStore.actions;

const store = configureStore({
  reducer: {
    AppStore: AppStore.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch