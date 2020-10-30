export const getDate = () => {
  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${year}-${month}-${date}`;
};

export const isMorning = () => new Date().getHours() < 18 && new Date().getHours() >= 6;

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
