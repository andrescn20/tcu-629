const formatDateToLocalTime = (utcDateString: string): string => {
  const utcDate = new Date(utcDateString);
  const localdate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
  return localdate.toLocaleString();
};

export default formatDateToLocalTime;