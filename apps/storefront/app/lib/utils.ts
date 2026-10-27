export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("fr", {
    dateStyle: "long",
  }).format(new Date(date));
};

const pluralForms = {
  zero: "0 offre",
  one: "1 offre",
  two: "2 offres",
  other: "{count} offres",
  few: "{count} offres",
  many: "{count} offres",
};

export const pluralize = (count: number) => {
  const rules = new Intl.PluralRules("fr-FR");
  let category = rules.select(count);

  if (count === 0 && pluralForms.zero) {
    category = "zero";
  }

  const phrase = pluralForms[category] || pluralForms.zero;
  return phrase.replace("{count}", String(count));
};
