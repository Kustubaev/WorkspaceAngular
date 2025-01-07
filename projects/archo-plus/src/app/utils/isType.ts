export const isNumber = (variable: any) => {
  return typeof variable === 'number' && !isNaN(variable);
};

export const isString = (variable: any) => {
  return typeof variable === 'string';
};
