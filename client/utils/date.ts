const makeZeros = (number: number) => {
  return number > 9 ? number : `0${number}`;
};

export const formattedDate = (date: Date) => {
  const newDate = new Date(date);
  const day = makeZeros(newDate.getDate());
  const month = makeZeros(newDate.getMonth() + 1);
  const year = newDate.getFullYear();

  const hours = makeZeros(newDate.getHours());
  const minutes = makeZeros(newDate.getMinutes());

  return {
    day,
    month,
    year,
    fullDate() {
      return `${day}-${month}-${year}`;
    },
    getTime() {
      return `${hours}:${minutes}`;
    }
  };
};
