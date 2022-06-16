import { Routes, Route, Navigate } from 'react-router';
import React, { FC } from "react";
import { useAppSelector } from './store/hooks';
import Calendar from './screens/Calendar/Calendar';
import Day from './screens/Day/Day';

const AppRouter: FC = () => {
  const appState = useAppSelector(state => state.AppStore);

  return (
    <Routes>
      <Route
        path='/calendar'
        element={<Calendar />} />
      {
        appState.selectedDate ?
          <Route
            path={'/day'}
            element={<Day />} />
          :
          <Route
            path={'/day'}
            element={<Navigate to='/calendar' />} />
      }
      <Route
        path='/*'
        element={<Navigate to='/calendar' />} />
    </Routes>
  );
};

export default AppRouter;
