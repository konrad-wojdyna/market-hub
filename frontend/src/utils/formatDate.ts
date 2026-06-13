export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric",
  });
};
