import React, { useEffect, useState } from "react";
import myDates from "../tools/dates.json";

function CalendarWidget() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const user = localStorage.getItem("user");

  let startDate = new Date(today.getFullYear(), 0, 1);
  let days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7);

  const [calendarDates, setCalendarDates] = useState([]);

  console.log(myDates);

  useEffect(() => {
    const getCalendar = () => {
      fetch(`https://date.nager.at/api/v3/publicholidays/${year}/DK`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          data.map((date) => {
            let dateObj = new Date(date.date);
            let month = dateObj.getMonth();
            console.log(month);
            if (dateObj.getMonth() === new Date().getMonth()) {
              setCalendarDates((calendarDates) => [...calendarDates, date]);
              console.log(calendarDates);
            }
          });
        });
    };

    const getMyCalendar = () => {
      myDates.map((date: any) => {
        let dateObj = new Date(date.date);
        let month = dateObj.getMonth();
        console.log(month);
        if (dateObj.getMonth() === new Date().getMonth()) {
          setCalendarDates((calendarDates) => [...calendarDates, date]);
        }
      });
    };

    getCalendar();
    getMyCalendar();
  }, []);

  return (
    <div className=" bg-gray-900 rounded-xl p-4 flex items-center gap-4 m-4 text-gray-100">
      <p className="text-2xl">
        {day}/{month}/{year} - Week: {weekNumber}
      </p>
      <ul className="align-middle gap-4 flex ">
        {calendarDates.map((date: any) => (
          <li
            className="mx-4 shadow-xl bg-gray-800 text-gray-200  p-4 flex gap-2 rounded-lg sm:py-2 "
            key={date.date}
          >
            {date.date} - {date.localName}
            {date.type === "birthday" ? (
              <div> 🎂 {today.getFullYear() - date.year} År </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarWidget;
