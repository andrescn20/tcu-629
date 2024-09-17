import React from "react";
import formatDateToLocalTime from "../utils/formatDate";

interface DeviceCardProps {
  title: string;
  value: number;
  date: string | undefined;
}

const DeviceCard = ({ title, value, date }: DeviceCardProps) => {
  console.log(title, date)
  return (
    <div className="flex flex-col p-4 m-2 bg-white border-slate-500 border-2 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-md font-bold">{title}:</p>
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_6_296)">
            <path
              d="M28 29.52V7C28 5.67392 27.4732 4.40215 26.5355 3.46447C25.5979 2.52678 24.3261 2 23 2C21.6739 2 20.4021 2.52678 19.4645 3.46447C18.5268 4.40215 18 5.67392 18 7V29.52C16.3946 30.5927 15.1766 32.1532 14.5261 33.9712C13.8756 35.7891 13.827 37.7681 14.3875 39.6158C14.948 41.4635 16.0878 43.082 17.6387 44.2322C19.1895 45.3824 21.0692 46.0033 23 46.0033C24.9308 46.0033 26.8105 45.3824 28.3613 44.2322C29.9122 43.082 31.052 41.4635 31.6125 39.6158C32.173 37.7681 32.1244 35.7891 31.4739 33.9712C30.8234 32.1532 29.6054 30.5927 28 29.52Z"
              stroke="#1E1E1E"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_296">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="text-4xl font-bold flex justify-center my-2">{value} °C</div>
      {date && <div>Tomada el: {formatDateToLocalTime(date, true)}</div>}
    </div>
  );
};

export default DeviceCard;
