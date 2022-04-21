import costComma from './costComma';

export const signRatePositive = (str: number | string) => {
  let num = Number(str);
  if (Math.sign(num) === 1) {
    return `+${costComma(num)}`;
  } else if (Math.sign(num) === 0) {
    return '0.00';
  } else {
    return `${costComma(num)}`;
  }
};

export const signPricePositive = (str: number | string) => {
  let num = Number(str);
  if (Math.sign(num) === 1) {
    return `+${costComma(num)}`;
  } else if (Math.sign(num) === 0) {
    return num;
  } else {
    return `${costComma(num)}`;
  }
};