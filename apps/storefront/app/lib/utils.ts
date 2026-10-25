export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("fr", {
    dateStyle: "long",
  }).format(new Date(date));
};
