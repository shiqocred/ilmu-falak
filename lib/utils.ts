import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToDecimal = (
  degrees: number,
  minutes: number,
  seconds: number
) => {
  const decimalDegrees = degrees + minutes / 60 + seconds / 3600;
  return decimalDegrees.toFixed(9);
};

export const convertToDerajat = (decimal: number) => {
  if (decimal.toString().startsWith("-")) {
    const decimalAbs = Math.abs(decimal);
    return -Math.floor(decimalAbs);
  }
  const decimalAbs = Math.abs(decimal);
  return Math.floor(decimalAbs);
};

export const convertToMenit = (decimal: number) => {
  const decimalAbs = Math.abs(decimal);
  const derajatAbs = Math.floor(decimalAbs);
  return Math.floor((decimalAbs - derajatAbs) * 60);
};

export const convertToDetik = (decimal: number) => {
  const decimalAbs = Math.abs(decimal);
  const derajatAbs = Math.floor(decimalAbs);
  const menitAbs = Math.floor((decimalAbs - derajatAbs) * 60);
  const countMenit = menitAbs / 60;
  return (decimalAbs - derajatAbs - countMenit) * 3600;
};

export const convertSin = (number: number) => {
  return Math.sin(number * (Math.PI / 180));
};
export const convertCos = (number: number) => {
  return Math.cos(number * (Math.PI / 180));
};
export const convertTan = (number: number) => {
  return Math.tan(number * (Math.PI / 180));
};
export const convertCotan = (number: number) => {
  return 1 / Math.tan(number * (Math.PI / 180));
};

export const convertFromTan = (number: number) => {
  return Math.atan(number) * (180 / Math.PI);
};
export const convertFromCos = (number: number) => {
  return (Math.acos(number) * 180) / Math.PI;
};

export const getTrueValue = (number: number) => {
  return 1 / number;
};
