import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";

interface PTOData {
  startDate: string;
  endDate: string;
  reason: string;
}

const PTOCalendar: React.FC = () => {
  const [ptoData, setPtoData] = useState<PTOData[]>([]);

  useEffect(() => {
    fetch("/api/pto")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPtoData(data);
      });
  }, []);

  // Map PTO data to event format expected by FullCalendar
  const events: EventInput[] = ptoData.map((pto) => ({
    title: pto.reason,
    start: pto.startDate,
    end: pto.endDate,
    classNames: ["highlight"],
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default PTOCalendar;
