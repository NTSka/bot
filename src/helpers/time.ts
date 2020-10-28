export const getDate = () => {
  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${year}-${month}-${date}`;
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
