"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  bujurArray,
  bulanArray,
  bulanCollection,
  cn,
  convertFromTan,
  convertTan,
  convertToDecimal,
  convertToDerajat,
  getTrueValue,
  ikhtiyatResult,
  ikhtiyatiResult,
  ikhtiyatiResultImsakSubuh,
  lintangArray,
  tanggalArray,
  totalTanggal,
} from "@/lib/utils";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronRight,
  Expand,
  MapPinned,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import React, { useState } from "react";
import deklinasiArray from "@/lib/deklinasi.json";
import equationArray from "@/lib/equation.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { daerahArray } from "@/lib/daerah";

const CardValue = ({
  label,
  value,
  className,
  classLabel,
  children,
}: {
  label: string;
  value?: string;
  className?: string;
  classLabel?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full relative border px-5 py-3 rounded-md text-sm transition-all",
        className
      )}
    >
      <Label
        className={cn(
          "absolute -top-3 bg-white px-3 py-1 rounded transition-all",
          classLabel
        )}
      >
        {label}
      </Label>
      {!children ? (
        <div className="w-full flex py-2 mt-2 items-center justify-center bg-zinc-100">
          {value}
        </div>
      ) : (
        children
      )}
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
  isImsak,
  subuhTime,
}: {
  label: string;
  isDzuhur?: boolean;
  hasilMP?: string;
  hasilInter?: string;
  nilaiIkhtiyat?: string;
  nilaiIkhtiyati?: string;
  hasilT?: string;
  isMinus?: boolean;
  isPlus?: boolean;
  isImsak?: boolean;
  subuhTime?: string;
}) => {
  const getT15 = () => {
    return isMinus ? "- t:15" : "+ t:15";
  };
  const getHasilT = () => {
    return isMinus ? "- " + hasilT : "+ " + hasilT;
  };

  return (
    <>
      {isImsak ? (
        <CardValue label={label} className="hover:bg-zinc-200">
          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
            = subuh - 10 menit
          </div>
          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
            = {subuhTime} - 00:10:00
          </div>
          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
            = {nilaiIkhtiyati}
          </div>
        </CardValue>
      ) : (
        <CardValue label={label} className="hover:bg-zinc-200">
          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
            = MP {isDzuhur ? null : getT15()} - Inter{" "}
            {isPlus ? "+ Ikhtiyat" : "- Ikhtiyat"}
          </div>
          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
            = {hasilMP} {isDzuhur ? null : getHasilT()} - {hasilInter}{" "}
            {isPlus ? "+ " + nilaiIkhtiyat : "- " + nilaiIkhtiyat}
          </div>
          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
            = {nilaiIkhtiyati}
          </div>
        </CardValue>
      )}
    </>
  );
};

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
    <CardValue label={label} className="hover:bg-zinc-200 group">
      <CardValue
        label="cos t"
        className="my-5 group-hover:border group-hover:border-zinc-50"
        classLabel="group-hover:bg-zinc-200"
      >
        <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
          <p className="hidden xl:flex">
            = - tan p &times; tan d + sin H{label} &divide; cos p &divide; cos d
          </p>
          <p className="hidden lg:flex xl:hidden">
            = - tan p &times; tan d + sin H{label}
          </p>
          <p className="flex lg:hidden">= - tan p &times; tan d</p>
        </div>
        <div className="w-full flex xl:hidden py-2 mt-2 items-center px-11 text-start bg-zinc-100">
          <p className="hidden lg:flex xl:hidden">
            + sin H{label} &divide; cos p &divide; cos d
          </p>
          <p className="flex lg:hidden">+ sin H{label}</p>
        </div>
        <div className="w-full flex lg:hidden py-2 mt-2 items-center px-11 text-start bg-zinc-100">
          &divide; cos p &divide; cos d
        </div>
        <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
          <p className="hidden xl:flex">
            = - tan {lintangDaerah} &times; tan {deklinasiMatahari} + sin{" "}
            {zenit}
          </p>
          <p className="hidden lg:flex xl:hidden">
            = - tan {lintangDaerah} &times; tan {deklinasiMatahari}
          </p>
          <p className="flex lg:hidden">= - tan {lintangDaerah}</p>
        </div>
        <div className="w-full flex py-2 mt-2 items-center px-11 text-start bg-zinc-100">
          <p className="hidden xl:flex">
            &divide; cos {lintangDaerah} &divide; cos {deklinasiMatahari}
          </p>
          <p className="hidden lg:flex xl:hidden">
            + sin {zenit} &divide; cos {lintangDaerah}
          </p>
          <p className="flex lg:hidden">&times; tan {deklinasiMatahari}</p>
        </div>
        <div className="w-full flex xl:hidden py-2 mt-2 items-center px-11 text-start bg-zinc-100">
          <p className="hidden lg:flex xl:hidden">
            &divide; cos {deklinasiMatahari}
          </p>
          <p className="flex lg:hidden">+ sin {zenit}</p>
        </div>
        <div className="w-full flex lg:hidden py-2 mt-2 items-center px-11 text-start bg-zinc-100">
          &divide; cos {lintangDaerah}
        </div>
        <div className="w-full flex lg:hidden py-2 mt-2 items-center px-11 text-start bg-zinc-100">
          &divide; cos {deklinasiMatahari}
        </div>
        <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
          = {nilaiCos}
        </div>
      </CardValue>
      <CardValue
        label="t"
        className="my-5 group-hover:border group-hover:border-zinc-50"
        classLabel="group-hover:bg-zinc-200"
      >
        <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
          = {nilaiT}
        </div>
      </CardValue>
      <CardValue
        label="t:15"
        className="my-5 group-hover:border group-hover:border-zinc-50"
        classLabel="group-hover:bg-zinc-200"
      >
        <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
          = {nilaiT15}
        </div>
      </CardValue>
    </CardValue>
  );
};

const getValueArray = (a: number | undefined) => {
  return a ?? 0;
};
const getValuePartial = (a: number) => {
  return Math.abs(a).toString().length === 1
    ? `0${Math.abs(a)}`
    : `${Math.abs(a)}`;
};

const HisabWaktuShalatPage = () => {
  // variabel
  const derajatKosong = `00° 00' 00"`;
  const jamKosong = `00j 00m 00d`;
  const clockKosong = `00:00:00`;

  // diketahui
  const [lintang, setLintang] = useState<string>("lintang utara");
  const [bujur, setBujur] = useState<string>("bujur barat");
  const [daerah, setDaerah] = useState<string>("bAceh");

  // Keterangan
  const [tanggalKet, setTanggalKet] = useState<number>(0);
  const [bulanKet, setBulanKet] = useState<number>(0);

  // koordinat
  const [lintangDerajat, setLintangDerajat] = useState<string>("00");
  const [lintangMenit, setLintangMenit] = useState<string>("00");
  const [lintangDetik, setLintangDetik] = useState<string>("00");
  const [bujurDerajat, setBujurDerajat] = useState<string>("00");
  const [bujurMenit, setBujurMenit] = useState<string>("00");
  const [bujurDetik, setBujurDetik] = useState<string>("00");

  // daerah
  const [bujurDaerah, setBujurDaerah] = useState<string>(derajatKosong);
  const [lintangDaerah, setLintangDaerah] = useState<string>(derajatKosong);

  const lintangDerajatDaerah = convertToDerajat(
    getValueArray(daerahArray.find((item) => item.value === daerah)?.lintang)
  ).derajat;
  const lintangMenitDaerah = getValuePartial(
    convertToDerajat(
      getValueArray(daerahArray.find((item) => item.value === daerah)?.lintang)
    ).menit
  );
  const lintangDetikDaerah = getValuePartial(
    convertToDerajat(
      getValueArray(daerahArray.find((item) => item.value === daerah)?.lintang)
    ).detik
  );
  const bujurDerajatDaerah = getValuePartial(
    convertToDerajat(
      getValueArray(daerahArray.find((item) => item.value === daerah)?.bujur)
    ).derajat
  );
  const bujurMenitDaerah = getValuePartial(
    convertToDerajat(
      getValueArray(daerahArray.find((item) => item.value === daerah)?.bujur)
    ).menit
  );
  const bujurDetikDaerah = getValuePartial(
    convertToDerajat(
      getValueArray(daerahArray.find((item) => item.value === daerah)?.bujur)
    ).detik
  );

  const dekDerajat =
    deklinasiArray.derajat[totalTanggal[bulanKet] + tanggalKet];
  const dekMenit = deklinasiArray.menit[totalTanggal[bulanKet] + tanggalKet];
  const dekDetik = deklinasiArray.detik[totalTanggal[bulanKet] + tanggalKet];
  const eqtMenit = equationArray.menit[totalTanggal[bulanKet] + tanggalKet];
  const eqtDetik = equationArray.detik[totalTanggal[bulanKet] + tanggalKet];
  const desDek = convertToDecimal(dekDerajat, dekMenit, dekDetik);
  const desEqt = convertToDecimal(0, eqtMenit, eqtDetik);

  const deklinasiMatahari = `${dekDerajat}° ${dekMenit}' ${dekDetik}"`;
  const equationOfTime = `${eqtMenit}m ${eqtDetik}d`;
  const [bwdDerajat, setBwdDerajat] = useState<string>("00");
  const [bujurWaktuDaerah, setBujurWaktuDaerah] = useState(derajatKosong);

  // boolean
  const [onOpenLintang, setOnOpenLintang] = useState<boolean>();
  const [onOpenBujur, setOnOpenBujur] = useState<boolean>();

  // boolean jawaban
  const [isJawaban, setIsJawaban] = useState<boolean>(false);
  const [isCalculate, setIsCalculate] = useState<boolean>(false);

  const [hasilInter1, setHasilInter1] = useState<string>(derajatKosong);
  const [hasilInter, setHasilInter] = useState<string>(derajatKosong);
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

  const [cosTDhuha, setCosTDhuha] = useState<number>(0);
  const [tDhuha, setTDhuha] = useState<number>(0);
  const [tDhuha15, setTDhuha15] = useState<string>(jamKosong);

  const [ikhtiyatDzuhur, setIkhtiyatDzuhur] = useState<string>("0");
  const [ikhtiyatiDzuhur, setIkhtiyatiDzuhur] = useState<string>(clockKosong);
  const [ikhtiyatAshar, setIkhtiyatAshar] = useState<string>("0");
  const [ikhtiyatiAshar, setIkhtiyatiAshar] = useState<string>(clockKosong);
  const [ikhtiyatMaghrib, setIkhtiyatMaghrib] = useState<string>("0");
  const [ikhtiyatiMaghrib, setIkhtiyatiMaghrib] = useState<string>(clockKosong);
  const [ikhtiyatIsya, setIkhtiyatIsya] = useState<string>("0");
  const [ikhtiyatiIsya, setIkhtiyatiIsya] = useState<string>(clockKosong);
  const [ikhtiyatSubuh, setIkhtiyatSubuh] = useState<string>("0");
  const [ikhtiyatiSubuh, setIkhtiyatiSubuh] = useState<string>(clockKosong);
  const [ikhtiyatiImsya, setIkhtiyatiImsya] = useState<string>(clockKosong);
  const [ikhtiyatTerbit, setIkhtiyatTerbit] = useState<string>("0");
  const [ikhtiyatiTerbit, setIkhtiyatiTerbit] = useState<string>(clockKosong);
  const [ikhtiyatDhuha, setIkhtiyatDhuha] = useState<string>("0");
  const [ikhtiyatiDhuha, setIkhtiyatiDhuha] = useState<string>(clockKosong);

  const handelPartialDerajat = (inputValue: string, p: string) => {
    if (p === "lintang") {
      setLintangDerajat(inputValue);
    } else if (p === "bujur") {
      setBujurDerajat(inputValue);
    } else if (p === "bwd") {
      setBwdDerajat(inputValue);
    }
  };
  const handelPartialMenit = (inputValue: string, p: string) => {
    if (p === "lintang") {
      setLintangMenit(inputValue);
    } else if (p === "bujur") {
      setBujurMenit(inputValue);
    }
  };
  const handelPartialDetik = (inputValue: string, p: string) => {
    if (p === "lintang") {
      setLintangDetik(inputValue);
    } else if (p === "bujur") {
      setBujurDetik(inputValue);
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
    if (inputValue.length > 2) {
      const truncatedValue = inputValue.slice(0, 2);

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
    p: "lintang" | "bujur" | "bwd"
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
    setIsCalculate(false);
    setBujurDerajat("000");
    setBujurMenit("00");
    setBujurDetik("00");
    setLintangDerajat("000");
    setLintangMenit("00");
    setLintangDetik("00");
    setBwdDerajat("00");
    setIkhtiyatiImsya(clockKosong);
    setIkhtiyatiSubuh(clockKosong);
    setIkhtiyatiTerbit(clockKosong);
    setIkhtiyatiDhuha(clockKosong);
    setIkhtiyatiDzuhur(clockKosong);
    setIkhtiyatiAshar(clockKosong);
    setIkhtiyatiMaghrib(clockKosong);
    setIkhtiyatiIsya(clockKosong);
  };

  const calculate = (a: "daerah" | "koordinat") => {
    // diket - lintang
    const derLK =
      lintang === "lintang selatan"
        ? `-${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`
        : `${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`;
    const derLD = `${Math.abs(
      lintangDerajatDaerah
    )}° ${lintangMenitDaerah}' ${lintangDetikDaerah}"`;
    const derLintang = a === "daerah" ? derLD : derLK;
    setLintangDaerah(derLintang);
    if (lintangDerajatDaerah.toString().startsWith("-")) {
      setLintang("lintang selatan");
    } else {
      setLintang("lintang utara");
    }

    // diket - lintang - decimal
    const desLK =
      lintang === "lintang selatan"
        ? -convertToDecimal(
            parseFloat(lintangDerajat),
            parseFloat(lintangMenit),
            parseFloat(lintangDetik)
          )
        : convertToDecimal(
            parseFloat(lintangDerajat),
            parseFloat(lintangMenit),
            parseFloat(lintangDetik)
          );
    const desLD = getValueArray(
      daerahArray.find((item) => item.value === daerah)?.lintang
    );
    const desLintang = a === "daerah" ? desLD : desLK;

    // diket - bujur - derajat
    const derBK =
      bujur === "bujur barat"
        ? `-${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`
        : `${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`;
    const derBD = `${bujurDerajatDaerah}° ${bujurMenitDaerah}' ${bujurDetikDaerah}"`;
    const derBujur = a === "daerah" ? derBD : derBK;
    setBujurDaerah(derBujur);
    if (bujurDerajatDaerah.toString().startsWith("-")) {
      setBujur("bujur barat");
    } else {
      setBujur("bujur timur");
    }

    // diket - bujur - decimal
    const desBK =
      bujur === "bujur barat"
        ? -convertToDecimal(
            parseFloat(bujurDerajat),
            parseFloat(bujurMenit),
            parseFloat(bujurDetik)
          )
        : convertToDecimal(
            parseFloat(bujurDerajat),
            parseFloat(bujurMenit),
            parseFloat(bujurDetik)
          );
    const desBD = getValueArray(
      daerahArray.find((item) => item.value === daerah)?.bujur
    );
    const desBujur = a === "daerah" ? desBD : desBK;

    // diket - bwd - desimal
    const desBWD =
      a === "daerah"
        ? daerahArray.find((item) => item.value === daerah)?.bwd ?? 0
        : parseFloat(bwdDerajat);
    setBujurWaktuDaerah(`${desBWD}°`);

    // hitung"
    let desMP = 12 - desEqt;
    const derMP = convertToDerajat(desMP);
    setHasilMP(`${derMP.derajat}j ${derMP.menit}m ${derMP.detik}d`);
    let inter1 = desBujur - desBWD;
    const derInter1 = convertToDerajat(inter1);
    setHasilInter1(
      `${derInter1.derajat}° ${derInter1.menit}' ${derInter1.detik}"`
    );
    const desHasilInter = inter1 / 15;
    const derHI = convertToDerajat(desHasilInter);
    setHasilInter(`${derHI.derajat}j ${derHI.menit}m ${derHI.detik}d`);
    console.log(
      "hitung-1:",
      desMP,
      "|",
      inter1,
      "|",
      derInter1,
      "|",
      desHasilInter,
      "|",
      derHI
    );

    const hasilMinusCotan = desLintang - desDek;
    const derHMC = convertToDerajat(hasilMinusCotan);
    setMinusCotan(`${derHMC.derajat}° ${derHMC.menit}' ${derHMC.detik}"`);
    const hasilCotanH = convertTan(hasilMinusCotan);
    setCotanHashar(parseFloat(hasilCotanH.toFixed(9)));
    const hasilPlusCotanH = hasilCotanH + 1;
    setPlusCotanH(parseFloat(hasilPlusCotanH.toFixed(9)));
    const hasilTanH = getTrueValue(hasilPlusCotanH);
    setTanH(parseFloat(hasilTanH.toFixed(9)));
    const hasilhAshar = convertFromTan(hasilTanH);
    setHAshar(parseFloat(hasilhAshar.toFixed(9)));
    const derHHA = convertToDerajat(hasilhAshar);
    const hasilDerHAshar = `${derHHA.derajat}° ${derHHA.menit}' ${derHHA.detik}"`;
    setDerHAshar(hasilDerHAshar);

    const hasilTAshar15 = ikhtiyatResult(
      desLintang,
      desDek,
      hasilhAshar,
      setCosTAshar,
      setTAshar,
      setTAshar15
    );

    const hasilTMaghribTerbit15 = ikhtiyatResult(
      desLintang,
      desDek,
      -1,
      setCosTMaghribTerbit,
      setTMaghribTerbit,
      setTMaghribTerbit15
    );

    const hasilTIsya15 = ikhtiyatResult(
      desLintang,
      desDek,
      -18,
      setCosTIsya,
      setTIsya,
      setTIsya15
    );

    const hasilTSubuh15 = ikhtiyatResult(
      desLintang,
      desDek,
      -20,
      setCosTSubuh,
      setTSubuh,
      setTSubuh15
    );

    const hasilTDhuha15 = ikhtiyatResult(
      desLintang,
      desDek,
      convertToDecimal(4, 30, 0),
      setCosTDhuha,
      setTDhuha,
      setTDhuha15
    );

    ikhtiyatiResult(
      desMP,
      desHasilInter,
      0,
      setIkhtiyatDzuhur,
      setIkhtiyatiDzuhur,
      "dzuhur"
    );
    ikhtiyatiResult(
      desMP,
      desHasilInter,
      hasilTAshar15,
      setIkhtiyatAshar,
      setIkhtiyatiAshar,
      "ashar"
    );
    ikhtiyatiResult(
      desMP,
      desHasilInter,
      hasilTMaghribTerbit15,
      setIkhtiyatMaghrib,
      setIkhtiyatiMaghrib,
      "maghrib"
    );
    ikhtiyatiResult(
      desMP,
      desHasilInter,
      hasilTIsya15,
      setIkhtiyatIsya,
      setIkhtiyatiIsya,
      "isya"
    );
    ikhtiyatiResultImsakSubuh(
      desMP,
      desHasilInter,
      hasilTSubuh15,
      setIkhtiyatiSubuh,
      setIkhtiyatiImsya,
      setIkhtiyatSubuh
    );

    ikhtiyatiResult(
      desMP,
      desHasilInter,
      hasilTMaghribTerbit15,
      setIkhtiyatTerbit,
      setIkhtiyatiTerbit,
      "terbit"
    );
    ikhtiyatiResult(
      desMP,
      desHasilInter,
      hasilTDhuha15,
      setIkhtiyatDhuha,
      setIkhtiyatiDhuha,
      "dhuha"
    );

    setIsCalculate(true);
  };

  const getClass1 = (a: boolean) => {
    return a ? "w-[70px] transition-all" : "w-14 transition-all";
  };
  return (
    <div className="w-full h-full pb-20 pt-10 sm:pb-32 flex flex-col justify-center items-center">
      <h1 className="font-semibold text-xl">Hisab Waktu Sholat</h1>
      <div className="flex flex-col gap-y-8 w-full items-center mt-4 border border-border justify-center px-8 py-10 overflow-hidden rounded-md">
        <Tabs defaultValue="koordinat" className="w-full">
          <div className="w-full justify-center flex items-center">
            {/* tombol */}
            <TabsList>
              <TabsTrigger value="koordinat">Koordinat</TabsTrigger>
              <TabsTrigger value="daerah">Daerah</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="koordinat">
            {/* koordinat */}
            <div className="flex w-full justify-center border py-4 mt-10 rounded-md items-center gap-x-4 xl:gap-x-8 sm:gap-y-4">
              <div className="relative flex flex-col xl:flex-row items-center w-full gap-y-4 xl:gap-y-0 xl:gap-x-8 justify-center">
                <Label className="mb-2 px-5 absolute -top-6 bg-white text-center">
                  Koordinat Lokasi
                </Label>
                <div className="flex w-full flex-col sm:flex-row justify-center gap-x-2 gap-y-2 items-center py-1 px-3 rounded-md">
                  <div className="flex gap-x-2">
                    <div className="w-16 flex focus-within:bg-zinc-100 pr-2 rounded-md box-content">
                      <Input
                        className="w-full border-0 bg-transparent focus-visible:bg-transparent mr-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                        value={lintangDerajat}
                        onChange={(e) =>
                          handleChange(e, 3, "derajat", "lintang")
                        }
                        type="number"
                      />
                      °
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div className="w-12 focus-within:bg-zinc-100 rounded-md flex box-content pr-2">
                      <Input
                        className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                        value={lintangMenit}
                        onChange={(e) => handleChange(e, 2, "menit", "lintang")}
                        type="text"
                      />
                      &apos;
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div
                      className={cn(
                        "flex focus-within:bg-zinc-100 transition-all rounded-md box-content pr-1",
                        getClass1(lintangDetik.length > 2)
                      )}
                    >
                      <Input
                        className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                        value={lintangDetik}
                        onChange={(e) => handleChange(e, 5, "detik", "lintang")}
                        type="number"
                      />
                      &quot;
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-10 hidden sm:flex"
                  />
                  <Popover open={onOpenLintang} onOpenChange={setOnOpenLintang}>
                    <PopoverTrigger asChild>
                      <Button className="sm:px-3 px-5 sm:w-20 w-full flex focus-visible:ring-0 focus-visible:bg-zinc-100 focus-visible:ring-offset-0 md:hover:bg-accent md:hover:text-accent-foreground">
                        <p className="flex-1">
                          {
                            lintangArray.find((item) => item.value === lintang)
                              ?.name
                          }
                        </p>
                        <ChevronDown className="ml-2 h-4 w-4 float-none -mr-1 animate-accordion-up" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 rounded sm:w-20 w-44"
                      align="center"
                    >
                      <Command>
                        <CommandGroup>
                          {lintangArray.map((item) => (
                            <CommandItem
                              key={item.value}
                              className="h-10 rounded-sm"
                              onSelect={() => {
                                setLintang(item.value);
                                setOnOpenLintang(false);
                              }}
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
                <Separator
                  orientation="vertical"
                  className="h-10 hidden xl:flex"
                />
                <div className="flex w-full flex-col sm:flex-row justify-center gap-x-2 gap-y-2 items-center py-1 px-3 rounded-md">
                  <div className="flex gap-x-2">
                    <div className="w-16 flex focus-within:bg-zinc-100 pr-2 rounded-md box-content">
                      <Input
                        className="w-full border-0 bg-transparent focus-visible:bg-transparent mr-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                        value={bujurDerajat}
                        onChange={(e) => handleChange(e, 3, "derajat", "bujur")}
                        type="number"
                      />
                      °
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div className="w-12 focus-within:bg-zinc-100 rounded-md flex box-content pr-2">
                      <Input
                        className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                        value={bujurMenit}
                        onChange={(e) => handleChange(e, 2, "menit", "bujur")}
                        type="text"
                      />
                      &apos;
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div
                      className={cn(
                        "flex focus-within:bg-zinc-100 transition-all rounded-md box-content pr-1",
                        getClass1(bujurDetik.length > 2)
                      )}
                    >
                      <Input
                        className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                        value={bujurDetik}
                        onChange={(e) => handleChange(e, 5, "detik", "bujur")}
                        type="number"
                      />
                      &quot;
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-10 hidden sm:flex"
                  />
                  <Popover open={onOpenBujur} onOpenChange={setOnOpenBujur}>
                    <PopoverTrigger asChild>
                      <Button className="sm:px-3 px-5 sm:w-20 w-full flex focus-visible:ring-0 focus-visible:bg-zinc-100 focus-visible:ring-offset-0 md:hover:bg-accent md:hover:text-accent-foreground">
                        <p className="flex-1">
                          {
                            bujurArray.find((item) => item.value === bujur)
                              ?.name
                          }
                        </p>
                        <ChevronDown className="ml-2 h-4 w-4 float-none -mr-1 animate-accordion-up" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 rounded sm:w-20 w-44"
                      align="center"
                    >
                      <Command>
                        <CommandGroup>
                          {bujurArray.map((item) => (
                            <CommandItem
                              key={item.value}
                              className="h-10 rounded-sm"
                              onSelect={() => {
                                setBujur(item.value);
                                setOnOpenBujur(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  item.value === bujur
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
              </div>
              <Separator
                orientation="vertical"
                className="h-32 xl:h-10 md:flex hidden"
              />
              <div className="relative hidden md:flex justify-center xl:w-64 w-96">
                <Label className="mb-2 px-5  absolute whitespace-nowrap -top-16 bg-white text-center">
                  Bujur Waktu Daerah
                </Label>
                <div className="flex w-24 justify-center focus-within:bg-zinc-100 items-center py-1 px-3 rounded-md">
                  <Input
                    className="w-full border-0 bg-transparent focus-visible:bg-transparent mr-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={bwdDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "bwd")}
                    type="number"
                  />
                  °
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center border py-4 mt-8 md:hidden rounded-md items-center gap-x-8 sm:gap-y-4">
              <div className="relative flex gap-x-8 justify-center">
                <Label className="mb-2 px-5 whitespace-nowrap absolute -top-6 bg-white text-center">
                  Bujur Waktu Daerah
                </Label>
                <div className="flex w-24 justify-center focus-within:bg-zinc-100 items-center py-1 px-3 rounded-md">
                  <Input
                    className="w-full border-0 bg-transparent focus-visible:bg-transparent mr-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={bwdDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "bwd")}
                    type="number"
                  />
                  °
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full relative mt-10">
              <div className="w-[250px] absolute -top-5 bg-white">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full flex justify-start"
                      variant={"outline"}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <p className="flex-1">{`${tanggalKet + 1} ${
                        bulanCollection[bulanKet]
                      }`}</p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[250px]" align="center">
                    <div className="flex h-[232px]">
                      <ScrollArea className="w-[169px] px-2 mt-2 h-56">
                        {bulanArray.map((item) => (
                          <Button
                            key={item}
                            variant={"ghost"}
                            className="w-full h-7 text-sm last:mb-[196px] rounded-sm snap-start"
                            onClick={() => {
                              setBulanKet(parseFloat(item) - 1);
                              setTanggalKet(0);
                            }}
                          >
                            {bulanCollection[parseFloat(item) - 1]}
                          </Button>
                        ))}
                      </ScrollArea>
                      <Separator orientation="vertical" />
                      <ScrollArea className="w-20 px-2 mt-2 h-56">
                        {bulanKet === 2 ? (
                          <div>
                            {tanggalArray.slice(0, 28).map((item) => (
                              <Button
                                key={item}
                                variant={"ghost"}
                                className="w-full h-7 text-sm last:mb-[196px] snap-start"
                                onClick={() => {
                                  setTanggalKet(parseFloat(item) - 1);
                                }}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <div>
                            {bulanKet === 4 ||
                            bulanKet === 6 ||
                            bulanKet === 9 ||
                            bulanKet === 11 ? (
                              <div>
                                {tanggalArray.slice(0, 30).map((item) => (
                                  <Button
                                    key={item}
                                    variant={"ghost"}
                                    className="w-full h-7 text-sm last:mb-[196px] snap-start"
                                    onClick={() => {
                                      setTanggalKet(parseFloat(item) - 1);
                                    }}
                                  >
                                    {item}
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div>
                                {tanggalArray.map((item) => (
                                  <Button
                                    key={item}
                                    variant={"ghost"}
                                    className="w-full h-7 text-sm last:mb-[196px] snap-start"
                                    onClick={() => {
                                      setTanggalKet(parseFloat(item) - 1);
                                    }}
                                  >
                                    {item}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                    <Separator />
                    <div className="flex p-2 gap-x-2">
                      <div className="w-full flex justify-end">
                        <Button size={"icon"}>OK</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex w-full flex-col md:flex-row justify-center border py-4 rounded-md items-center gap-8">
                <div className="w-full flex justify-center mt-8 md:mt-0">
                  <div className="items-start gap-y-2 flex flex-col">
                    <Label>Deklinasi Matahari</Label>
                    <div className="flex gap-x-2 items-center rounded-md">
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center border items-center rounded-md box-content">
                        {deklinasiArray.derajat[
                          totalTanggal[bulanKet] + tanggalKet
                        ]
                          .toString()
                          .startsWith("-") ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          deklinasiArray.derajat[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              deklinasiArray.derajat[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              deklinasiArray.derajat[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">°</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          deklinasiArray.menit[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              deklinasiArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              deklinasiArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&apos;</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          deklinasiArray.detik[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              deklinasiArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              deklinasiArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="md:h-14 md:w-[1px] h-[1px] w-3/4 md:mt-4" />
                <div className="w-full flex justify-center">
                  <div className="items-start md:items-end gap-y-2 flex flex-col">
                    <Label>Equation of Time</Label>
                    <div className="flex gap-x-2 items-center rounded-md">
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center border items-center rounded-md box-content">
                        {equationArray.menit[
                          totalTanggal[bulanKet] + tanggalKet
                        ]
                          .toString()
                          .startsWith("-") ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        00
                        <p className="absolute -top-0.5 right-1">°</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          equationArray.menit[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              equationArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              equationArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&apos;</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          equationArray.detik[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              equationArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              equationArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-4 mt-4 sm:gap-y-0 sm:flex-row items-center justify-center">
              <Button
                className="lg:w-[600px] w-full sm:mr-[10px]"
                onClick={() => calculate("koordinat")}
              >
                Calculate
              </Button>
              <Button
                size={"icon"}
                onClick={resetValue}
                className="w-full sm:w-10"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="daerah">
            {/* daerah */}
            <div className="flex w-full justify-center border pb-4 pt-8 mt-10 rounded-md items-center gap-x-8 sm:gap-y-4 relative">
              <div className="max-w-[400px] w-10/12 absolute -top-5 bg-white">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full flex justify-between"
                      variant={"outline"}
                    >
                      <MapPinned className="w-4 h-4" />
                      <p className="w-3/4 overflow-hidden whitespace-nowrap text-ellipsis">
                        {`${
                          daerahArray.find((item) => item.value === daerah)
                            ?.deskripsi
                        }, ${
                          daerahArray.find((item) => item.value === daerah)
                            ?.nama
                        }`}
                      </p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 w-[200px] sm:w-[300px] md:w-[400px]"
                    align="center"
                  >
                    <Command>
                      <CommandInput placeholder="Cari Daerah..." />
                      <CommandEmpty>Daerah tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-40 snap-y">
                          {daerahArray.map((item) => (
                            <HoverCard key={item.value}>
                              <HoverCardTrigger>
                                <CommandItem
                                  className="snap-start"
                                  value={item.value}
                                  onSelect={() => setDaerah(item.value)}
                                >
                                  {item.nama}
                                  <CommandShortcut className="text-[10px] flex items-center">
                                    <p className="whitespace-nowrap overflow-hidden text-ellipsis w-20">
                                      {item.deskripsi}
                                    </p>
                                    <ChevronRight className="w-3 h-3 ml-1" />
                                  </CommandShortcut>
                                </CommandItem>
                              </HoverCardTrigger>
                              <HoverCardContent side="right" className="w-full">
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold">
                                    {`${item.provinsi} `}
                                    <span className="font-normal text-xs md:text-sm">{`(${item.nama})`}</span>
                                  </h4>
                                  <Separator />
                                  <p className="text-sm font-medium">
                                    {item.deskripsi}
                                  </p>
                                  <p className="text-xs md:text-sm">
                                    {item.kecamatan}
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-y-4 text-sm">
                <div className="flex w-full justify-center gap-x-2 items-center py-1 px-3 rounded-md">
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                    {getValuePartial(
                      convertToDerajat(
                        getValueArray(
                          daerahArray.find((item) => item.value === daerah)
                            ?.lintang
                        )
                      ).derajat
                    )}
                    <p className="absolute -top-0.5 right-1">°</p>
                  </div>
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                    {getValuePartial(
                      convertToDerajat(
                        getValueArray(
                          daerahArray.find((item) => item.value === daerah)
                            ?.lintang
                        )
                      ).menit
                    )}
                    <p className="absolute -top-0.5 right-1">&apos;</p>
                  </div>
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                    {getValuePartial(
                      convertToDerajat(
                        getValueArray(
                          daerahArray.find((item) => item.value === daerah)
                            ?.lintang
                        )
                      ).detik
                    )}
                    <p className="absolute -top-0.5 right-1">&quot;</p>
                  </div>
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center bg-primary  items-center text-primary-foreground border rounded-md box-content relative">
                    {daerahArray
                      .find((item) => item.value === daerah)
                      ?.lintang.toString()
                      .startsWith("-")
                      ? "LS"
                      : "LU"}
                  </div>
                </div>
                <Separator className="lg:h-10 lg:w-[1px] w-3/4 h-[1px]" />
                <div className="flex w-full justify-center gap-x-2 items-center py-1 px-3 rounded-md">
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                    {getValuePartial(
                      convertToDerajat(
                        getValueArray(
                          daerahArray.find((item) => item.value === daerah)
                            ?.bujur
                        )
                      ).derajat
                    )}
                    <p className="absolute -top-0.5 right-1">°</p>
                  </div>
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                    {getValuePartial(
                      convertToDerajat(
                        getValueArray(
                          daerahArray.find((item) => item.value === daerah)
                            ?.bujur
                        )
                      ).menit
                    )}
                    <p className="absolute -top-0.5 right-1">&apos;</p>
                  </div>
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                    {getValuePartial(
                      convertToDerajat(
                        getValueArray(
                          daerahArray.find((item) => item.value === daerah)
                            ?.bujur
                        )
                      ).detik
                    )}
                    <p className="absolute -top-0.5 right-1">&quot;</p>
                  </div>
                  <div className="w-16 h-10 text-xs md:text-sm flex justify-center text-primary-foreground bg-primary items-center border rounded-md box-content relative">
                    {daerahArray
                      .find((item) => item.value === daerah)
                      ?.bujur.toString()
                      .startsWith("-")
                      ? "BB"
                      : "BT"}
                  </div>
                </div>
              </div>
              <Separator className="h-20 w-[1px] lg:h-10 hidden md:flex lg:hidden" />
              <div className="relative hidden md:flex justify-center w-44 mr-8">
                <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                  {daerahArray.find((item) => item.value === daerah)?.bwd}
                  <p className="absolute -top-0.5 right-1">°</p>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center border py-4 mt-8 md:hidden rounded-md items-center gap-x-8 sm:gap-y-4">
              <div className="relative flex gap-x-8 justify-center">
                <Label className="mb-2 px-5 whitespace-nowrap absolute -top-6 bg-white text-center">
                  Bujur Waktu Daerah
                </Label>
                <div className="w-16 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                  {daerahArray.find((item) => item.value === daerah)?.bwd}
                  <p className="absolute -top-0.5 right-1">°</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full relative mt-8">
              <div className="max-w-[250px] w-10/12 absolute -top-5 bg-white">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full flex justify-start"
                      variant={"outline"}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <p className="flex-1">{`${tanggalKet + 1} ${
                        bulanCollection[bulanKet]
                      }`}</p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[250px]" align="center">
                    <div className="flex h-[232px]">
                      <ScrollArea className="w-[169px] px-2 mt-2 h-56">
                        {bulanArray.map((item) => (
                          <Button
                            key={item}
                            variant={"ghost"}
                            className="w-full h-7 text-sm last:mb-[196px] rounded-sm snap-start"
                            onClick={() => {
                              setBulanKet(parseFloat(item) - 1);
                              setTanggalKet(0);
                            }}
                          >
                            {bulanCollection[parseFloat(item) - 1]}
                          </Button>
                        ))}
                      </ScrollArea>
                      <Separator orientation="vertical" />
                      <ScrollArea className="w-20 px-2 mt-2 h-56">
                        {bulanKet === 2 ? (
                          <div>
                            {tanggalArray.slice(0, 28).map((item) => (
                              <Button
                                key={item}
                                variant={"ghost"}
                                className="w-full h-7 text-sm last:mb-[196px] snap-start"
                                onClick={() => {
                                  setTanggalKet(parseFloat(item) - 1);
                                }}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <div>
                            {bulanKet === 4 ||
                            bulanKet === 6 ||
                            bulanKet === 9 ||
                            bulanKet === 11 ? (
                              <div>
                                {tanggalArray.slice(0, 30).map((item) => (
                                  <Button
                                    key={item}
                                    variant={"ghost"}
                                    className="w-full h-7 text-sm last:mb-[196px] snap-start"
                                    onClick={() => {
                                      setTanggalKet(parseFloat(item) - 1);
                                    }}
                                  >
                                    {item}
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div>
                                {tanggalArray.map((item) => (
                                  <Button
                                    key={item}
                                    variant={"ghost"}
                                    className="w-full h-7 text-sm last:mb-[196px] snap-start"
                                    onClick={() => {
                                      setTanggalKet(parseFloat(item) - 1);
                                    }}
                                  >
                                    {item}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                    <Separator />
                    <div className="flex p-2 gap-x-2">
                      <div className="w-full flex justify-end">
                        <Button size={"icon"}>OK</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex w-full flex-col md:flex-row justify-center border py-4 rounded-md items-center gap-x-8 gap-y-4">
                <div className="w-full flex justify-center mt-8 md:mt-0">
                  <div className="items-start gap-y-2 flex flex-col">
                    <Label>Deklinasi Matahari</Label>
                    <div className="flex gap-x-2 items-center rounded-md">
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center border items-center rounded-md box-content">
                        {deklinasiArray.derajat[
                          totalTanggal[bulanKet] + tanggalKet
                        ]
                          .toString()
                          .startsWith("-") ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          deklinasiArray.derajat[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              deklinasiArray.derajat[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              deklinasiArray.derajat[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">°</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          deklinasiArray.menit[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              deklinasiArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              deklinasiArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&apos;</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          deklinasiArray.detik[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              deklinasiArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              deklinasiArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="md:h-14 md:w-[1px] w-3/4 h-[1px] md:mt-4 " />
                <div className="w-full flex justify-center">
                  <div className="items-start md:items-end gap-y-2 flex flex-col">
                    <Label>Equation of Time</Label>
                    <div className="flex gap-x-2 items-center rounded-md">
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center border items-center rounded-md box-content">
                        {equationArray.menit[
                          totalTanggal[bulanKet] + tanggalKet
                        ]
                          .toString()
                          .startsWith("-") ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        00
                        <p className="absolute -top-0.5 right-1">°</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          equationArray.menit[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              equationArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              equationArray.menit[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&apos;</p>
                      </div>
                      <div className="w-14 h-10 text-xs md:text-sm flex justify-center items-center border rounded-md box-content relative">
                        {Math.abs(
                          equationArray.detik[
                            totalTanggal[bulanKet] + tanggalKet
                          ]
                        ).toString().length === 1
                          ? `0${Math.abs(
                              equationArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}`
                          : Math.abs(
                              equationArray.detik[
                                totalTanggal[bulanKet] + tanggalKet
                              ]
                            )}
                        <p className="absolute -top-0.5 right-1">&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-4 mt-4 sm:gap-y-0 sm:flex-row items-center justify-center">
              <Button
                className="lg:w-[600px] w-full sm:mr-[10px]"
                onClick={() => calculate("daerah")}
              >
                Calculate
              </Button>
              <Button
                size={"icon"}
                onClick={resetValue}
                className="w-full sm:w-10"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className="border w-full flex-wrap gap-8 px-5 pt-8 pb-5 justify-center rounded-md flex relative">
          <Label className="mb-2 px-5 absolute -top-2 bg-white text-center">
            Waktu Sholat
          </Label>
          <div className="flex flex-col">
            <Label className="mb-2">Imsak</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiImsya}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Subuh</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiSubuh}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Terbit</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiTerbit}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Dhuha</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiDhuha}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Dzuhur</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiDzuhur}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Ashar</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiAshar}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Maghrib</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">
              {ikhtiyatiMaghrib}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Isya</Label>
            <div className="px-5 py-2 bg-zinc-100 rounded">{ikhtiyatiIsya}</div>
          </div>
        </div>
      </div>
      {isCalculate && (
        <div className="w-full min-h-[150px] h-full mt-12 border border-border p-4 rounded-md">
          {isJawaban ? (
            <div className="w-full flex flex-col relative">
              <p>Diketahui:</p>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
                <CardValue
                  label="Lintang"
                  value={
                    lintangDaerah +
                    " " +
                    lintangArray.find((item) => item.value === lintang)?.name
                  }
                />
                <CardValue
                  label="Bujur"
                  value={
                    bujurDaerah +
                    " " +
                    bujurArray.find((item) => item.value === bujur)?.name
                  }
                />
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
                <CardValue
                  label="EQT (Equation of Time)"
                  value={equationOfTime}
                />
                <CardValue
                  label="Deklinasi Matahari"
                  value={deklinasiMatahari}
                />
                <CardValue
                  label="Bujur Waktu Daerah"
                  value={bujurWaktuDaerah}
                />
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
                <CardValue label="MP">
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = 12j - Equation of Time
                  </div>
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = 12j - {equationOfTime}
                  </div>
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = {hasilMP}
                  </div>
                </CardValue>
                <CardValue label="Inter">
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = &#40;Bujur Tempat/Daerah&divide; Bujur Waktu Daerah&#41;
                    &divide; 15
                  </div>
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = &#40;{bujurDaerah} - {bujurWaktuDaerah}&#41; &divide; 15
                  </div>
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = &#40;{hasilInter1}&#41; &divide; 15
                  </div>
                  <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                    = {hasilInter}
                  </div>
                </CardValue>
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
                <CardValue label="HAshar">
                  <CardValue label="Cotan HAshar" className="my-5">
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = &#40;tan [lintang daerah &minus; deklinasi]&#41; + 1
                    </div>
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = &#40;tan [{lintangDaerah} &minus; {deklinasiMatahari}
                      ]&#41; + 1
                    </div>
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = &#40;tan {minusCotan}&#41; + 1
                    </div>
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = {cotanHashar} + 1
                    </div>
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = {plusCotanH}
                    </div>
                  </CardValue>
                  <CardValue label="tan HAshar" className="my-5">
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = {tanH}
                    </div>
                  </CardValue>
                  <CardValue label="HAshar" className="my-5">
                    <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                      = {hAshar} atau {derHAshar}
                    </div>
                  </CardValue>
                </CardValue>
                <CardValue label="Ho">
                  <CardValue label="HDzuhur" className="my-5" value="-" />
                  <CardValue
                    label="HAshar"
                    className="my-5"
                    value="Dengan Rumus"
                  />
                  <CardValue label="HMaghrib" className="my-5" value="-1°" />
                  <CardValue label="HIsya" className="my-5" value="-18°" />
                  <CardValue label="HSubuh" className="my-5" value="-20°" />
                  <CardValue
                    label="HImsa"
                    className="my-5"
                    value="10 Menit Sebelum Subuh"
                  />
                  <CardValue label="HTerbit" className="my-5" value="-1°" />
                  <CardValue label="HDhuha" className="my-5" value="-4° 30'" />
                </CardValue>
              </div>
              <Separator className="mt-10 mb-5" />
              <p>Perhitungan:</p>
              <Label className="ml-4 mt-2">- t:15:</Label>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
              </div>
              <Label className="ml-4 mt-8 mb-2">- Ikhtiyati:</Label>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
                  label="Imsak"
                  nilaiIkhtiyati={ikhtiyatiImsya}
                  isImsak
                  subuhTime={ikhtiyatiSubuh}
                  isMinus
                />
              </div>
              <div className="flex sm:flex-row flex-col mt-8 gap-8">
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
          ) : (
            <div className="flex w-full h-[150px] gap-y-3 flex-col justify-center items-center">
              <Label>Cara & Rumus</Label>
              <Button className="px-6" onClick={() => setIsJawaban(true)}>
                <Expand className="w-4 h-4 mr-2" />
                Perluas
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HisabWaktuShalatPage;
