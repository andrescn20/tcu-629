const formatDateToLocalTime = (utcDateString: string, invert:boolean = false): string => {
  const utcDate = new Date(utcDateString);
  let localdate;
  if(invert){
    localdate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset()*60*1000);
  }else{
    localdate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset()*60*1000);
  }
  return localdate.toLocaleString();
};

export default formatDateToLocalTime;