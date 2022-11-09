import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CalendarBig from "../components/calendar/calendarBig";
import CalendarMini from "../components/calendar/calendarMini";

const Calendar = () => {
  const [screen, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
    });
  }, []);

  return (
    <>
      {
        screen <= 1050 ? (
          <CalendarMini />
        ) : (
          <CalendarBig />
        )
      }
    </>
  );
};

export default Calendar;
