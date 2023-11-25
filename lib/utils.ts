import { type ClassValue, clsx } from "clsx";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export const lintangArray = [
  { name: "LU", value: "lintang utara" },
  { name: "LS", value: "lintang selatan" },
];
export const bujurArray = [
  { name: "BB", value: "bujur barat" },
  { name: "BT", value: "bujur timur" },
];
export const hariCollection = [
  "Ahad",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];
export const bulanCollection = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const tanggalArray = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];
export const bulanArray = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToDecimal = (a: number, b: number, c: number) => {
  return Number(`${a}.${b}`).toString().startsWith("-")
    ? -parseFloat((Math.abs(a) + b / 60 + c / 3600).toFixed(9))
    : parseFloat((Math.abs(a) + b / 60 + c / 3600).toFixed(9));
};

export const convertToDerajat = (a: number) => {
  const value = {
    derajat: Math.floor(
      a.toString().startsWith("-") ? -Math.floor(Math.abs(a)) : Math.abs(a)
    ),
    menit: Math.floor((Math.abs(a) - Math.abs(Math.floor(a))) * 60),
    detik: parseFloat(
      (
        (Math.abs(a) -
          Math.floor(Math.abs(a)) -
          Math.floor((Math.abs(a) - Math.floor(Math.abs(a))) * 60) / 60) *
        3600
      ).toFixed(2)
    ),
  };
  return value;
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

export const ikhtiyatiResult = (
  a: number,
  b: number,
  f: number,
  setA: (v: SetStateAction<string>) => void,
  setB: (v: SetStateAction<string>) => void,
  t: "ashar" | "maghrib" | "isya" | "terbit" | "dhuha" | "dzuhur"
) => {
  let tmb = 0;
  if (t === "ashar" || t === "maghrib" || t === "isya") {
    tmb += a + f - b;
  } else if (t === "terbit" || t === "dhuha") {
    tmb += a - f - b;
  } else if (t === "dzuhur") {
    tmb += a - b;
  }
  const c = convertToDerajat(tmb);
  const d = c.detik;
  if (t === "terbit") {
    c.menit -= 1;
  } else {
    c.menit += 2;
  }
  if (c.menit > 59) {
    c.derajat += 1;
    c.menit -= 60;
  }
  if (c.menit < 0) {
    c.derajat -= 1;
    c.menit += 60;
  }
  setA(
    `00j ${d !== 0 ? 1 : 2}m ${parseFloat((d !== 0 ? 60 - d : 0).toFixed(2))}d`
  );
  setB(
    `${c.derajat.toString().length === 1 ? "0" + c.derajat : c.derajat}:${
      c.menit.toString().length === 1 ? "0" + c.menit : c.menit
    }:00`
  );
};

export const ikhtiyatiResultImsakSubuh = (
  a: number, //mp
  b: number, //inter
  f: number, //t:15
  setA: (v: SetStateAction<string>) => void,
  setB: (v: SetStateAction<string>) => void,
  setC: (v: SetStateAction<string>) => void
) => {
  const c = a - f - b;
  const d = convertToDerajat(c);
  let e = d.menit + 2; //subuh

  setC(
    `00j ${d.detik !== 0 ? 1 : 2}m ${parseFloat(
      (d.detik !== 0 ? 60 - d.detik : 0).toFixed(2)
    )}d`
  );

  if (e > 59) {
    d.derajat += 1;
    e -= 60;
  }

  setA(
    `${d.derajat.toString().length === 1 ? "0" + d.derajat : d.derajat}:${
      e.toString().length === 1 ? "0" + e : e
    }:00`
  );

  let g = e - 10; //imsak

  if (g < 0) {
    d.derajat -= 1;
    g += e + 60;
  }

  setB(
    `${d.derajat.toString().length === 1 ? "0" + d.derajat : d.derajat}:${
      g.toString().length === 1 ? "0" + g : g
    }:00`
  );
};

export const ikhtiyatResult = (
  a: number,
  b: number,
  f: number,
  setA: (v: SetStateAction<number>) => void,
  setB: (v: SetStateAction<number>) => void,
  setC: (v: SetStateAction<string>) => void
) => {
  const c =
    -convertTan(a) * convertTan(b) +
    convertSin(f) / convertCos(a) / convertCos(b);
  setA(parseFloat(c.toFixed(9)));
  const d = convertFromCos(c);
  setB(parseFloat(d.toFixed(9)));
  const e = d / 15;
  const g = convertToDerajat(e);
  setC(`${g.derajat}j ${g.menit}m ${g.detik}d`);
  return e;
};
