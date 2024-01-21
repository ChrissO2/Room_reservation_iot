export const formatISODate = (isoDate) => {
  const [date, time] = isoDate.split("T");
  const parsedTime = time.substring(0, 5);
  return `${date} ${parsedTime}`;
};
