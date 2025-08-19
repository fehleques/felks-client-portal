export const requestCategories = [
  "Logo Design",
  "Web Design",
  "Social Media Graphics",
  "Print Design",
  "Brand Identity",
  "UI/UX Design",
  "Illustrations",
  "Packaging Design",
  "Other"
] as const;

export type RequestCategory = typeof requestCategories[number];
