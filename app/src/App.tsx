import { NavLink, Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header/Header";

import './App.css';
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setMonth, setYear } from "./store";

function App() {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    reduxDispatch(setMonth(currentMonth));
    reduxDispatch(setYear(currentYear));
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
