import React from "react";

const ShowDate = ({ timestamp, time }) => {
  const date = new Date(timestamp);
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dateShower = date.toLocaleDateString("en-GB", dateOptions);
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const timeShower = date.toLocaleTimeString("en-GB", timeOptions);
  return (
    <td className="px-6 py-4 text-end">
      <p className=" text-sm">{dateShower}</p>
      {time && <p className=" text-sm">{timeShower}</p>}
    </td>
  );
};

export default ShowDate;
