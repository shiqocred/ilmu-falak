"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  cn,
  convertCos,
  convertCotan,
  convertFromCos,
  convertFromTan,
  convertSin,
  convertTan,
  convertToDecimal,
  convertToDerajat,
  convertToDetik,
  convertToMenit,
  getTrueValue,
} from "@/lib/utils";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import React, { useState } from "react";

const lintangArray = [
  { name: "LU", value: "lintang utara" },
  { name: "LS", value: "lintang selatan" },
];
const bujurArray = [
  { name: "BB", value: "bujur barat" },
  { name: "BT", value: "bujur timur" },
];
const hariCollection = [
  "Ahad",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];
const bulanCollection = [
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

const CardPerhitungan = ({
  label,
  lintangDaerah,
  deklinasiMatahari,
  zenit,
  nilaiCos,
  nilaiT,
  nilaiT15,
}: {
  label: string;
  lintangDaerah: string;
  deklinasiMatahari: string;
  zenit: string;
  nilaiCos: number;
  nilaiT: number;
  nilaiT15: string;
}) => {
  return (
    <div className="border rounded-md px-5 py-3 mt-3">
      <div className="flex items-end">
        <p>
          Cos t<span className="text-[8px] ml-1">{label}</span>
        </p>
      </div>
      <div className="border border-border rounded-md">
        <div className="flex">
          <p className="absolute flex left-8 sm:left-52">
            = - tan p &times; tan d + sin H Ashar{" "}
            <span className="hidden sm:flex">
              &divide; cos p &divide; cos d
            </span>
          </p>
        </div>
        <div className="flex sm:hidden mt-5">
          <p className="opacity-0">{label}</p>
          <p className="absolute left-11 sm:left-52">
            &divide; cos p &divide; cos d
          </p>
        </div>
        <div className="flex sm:mt-7 mt-1">
          <p className="opacity-0">{label}</p>
          <p className="absolute flex left-8 sm:left-52">
            = - tan {lintangDaerah} &times; tan {deklinasiMatahari}
            <span className="hidden sm:flex">+ sin {zenit}</span>
          </p>
        </div>
        <div className="flex sm:hidden sm:mt-0 mt-1">
          <p className="opacity-0">{label}</p>
          <p className="absolute flex left-11 sm:left-52">
            + sin {zenit} &divide; cos {lintangDaerah}
          </p>
        </div>
        <div className="flex sm:mt-0 mt-1">
          <p className="opacity-0">{label}</p>
          <p className="absolute flex left-11 sm:left-52">
            <span className="hidden sm:flex">
              &divide; cos {lintangDaerah}{" "}
            </span>
            &divide; cos {deklinasiMatahari}
          </p>
        </div>
        <div className="flex sm:mt-0 mt-1">
          <p className="opacity-0">{label}</p>
          <p className="absolute left-8 sm:left-52">= {nilaiCos}</p>
        </div>
      </div>
      <div className="block mt-3">
        <p>t</p>
        <div className="border border-border rounded-md h-8 py-1">
          <p className="absolute left-8 sm:left-52">= {nilaiT}</p>
        </div>
      </div>
      <div className="block mt-3">
        <p>t:15</p>
        <div className="border border-border rounded-md h-8 py-1">
          <p className="absolute left-8 sm:left-52">= {nilaiT15}</p>
        </div>
      </div>
    </div>
  );
};

const CardIkhtiyati = ({
  label,
  isDzuhur,
  hasilMP,
  hasilInter,
  nilaiIkhtiyat,
  nilaiIkhtiyati,
  hasilT,
  isMinus,
  isPlus,
}: {
  label: string;
  isDzuhur?: boolean;
  hasilMP: string;
  hasilInter: string;
  nilaiIkhtiyat: string;
  nilaiIkhtiyati: string;
  hasilT?: string;
  isMinus?: boolean;
  isPlus?: boolean;
}) => {
  return (
    <div className="border rounded-md px-5 py-3 mt-3">
      <p>{label}</p>
      <div className="border border-border rounded-md mt-1">
        <div className="flex">
          <p className="absolute left-8 sm:left-52">
            = MP {isDzuhur ? null : isMinus ? "- t:15" : "+ t:15"} - Inter{" "}
            {isPlus ? "+ Ikhtiyat" : "- Ikhtiyat"}
          </p>
        </div>
        <div className="flex mt-6">
          <p className="opacity-0">{label}</p>
          <p className="absolute flex left-8 sm:left-52">
            = {hasilMP}{" "}
            {isDzuhur ? null : isMinus ? "- " + hasilT : "+ " + hasilT} -{" "}
            {hasilInter}{" "}
            <span className="hidden sm:flex">
              {isPlus ? "+ " + nilaiIkhtiyat : "- " + nilaiIkhtiyat}
            </span>
          </p>
        </div>
        <div className="flex sm:hidden sm:mt-0 mt-1">
          <p className="opacity-0">{label}</p>
          <p className="absolute left-11 sm:left-52">
            {isPlus ? "+ " + nilaiIkhtiyat : "- " + nilaiIkhtiyat}
          </p>
        </div>
        <div className="flex sm:mt-0 mt-1">
          <p className="opacity-0">{label}</p>
          <p className="absolute left-8 sm:left-52">= {nilaiIkhtiyati}</p>
        </div>
      </div>
    </div>
  );
};

const KiblatBayanganPage = () => {
  const [lintang, setLintang] = useState<string>("lintang utara");
  const [bujur, setBujur] = useState<string>("bujur barat");
  const [tanggal, setTanggal] = useState<Date>();

  const [lintangDerajat, setLintangDerajat] = useState<string>("0");
  const [lintangMenit, setLintangMenit] = useState<string>("0");
  const [lintangDetik, setLintangDetik] = useState<string>("0");

  const [bujurDerajat, setBujurDerajat] = useState<string>("0");
  const [bujurMenit, setBujurMenit] = useState<string>("0");
  const [bujurDetik, setBujurDetik] = useState<string>("0");

  const [dekDerajat, setDekDerajat] = useState<string>("0");
  const [dekMenit, setDekMenit] = useState<string>("0");
  const [dekDetik, setDekDetik] = useState<string>("0");

  const [eqtDerajat, setEqtDerajat] = useState<string>("0");
  const [eqtMenit, setEqtMenit] = useState<string>("0");
  const [eqtDetik, setEqtDetik] = useState<string>("0");

  const [isEqtMinus, setIsEqtMinus] = useState(false);
  const [isDekMinus, setIsDekMinus] = useState(false);

  const [isJawaban, setIsJawaban] = useState<boolean>(false);

  const derajatKosong = `00° 00' 00"`;
  const jamKosong = `00j 00m 00d`;
  const clockKosong = `00:00:00`;

  const [hasilInter1, setHasilInter1] = useState<string>(derajatKosong);
  const [hasilInter, setHasilInter] = useState<string>(derajatKosong);
  const [bwdDerajat, setBwdDerajat] = useState<string>("0");
  const [hasilMP, setHasilMP] = useState<string>("0");
  const [minusCotan, setMinusCotan] = useState<string>("0");
  const [cotanHashar, setCotanHashar] = useState<number>(0);
  const [plusCotanH, setPlusCotanH] = useState<number>(0);
  const [tanH, setTanH] = useState<number>(0);
  const [hAshar, setHAshar] = useState<number>(0);
  const [derHAshar, setDerHAshar] = useState<string>("0");

  const [cosTAshar, setCosTAshar] = useState<number>(0);
  const [tAshar, setTAshar] = useState<number>(0);
  const [tAshar15, setTAshar15] = useState<string>(jamKosong);

  const [cosTMaghribTerbit, setCosTMaghribTerbit] = useState<number>(0);
  const [tMaghribTerbit, setTMaghribTerbit] = useState<number>(0);
  const [tMaghribTerbit15, setTMaghribTerbit15] = useState<string>(jamKosong);

  const [cosTIsya, setCosTIsya] = useState<number>(0);
  const [tIsya, setTIsya] = useState<number>(0);
  const [tIsya15, setTIsya15] = useState<string>(jamKosong);

  const [cosTSubuh, setCosTSubuh] = useState<number>(0);
  const [tSubuh, setTSubuh] = useState<number>(0);
  const [tSubuh15, setTSubuh15] = useState<string>(jamKosong);

  const [cosTImsya, setCosTImsya] = useState<number>(0);
  const [tImsya, setTImsya] = useState<number>(0);
  const [tImsya15, setTImsya15] = useState<string>(jamKosong);

  const [cosTDhuha, setCosTDhuha] = useState<number>(0);
  const [tDhuha, setTDhuha] = useState<number>(0);
  const [tDhuha15, setTDhuha15] = useState<string>(jamKosong);

  const [ikhtiyatDzuhur, setIkhtiyatDzuhur] = useState<string>("0");
  const [ikhtiyatiDzuhur, setIkhtiyatiDzuhur] = useState<string>("0");
  const [ikhtiyatAshar, setIkhtiyatAshar] = useState<string>("0");
  const [ikhtiyatiAshar, setIkhtiyatiAshar] = useState<string>("0");
  const [ikhtiyatMaghrib, setIkhtiyatMaghrib] = useState<string>("0");
  const [ikhtiyatiMaghrib, setIkhtiyatiMaghrib] = useState<string>("0");
  const [ikhtiyatIsya, setIkhtiyatIsya] = useState<string>("0");
  const [ikhtiyatiIsya, setIkhtiyatiIsya] = useState<string>("0");
  const [ikhtiyatSubuh, setIkhtiyatSubuh] = useState<string>("0");
  const [ikhtiyatiSubuh, setIkhtiyatiSubuh] = useState<string>("0");
  const [ikhtiyatImsya, setIkhtiyatImsya] = useState<string>("0");
  const [ikhtiyatiImsya, setIkhtiyatiImsya] = useState<string>("0");
  const [ikhtiyatTerbit, setIkhtiyatTerbit] = useState<string>("0");
  const [ikhtiyatiTerbit, setIkhtiyatiTerbit] = useState<string>("0");
  const [ikhtiyatDhuha, setIkhtiyatDhuha] = useState<string>("0");
  const [ikhtiyatiDhuha, setIkhtiyatiDhuha] = useState<string>("0");

  const lintangDaerah =
    lintang === "lintang selatan"
      ? `-${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`
      : `${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`;
  const bujurDaerah =
    bujur === "bujur barat"
      ? `-${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`
      : `${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`;
  const deklinasiMatahari = isDekMinus
    ? `-${dekDerajat}° ${dekMenit}' ${dekDetik}"`
    : `${dekDerajat}° ${dekMenit}' ${dekDetik}"`;
  const equationOfTime = isEqtMinus
    ? `-${eqtDerajat}j ${eqtMenit}m ${eqtDetik}d`
    : `${eqtDerajat}j ${eqtMenit}m ${eqtDetik}d`;
  const bujurWaktuDaerah = `${bwdDerajat}°`;
  const getTanggal = (date: any) => {
    if (date) {
      const hari = hariCollection[date.getDay()];
      const tanggal = date.getDate();
      const bulan = bulanCollection[date.getMonth()];
      const tahun = date.getFullYear();
      return hari + ", " + tanggal + " " + bulan + " " + tahun;
    } else {
      const hari = hariCollection[new Date().getDay()];
      const tanggal = new Date().getDate();
      const bulan = bulanCollection[new Date().getMonth()];
      const tahun = new Date().getFullYear();
      return hari + ", " + tanggal + " " + bulan + " " + tahun;
    }
  };
  const triggerTanggal = getTanggal(tanggal);

  const handelPartialDerajat = (inputValue: string, p: string) => {
    if (p === "lintang") {
      setLintangDerajat(inputValue);
    } else if (p === "bujur") {
      setBujurDerajat(inputValue);
    } else if (p === "dek") {
      setDekDerajat(inputValue);
    } else if (p === "eqt") {
      setEqtDerajat(inputValue);
    } else if (p === "bwd") {
      setBwdDerajat(inputValue);
    }
  };
  const handelPartialMenit = (inputValue: string, p: string) => {
    if (p === "lintang") {
      setLintangMenit(inputValue);
    } else if (p === "bujur") {
      setBujurMenit(inputValue);
    } else if (p === "dek") {
      setDekMenit(inputValue);
    } else if (p === "eqt") {
      setEqtMenit(inputValue);
    }
  };
  const handelPartialDetik = (inputValue: string, p: string) => {
    if (p === "lintang") {
      setLintangDetik(inputValue);
    } else if (p === "bujur") {
      setBujurDetik(inputValue);
    } else if (p === "dek") {
      setDekDetik(inputValue);
    } else if (p === "eqt") {
      setEqtDetik(inputValue);
    }
  };

  const handlePartial = (
    inputValue: string,
    p: string,
    pos: "derajat" | "menit" | "detik"
  ) => {
    if (pos === "derajat") {
      handelPartialDerajat(inputValue, p);
    } else if (pos === "menit") {
      handelPartialMenit(inputValue, p);
    } else if (pos === "detik") {
      handelPartialDetik(inputValue, p);
    }
  };
  const handleDerajat = (inputValue: string, maxLength: number, p: string) => {
    if (inputValue.length > maxLength) {
      const truncatedValueDerajat = inputValue.slice(0, maxLength);

      if (parseFloat(truncatedValueDerajat) > 360) {
        handlePartial("360", p, "derajat");
      } else {
        handlePartial(truncatedValueDerajat, p, "derajat");
      }
    }
    if (parseFloat(inputValue) > 360) {
      handlePartial("360", p, "derajat");
    } else {
      handlePartial(inputValue, p, "derajat");
    }
  };
  const handleMenit = (inputValue: string, maxLength: number, p: string) => {
    if (inputValue.length > maxLength) {
      const truncatedValue = inputValue.slice(0, maxLength);

      if (parseFloat(truncatedValue) > 60) {
        handlePartial("60", p, "menit");
      } else {
        handlePartial(truncatedValue, p, "menit");
      }
    }
    if (parseFloat(inputValue) > 60) {
      handlePartial("60", p, "menit");
    } else {
      handlePartial(inputValue, p, "menit");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxLength: number,
    pos: "derajat" | "menit" | "detik",
    p: "lintang" | "bujur" | "kiblat" | "dek" | "eqt" | "bwd"
  ) => {
    let inputValue = e.target.value;

    if (pos === "derajat") {
      handleDerajat(inputValue, maxLength, p);
    } else if (pos === "menit") {
      handleMenit(inputValue, maxLength, p);
    } else if (pos === "detik") {
      if (inputValue.length > maxLength) {
        inputValue = inputValue.slice(0, maxLength);
      }

      const parts = inputValue.split(".");
      if (parts[0].length > 2) {
        parts[0] = parts[0].slice(0, 2);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
      }
      inputValue = parts.join(".");

      if (parseFloat(inputValue) > 60) {
        handlePartial("60", p, "detik");
      } else {
        handlePartial(inputValue, p, "detik");
      }
    }
  };

  const resetValue = () => {
    setIsJawaban(false);
    setBujurDerajat("0");
    setBujurMenit("0");
    setBujurDetik("0");
    setLintangDerajat("0");
    setLintangMenit("0");
    setLintangDetik("0");
    setDekDerajat("0");
    setDekMenit("0");
    setDekDetik("0");
    setEqtDerajat("0");
    setEqtMenit("0");
    setEqtDetik("0");
    setBwdDerajat("0");
    setIsEqtMinus(false);
    setIsDekMinus(false);
  };

  const calculate = () => {
    setIsJawaban(true);
    let desEQT = convertToDecimal(
      parseFloat(eqtDerajat),
      parseFloat(eqtMenit),
      parseFloat(eqtDetik)
    );
    let desMP = 12 - (isEqtMinus ? -parseFloat(desEQT) : parseFloat(desEQT));

    setHasilMP(
      `${convertToDerajat(desMP)}j ${convertToMenit(desMP)}m ${parseFloat(
        convertToDetik(desMP).toFixed(2)
      )}d`
    );
    let desBujurDaerah = convertToDecimal(
      parseFloat(bujurDerajat),
      parseFloat(bujurMenit),
      parseFloat(bujurDetik)
    );
    let inter1 =
      (bujur === "bujur barat"
        ? -parseFloat(desBujurDaerah)
        : parseFloat(desBujurDaerah)) - 105;
    setHasilInter1(
      `${convertToDerajat(inter1)}° ${convertToMenit(inter1)}' ${parseFloat(
        convertToDetik(inter1).toFixed(2)
      )}"`
    );

    const desHasilInter = inter1 / 15;
    const resultInter = `${convertToDerajat(desHasilInter)}j ${convertToMenit(
      desHasilInter
    )}m ${parseFloat(convertToDetik(desHasilInter).toFixed(2))}d`;
    setHasilInter(resultInter);

    const desLintang = parseFloat(
      convertToDecimal(
        parseFloat(lintangDerajat),
        parseFloat(lintangMenit),
        parseFloat(lintangDetik)
      )
    );
    const desDek = parseFloat(
      convertToDecimal(
        parseFloat(dekDerajat),
        parseFloat(dekMenit),
        parseFloat(dekDetik)
      )
    );
    const hasilMinusCotan =
      (lintang === "lintang selatan" ? -desLintang : desLintang) -
      (isDekMinus ? -desDek : desDek);
    setMinusCotan(
      `${convertToDerajat(hasilMinusCotan)}° ${convertToMenit(
        hasilMinusCotan
      )}' ${parseFloat(convertToDetik(hasilMinusCotan).toFixed(2))}"`
    );
    const hasilCotanH = convertTan(hasilMinusCotan);
    setCotanHashar(parseFloat(hasilCotanH.toFixed(9)));
    const hasilPlusCotanH = hasilCotanH + 1;
    setPlusCotanH(parseFloat(hasilPlusCotanH.toFixed(9)));
    const hasilTanH = getTrueValue(hasilPlusCotanH);
    setTanH(parseFloat(hasilTanH.toFixed(9)));
    const hasilhAshar = convertFromTan(hasilTanH);
    setHAshar(parseFloat(hasilhAshar.toFixed(9)));
    const hasilDerHAshar = `${convertToDerajat(hasilhAshar)}° ${convertToMenit(
      hasilhAshar
    )}' ${parseFloat(convertToDetik(hasilhAshar).toFixed(2))}"`;
    setDerHAshar(hasilDerHAshar);

    const hasilCosTAshar =
      -convertTan(desLintang) * convertTan(desDek) +
      convertSin(hasilhAshar) / convertCos(desLintang) / convertCos(desDek);
    setCosTAshar(parseFloat(hasilCosTAshar.toFixed(9)));
    const hasilTAshar = convertFromCos(hasilCosTAshar);
    setTAshar(parseFloat(hasilTAshar.toFixed(9)));
    const hasilTAshar15 = hasilTAshar / 15;
    setTAshar15(
      `${convertToDerajat(hasilTAshar15)}j ${convertToMenit(
        hasilTAshar15
      )}m ${parseFloat(convertToDetik(hasilTAshar15).toFixed(2))}d`
    );

    const hasilCosTMaghribTerbit =
      -convertTan(desLintang) * convertTan(desDek) +
      convertSin(-1) / convertCos(desLintang) / convertCos(desDek);
    setCosTMaghribTerbit(parseFloat(hasilCosTMaghribTerbit.toFixed(9)));
    const hasilTMaghribTerbit = convertFromCos(hasilCosTMaghribTerbit);
    setTMaghribTerbit(parseFloat(hasilTMaghribTerbit.toFixed(9)));
    const hasilTMaghribTerbit15 = hasilTMaghribTerbit / 15;
    setTMaghribTerbit15(
      `${convertToDerajat(hasilTMaghribTerbit15)}j ${convertToMenit(
        hasilTMaghribTerbit15
      )}m ${parseFloat(convertToDetik(hasilTMaghribTerbit15).toFixed(2))}d`
    );

    const hasilCosTIsya =
      -convertTan(desLintang) * convertTan(desDek) +
      convertSin(-18) / convertCos(desLintang) / convertCos(desDek);
    setCosTIsya(parseFloat(hasilCosTIsya.toFixed(9)));
    const hasilTIsya = convertFromCos(hasilCosTIsya);
    setTIsya(parseFloat(hasilTIsya.toFixed(9)));
    const hasilTIsya15 = hasilTIsya / 15;
    setTIsya15(
      `${convertToDerajat(hasilTIsya15)}j ${convertToMenit(
        hasilTIsya15
      )}m ${parseFloat(convertToDetik(hasilTIsya15).toFixed(2))}d`
    );

    const hasilCosTSubuh =
      -convertTan(desLintang) * convertTan(desDek) +
      convertSin(-20) / convertCos(desLintang) / convertCos(desDek);
    setCosTSubuh(parseFloat(hasilCosTSubuh.toFixed(9)));
    const hasilTSubuh = convertFromCos(hasilCosTSubuh);
    setTSubuh(parseFloat(hasilTSubuh.toFixed(9)));
    const hasilTSubuh15 = hasilTSubuh / 15;
    setTSubuh15(
      `${convertToDerajat(hasilTSubuh15)}j ${convertToMenit(
        hasilTSubuh15
      )}m ${parseFloat(convertToDetik(hasilTSubuh15).toFixed(2))}d`
    );

    const hasilCosTImsya =
      -convertTan(desLintang) * convertTan(desDek) +
      convertSin(-22) / convertCos(desLintang) / convertCos(desDek);
    setCosTImsya(parseFloat(hasilCosTImsya.toFixed(9)));
    const hasilTImsya = convertFromCos(hasilCosTImsya);
    setTImsya(parseFloat(hasilTImsya.toFixed(9)));
    const hasilTImsya15 = hasilTImsya / 15;
    setTImsya15(
      `${convertToDerajat(hasilTImsya15)}j ${convertToMenit(
        hasilTImsya15
      )}m ${parseFloat(convertToDetik(hasilTImsya15).toFixed(2))}d`
    );

    const hasilCosTDhuha =
      -convertTan(desLintang) * convertTan(desDek) +
      convertSin(parseFloat(convertToDecimal(3, 30, 0))) /
        convertCos(desLintang) /
        convertCos(desDek);
    setCosTDhuha(parseFloat(hasilCosTDhuha.toFixed(9)));
    const hasilTDhuha = convertFromCos(hasilCosTDhuha);
    setTDhuha(parseFloat(hasilTDhuha.toFixed(9)));
    const hasilTDhuha15 = hasilTDhuha / 15;
    setTDhuha15(
      `${convertToDerajat(hasilTDhuha15)}j ${convertToMenit(
        hasilTDhuha15
      )}m ${parseFloat(convertToDetik(hasilTDhuha15).toFixed(2))}d`
    );

    const mpInterDzuhur = desMP - desHasilInter;
    const detMpInterDzuhur = convertToDetik(mpInterDzuhur);
    const ikhtiyatiDetikDzuhur =
      detMpInterDzuhur !== 0 ? 60 - detMpInterDzuhur : 0;
    const ikhtiyatiMenitDzuhur = detMpInterDzuhur !== 0 ? 1 : 2;
    const varIkhtiyatDzuhur = `00j ${ikhtiyatiMenitDzuhur}m ${parseFloat(
      ikhtiyatiDetikDzuhur.toFixed(2)
    )}d`;
    setIkhtiyatDzuhur(varIkhtiyatDzuhur);
    setIkhtiyatiDzuhur(
      `${convertToDerajat(mpInterDzuhur)}j ${
        convertToMenit(mpInterDzuhur) + 2
      }m 00d`
    );

    const mpInterAshar = desMP + hasilTAshar15 - desHasilInter;
    const detMpInterAshar = convertToDetik(mpInterAshar);
    const ikhtiyatiDetikAshar =
      detMpInterAshar !== 0 ? 60 - detMpInterAshar : 0;
    const ikhtiyatiMenitAshar = detMpInterAshar !== 0 ? 1 : 2;
    const varIkhtiyatAshar = `00j ${ikhtiyatiMenitAshar}m ${parseFloat(
      ikhtiyatiDetikAshar.toFixed(2)
    )}d`;
    setIkhtiyatAshar(varIkhtiyatAshar);
    setIkhtiyatiAshar(
      `${convertToDerajat(mpInterAshar)}j ${
        convertToMenit(mpInterAshar) + 2
      }m 00d`
    );

    const mpInterMaghrib = desMP + hasilTMaghribTerbit15 - desHasilInter;
    const detMpInterMaghrib = convertToDetik(mpInterMaghrib);
    const ikhtiyatiDetikMaghrib =
      detMpInterMaghrib !== 0 ? 60 - detMpInterMaghrib : 0;
    const ikhtiyatiMenitMaghrib = detMpInterMaghrib !== 0 ? 1 : 2;
    const varIkhtiyatMaghrib = `00j ${ikhtiyatiMenitMaghrib}m ${parseFloat(
      ikhtiyatiDetikMaghrib.toFixed(2)
    )}d`;
    setIkhtiyatMaghrib(varIkhtiyatMaghrib);
    setIkhtiyatiMaghrib(
      `${convertToDerajat(mpInterMaghrib)}j ${
        convertToMenit(mpInterMaghrib) + 2
      }m 00d`
    );

    const mpInterIsya = desMP + hasilTIsya15 - desHasilInter;
    const detMpInterIsya = convertToDetik(mpInterIsya);
    const ikhtiyatiDetikIsya = detMpInterIsya !== 0 ? 60 - detMpInterIsya : 0;
    const ikhtiyatiMenitIsya = detMpInterIsya !== 0 ? 1 : 2;
    const varIkhtiyatIsya = `00j ${ikhtiyatiMenitIsya}m ${parseFloat(
      ikhtiyatiDetikIsya.toFixed(2)
    )}d`;
    setIkhtiyatIsya(varIkhtiyatIsya);
    setIkhtiyatiIsya(
      `${convertToDerajat(mpInterIsya)}j ${
        convertToMenit(mpInterIsya) + 2
      }m 00d`
    );

    const mpInterSubuh = desMP - hasilTSubuh15 - desHasilInter;
    const detMpInterSubuh = convertToDetik(mpInterSubuh);
    const ikhtiyatiDetikSubuh =
      detMpInterSubuh !== 0 ? 60 - detMpInterSubuh : 0;
    const ikhtiyatiMenitSubuh = detMpInterSubuh !== 0 ? 1 : 2;
    const varIkhtiyatSubuh = `00j ${ikhtiyatiMenitSubuh}m ${parseFloat(
      ikhtiyatiDetikSubuh.toFixed(2)
    )}d`;
    setIkhtiyatSubuh(varIkhtiyatSubuh);
    setIkhtiyatiSubuh(
      `${convertToDerajat(mpInterSubuh)}j ${
        convertToMenit(mpInterSubuh) + 2
      }m 00d`
    );

    const mpInterImsya = desMP - hasilTImsya15 - desHasilInter;
    const detMpInterImsya = convertToDetik(mpInterImsya);
    const ikhtiyatiDetikImsya =
      detMpInterImsya !== 0 ? 60 - detMpInterImsya : 0;
    const ikhtiyatiMenitImsya = detMpInterImsya !== 0 ? 1 : 2;
    const varIkhtiyatImsya = `00j ${ikhtiyatiMenitImsya}m ${parseFloat(
      ikhtiyatiDetikImsya.toFixed(2)
    )}d`;
    setIkhtiyatImsya(varIkhtiyatImsya);
    setIkhtiyatiImsya(
      `${convertToDerajat(mpInterImsya)}j ${
        convertToMenit(mpInterImsya) - 1
      }m 00d`
    );

    const mpInterTerbit = desMP - hasilTMaghribTerbit15 - desHasilInter;
    const detMpInterTerbit = convertToDetik(mpInterTerbit);
    const ikhtiyatiDetikTerbit =
      detMpInterTerbit !== 0 ? 60 - detMpInterTerbit : 0;
    const ikhtiyatiMenitTerbit = detMpInterTerbit !== 0 ? 1 : 2;
    const varIkhtiyatTerbit = `00j ${ikhtiyatiMenitTerbit}m ${parseFloat(
      ikhtiyatiDetikTerbit.toFixed(2)
    )}d`;
    setIkhtiyatTerbit(varIkhtiyatTerbit);
    setIkhtiyatiTerbit(
      `${convertToDerajat(mpInterTerbit)}j ${
        convertToMenit(mpInterTerbit) - 1
      }m 00d`
    );
    // ----------------------------------------------------------------
    // .
    // Rumus Ikhtiyati Dhuha
    // .
    // ----------------------------------------------------------------
    const mpInterDhuha = desMP - hasilTDhuha15 - desHasilInter;
    const detMpInterDhuha = convertToDetik(mpInterDhuha);
    const ikhtiyatiDetikDhuha =
      detMpInterDhuha !== 0 ? 60 - detMpInterDhuha : 0;
    const ikhtiyatiMenitDhuha = detMpInterDhuha !== 0 ? 1 : 2;
    const varIkhtiyatDhuha = `00j ${ikhtiyatiMenitDhuha}m ${parseFloat(
      ikhtiyatiDetikDhuha.toFixed(2)
    )}d`;
    setIkhtiyatDhuha(varIkhtiyatDhuha);
    setIkhtiyatiDhuha(
      `${convertToDerajat(mpInterDhuha)}j ${
        convertToMenit(mpInterDhuha) + 2
      }m 00d`
    );
  };

  return (
    <div className="w-full h-full pb-20 pt-10 sm:py-32 flex flex-col justify-center items-center">
      <h1 className="font-semibold text-xl">Arah Kiblat Bayangan</h1>
      <div className="flex flex-col gap-y-8 w-full lg:w-[800px] items-center mt-4 border border-border p-8 overflow-hidden rounded-md">
        <div className="flex flex-col">
          <Label className="mb-2">Koordinat Daerah/Tempat</Label>
          <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-8">
            <div className="flex gap-x-2 items-center">
              <div className="w-14 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={lintangDerajat}
                  onChange={(e) => handleChange(e, 3, "derajat", "lintang")}
                  type="number"
                />
                °
              </div>
              <div className="w-12 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={lintangMenit}
                  onChange={(e) => handleChange(e, 2, "menit", "lintang")}
                  type="number"
                />
                &apos;
              </div>
              <div className="w-20 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={lintangDetik}
                  onChange={(e) => handleChange(e, 5, "detik", "lintang")}
                  type="number"
                />
                &quot;
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="px-3 w-20 flex justify-between">
                    {lintangArray.find((item) => item.value === lintang)?.name}
                    <ChevronDown className="ml-2 h-4 w-4 -mr-1 animate-accordion-up" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0  w-20" align="start">
                  <Command>
                    <CommandGroup>
                      {lintangArray.map((item) => (
                        <CommandItem
                          key={item.value}
                          className="h-10"
                          onSelect={() => setLintang(item.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item.value === lintang
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="w-14 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={bujurDerajat}
                  onChange={(e) => handleChange(e, 3, "derajat", "bujur")}
                  type="number"
                />
                °
              </div>
              <div className="w-12 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={bujurMenit}
                  onChange={(e) => handleChange(e, 2, "menit", "bujur")}
                  type="number"
                />
                &apos;
              </div>
              <div className="w-20 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={bujurDetik}
                  onChange={(e) => handleChange(e, 5, "detik", "bujur")}
                  type="number"
                />
                &quot;
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="px-3 w-20 flex justify-between">
                    {bujurArray.find((item) => item.value === bujur)?.name}
                    <ChevronDown className="ml-2 h-4 w-4 -mr-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0  w-20" align="start">
                  <Command>
                    <CommandGroup>
                      {bujurArray.map((item) => (
                        <CommandItem
                          key={item.value}
                          className="h-10"
                          onSelect={() => setBujur(item.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item.value === bujur ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-8">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col">
              <Label className="mb-2">Deklinasi Matahari</Label>
              <div className="flex gap-x-8">
                <div className="flex gap-x-2 items-center">
                  <div className="w-10 h-10 flex justify-center items-center border rounded-md box-content">
                    {isDekMinus ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                  <div className="w-14 flex border rounded-md box-content pr-1">
                    <Input
                      className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                      value={dekDerajat}
                      onChange={(e) => handleChange(e, 3, "derajat", "dek")}
                      type="number"
                    />
                    °
                  </div>
                  <div className="w-12 flex border rounded-md box-content pr-1">
                    <Input
                      className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                      value={dekMenit}
                      onChange={(e) => handleChange(e, 2, "menit", "dek")}
                      type="number"
                    />
                    &apos;
                  </div>
                  <div className="w-20 flex border rounded-md box-content pr-1">
                    <Input
                      className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                      value={dekDetik}
                      onChange={(e) => handleChange(e, 5, "detik", "dek")}
                      type="number"
                    />
                    &quot;
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <Switch
                id="minusEqt"
                checked={isDekMinus}
                onCheckedChange={setIsDekMinus}
              />
              <Label className="text-xs font-light " htmlFor="minusEqt">
                Check for minus value
              </Label>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col">
              <Label className="mb-2">Equation of Time</Label>
              <div className="flex gap-x-8">
                <div className="flex gap-x-2 items-center">
                  <div className="w-10 h-10 flex justify-center items-center border rounded-md box-content">
                    {isEqtMinus ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                  <div className="w-14 flex border rounded-md box-content pr-1">
                    <Input
                      className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                      value={eqtDerajat}
                      onChange={(e) => handleChange(e, 3, "derajat", "eqt")}
                      type="number"
                    />
                    <p className="text-xs">j</p>
                  </div>
                  <div className="w-14 flex border rounded-md box-content pr-1">
                    <Input
                      className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                      value={eqtMenit}
                      onChange={(e) => handleChange(e, 2, "menit", "eqt")}
                      type="number"
                    />
                    <p className="text-xs">m</p>
                  </div>
                  <div className="w-20 flex border rounded-md box-content pr-1">
                    <Input
                      className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                      value={eqtDetik}
                      onChange={(e) => handleChange(e, 5, "detik", "eqt")}
                      type="number"
                    />
                    <p className="text-xs">d</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <Switch
                id="minusEqt"
                checked={isEqtMinus}
                onCheckedChange={setIsEqtMinus}
              />
              <Label className="text-xs font-light " htmlFor="minusEqt">
                Check for minus value
              </Label>
            </div>
          </div>
        </div>
        <div className="flex w-full sm:w-4/5 flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-8">
          <div className="flex w-full flex-col">
            <Label className="mb-2">Bujur Waktu Daerah</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full pl-3 text-left font-normal")}
                >
                  {triggerTanggal}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tanggal}
                  onSelect={setTanggal}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Bujur Waktu Daerah</Label>
            <div className="flex gap-x-8">
              <div className="flex gap-x-2 items-center">
                <div className="w-44 flex border rounded-md box-content pr-1">
                  <Input
                    className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={bwdDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "bwd")}
                    type="number"
                  />
                  °
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row items-center justify-center">
          <Button
            className="lg:w-[600px] w-full sm:mr-[10px]"
            onClick={calculate}
          >
            Calculate
          </Button>
          <Button size={"icon"} onClick={resetValue} className="w-full sm:w-10">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {isJawaban && (
        <div className="lg:w-[800px] w-full h-full mt-12 border border-border p-4 rounded-md">
          <div className="w-full flex flex-col relative">
            <p>Diketahui:</p>
            <div className="sm:flex block mt-5">
              <p>- Daerah</p>
              <div className="flex flex-col absolute sm:left-28 left-3">
                <p>= Lintang</p>
                <p>= Bujur</p>
              </div>
              <div className="flex flex-col absolute left-24 sm:left-52">
                <p>
                  = {lintangDaerah}{" "}
                  {lintangArray.find((item) => item.value === lintang)?.name}
                </p>
                <p>
                  = {bujurDaerah}{" "}
                  {bujurArray.find((item) => item.value === bujur)?.name}
                </p>
              </div>
            </div>
            <div className="block sm:flex mt-16 sm:mt-12">
              <p>- Deklinasi Matahari</p>
              <p className="absolute left-3 sm:left-52">
                = {deklinasiMatahari}
              </p>
            </div>
            <div className="block sm:flex mt-8 sm:mt-5">
              <p>- Equation of Time</p>
              <p className="absolute left-3  sm:left-52">= {equationOfTime}</p>
            </div>
            <div className="block sm:flex mt-8 sm:mt-5">
              <p>- Bujur Waktu Daerah</p>
              <p className="absolute left-3 sm:left-52">= {bujurWaktuDaerah}</p>
            </div>
            <div className="block sm:flex mt-8 sm:mt-5">
              <p>- MP</p>
              <p className="absolute left-3 sm:left-52">
                = 12j - Equation of Time
              </p>
            </div>
            <div className="flex mt-7 sm:mt-0">
              <p className="opacity-0">MP</p>
              <p className="absolute left-3 sm:left-52">
                = 12j - {equationOfTime}
              </p>
            </div>
            <div className="flex mt-1 sm:mt-0">
              <p className="opacity-0">MP</p>
              <p className="absolute left-3 sm:left-52">= {hasilMP}</p>
            </div>
            <div className="block sm:flex mt-3">
              <p>- Inter</p>
              <p className="absolute left-3 sm:left-52">
                = &#40;Bujur Tempat/Daerah{" "}
                <span className="hidden sm:flex">
                  &divide; Bujur Waktu Daerah&#41; &divide; 15
                </span>
              </p>
            </div>
            <div className="flex sm:hidden mt-7 sm:mt-0">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-3 sm:left-52">
                &divide; Bujur Waktu Daerah&#41; &divide; 15
              </p>
            </div>
            <div className="flex mt-1 sm:mt-7">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-3 sm:left-52">
                = &#40;{bujurDaerah} - {bujurWaktuDaerah}&#41; &divide; 15
              </p>
            </div>
            <div className="flex mt-1 sm:mt-0">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-3 sm:left-52">
                = &#40;{hasilInter1}&#41; &divide; 15
              </p>
            </div>
            <div className="flex mt-1 sm:mt-0">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-3 sm:left-52">= {hasilInter}</p>
            </div>
            <Separator className="mt-10 mb-5" />
            <p>Unsur:</p>
            <p className="mt-3">cotanHAshar</p>
            <div className="border border-border px-2 py-1 rounded-md">
              <div className="block sm:flex mt-1 sm:mt-0">
                <p className="absolute left-3 sm:left-52">
                  = &#40;tan [lintang daerah &minus; deklinasi]&#41; + 1
                </p>
              </div>
              <div className="flex mt-7">
                <p className="opacity-0">cotanHAshar</p>
                <p className="absolute left-3 sm:left-52">
                  = &#40;tan [{lintangDaerah} &minus; {deklinasiMatahari}]&#41;
                  + 1
                </p>
              </div>
              <div className="flex mt-1 sm:mt-0">
                <p className="opacity-0">cotanHAshar</p>
                <p className="absolute left-3 sm:left-52">
                  = &#40;tan {minusCotan}&#41; + 1
                </p>
              </div>
              <div className="flex mt-1 sm:mt-0">
                <p className="opacity-0">cotanHAshar</p>
                <p className="absolute left-3 sm:left-52">
                  = {cotanHashar} + 1
                </p>
              </div>
              <div className="flex mt-1 sm:mt-0">
                <p className="opacity-0">cotanHAshar</p>
                <p className="absolute left-3 sm:left-52">= {plusCotanH}</p>
              </div>
            </div>
            <div className="block mt-3">
              <p>tan Hashar</p>
              <div className="border border-border h-8 py-1 rounded-md">
                <p className="absolute left-3 sm:left-52">= {tanH}</p>
              </div>
            </div>
            <div className="block mt-3">
              <p>Hashar</p>
              <div className="border border-border h-8 py-1 rounded-md">
                <p className="absolute left-3 sm:left-52">
                  = {hAshar} atau {derHAshar}
                </p>
              </div>
            </div>
            <Separator className="my-5" />
            <p>Perhitungan:</p>
            <CardPerhitungan
              label="Ashar"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit={derHAshar}
              nilaiCos={cosTAshar}
              nilaiT={tAshar}
              nilaiT15={tAshar15}
            />
            <CardPerhitungan
              label="Maghrib"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit="-1°"
              nilaiCos={cosTMaghribTerbit}
              nilaiT={tMaghribTerbit}
              nilaiT15={tMaghribTerbit15}
            />
            <CardPerhitungan
              label="Isya"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit="-18°"
              nilaiCos={cosTIsya}
              nilaiT={tIsya}
              nilaiT15={tIsya15}
            />
            <CardPerhitungan
              label="Subuh"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit="-20°"
              nilaiCos={cosTSubuh}
              nilaiT={tSubuh}
              nilaiT15={tSubuh15}
            />
            <CardPerhitungan
              label="Imsya"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit="-22°"
              nilaiCos={cosTImsya}
              nilaiT={tImsya}
              nilaiT15={tImsya15}
            />
            <CardPerhitungan
              label="Terbit"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit="-1°"
              nilaiCos={cosTMaghribTerbit}
              nilaiT={tMaghribTerbit}
              nilaiT15={tMaghribTerbit15}
            />
            <CardPerhitungan
              label="Dhuha"
              lintangDaerah={lintangDaerah}
              deklinasiMatahari={deklinasiMatahari}
              zenit="-1°"
              nilaiCos={cosTDhuha}
              nilaiT={tDhuha}
              nilaiT15={tDhuha15}
            />
            <CardIkhtiyati
              label="Dzuhur"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatDzuhur}
              nilaiIkhtiyati={ikhtiyatiDzuhur}
              isDzuhur
              isPlus
            />
            <CardIkhtiyati
              label="Ashar"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatAshar}
              nilaiIkhtiyati={ikhtiyatiAshar}
              hasilT={tAshar15}
              isPlus
            />
            <CardIkhtiyati
              label="Maghrib"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatMaghrib}
              nilaiIkhtiyati={ikhtiyatiMaghrib}
              hasilT={tMaghribTerbit15}
              isPlus
            />
            <CardIkhtiyati
              label="Isya"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatIsya}
              nilaiIkhtiyati={ikhtiyatiIsya}
              hasilT={tIsya15}
              isPlus
            />
            <CardIkhtiyati
              label="Subuh"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatSubuh}
              nilaiIkhtiyati={ikhtiyatiSubuh}
              hasilT={tSubuh15}
              isMinus
              isPlus
            />
            <CardIkhtiyati
              label="Imsya"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatImsya}
              nilaiIkhtiyati={ikhtiyatiImsya}
              hasilT={tImsya15}
              isMinus
            />
            <CardIkhtiyati
              label="Terbit"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatTerbit}
              nilaiIkhtiyati={ikhtiyatiTerbit}
              hasilT={tMaghribTerbit15}
            />
            <CardIkhtiyati
              label="Dhuha"
              hasilMP={hasilMP}
              hasilInter={hasilInter}
              nilaiIkhtiyat={ikhtiyatDhuha}
              nilaiIkhtiyati={ikhtiyatiDhuha}
              hasilT={tDhuha15}
              isPlus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KiblatBayanganPage;
