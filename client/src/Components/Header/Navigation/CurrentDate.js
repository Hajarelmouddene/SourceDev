import React, { useState } from "react";
import { format } from "date-fns";

const CurrentDate = () => {
  const [date, setDate] = useState(new Date());
  setTimeout(() => {
    setDate(new Date());
  }, 1000);

  const currentDate = format(date, "p · iii MMM do, yyyy");
  return <div>{currentDate}</div>;
};

export default CurrentDate;
