export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const scope = 2;
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - scope && i <= currentPage + scope)
    ) {
      range.push(i);
    }
  }

  let lastSeen;
  for (const i of range) {
    if (lastSeen) {
      if (i - lastSeen === 2) {
        rangeWithDots.push(lastSeen + 1);
      } else if (i - lastSeen !== 1) {
        rangeWithDots.push("...");
      }
    }

    rangeWithDots.push(i);
    lastSeen = i;
  }

  return rangeWithDots;
};
