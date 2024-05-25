interface Option {
  label: string;
}

export function sortOptionByLabel(a: Option, b: Option) {
  const labelA = a.label.toString();
  const labelB = b.label.toString();
  return labelA.localeCompare(labelB);
}
