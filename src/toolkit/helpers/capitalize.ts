export const capitalize = (name?: string): string => {
  if (!name) return '';
  const nameArray = name.split('');
  nameArray[0] = nameArray[0].toUpperCase();
  return nameArray.join('');
};
