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
  getValueArray,
  getValuePartial,
  ikhtiyatResult,
  ikhtiyatiResult,
  ikhtiyatiResultImsakSubuh,
  lintangArray,
  tanggalArray,
  totalTanggal,
} from "@/lib/utils";
import {
  ArrowUpRightSquare,
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronRight,
  Expand,
  MapPinned,
  Minimize,
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
import CardPerhitungan from "@/components/hisab/card-perhitungan";
import CardValue from "@/components/hisab/card-value";
import CardIkhtiyati from "@/components/hisab/card-ikhtiyati";
import CardWaktu from "@/components/hisab/card-waktu";
import Link from "next/link";

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
  const [bujurDaerahA, setBujurDaerahA] = useState<string>(derajatKosong);
  const [lintangDaerah, setLintangDaerah] = useState<string>(derajatKosong);
  const [lintangDaerahA, setLintangDaerahA] = useState<string>(derajatKosong);

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
  const bujurDerajatDaerah = convertToDerajat(
    getValueArray(daerahArray.find((item) => item.value === daerah)?.bujur)
  ).derajat;
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
  const [onOpenLintang, setOnOpenLintang] = useState<boolean>(false);
  const [onOpenBujur, setOnOpenBujur] = useState<boolean>(false);
  const [onOpenTanggal, setOnOpenTanggal] = useState<boolean>(false);
  const [onOpenDaerah, setOnOpenDaerah] = useState<boolean>(false);

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
    const derLK = `${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`;
    const derLKH =
      lintang === "lintang selatan"
        ? `-${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`
        : `${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`;
    const derLD = `${getValuePartial(
      Math.abs(lintangDerajatDaerah)
    )}° ${lintangMenitDaerah}' ${lintangDetikDaerah}"`;
    const derLintang = a === "daerah" ? derLD : derLKH;
    const derLintangA = a === "daerah" ? derLD : derLK;
    setLintangDaerahA(derLintangA);
    setLintangDaerah(derLintang);
    if (a === "daerah") {
      if (lintangDerajatDaerah.toString().startsWith("-")) {
        setLintang("lintang selatan");
      } else {
        setLintang("lintang utara");
      }
    }

    // diket - lintang - decimal
    const desLK =
      lintang === "lintang selatan"
        ? convertToDecimal(
            -parseFloat(lintangDerajat),
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
    const derBK = `${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`;
    const derBKH =
      bujur === "bujur barat"
        ? `-${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`
        : `${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`;
    const derBD = `${getValuePartial(
      Math.abs(bujurDerajatDaerah)
    )}° ${bujurMenitDaerah}' ${bujurDetikDaerah}"`;
    const derBujurA = a === "daerah" ? derBD : derBK;
    const derBujur = a === "daerah" ? derBD : derBKH;
    setBujurDaerah(derBujur);
    setBujurDaerahA(derBujurA);
    if (a === "daerah") {
      if (bujurDerajatDaerah.toString().startsWith("-")) {
        setBujur("bujur barat");
      } else {
        setBujur("bujur timur");
      }
    }

    // diket - bujur - decimal
    const desBK =
      bujur === "bujur barat"
        ? convertToDecimal(
            -parseFloat(bujurDerajat),
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
    console.log(desLintang, desDek, hasilMinusCotan);
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

  return (
    <div className="w-full h-[calc(100vh-56px)] relative flex">
      <div className="w-[350px] h-full px-5 pt-8 pb-3 justify-center flex relative">
        <Tabs className="w-full" defaultValue="koordinat">
          <div className="flex w-full justify-center">
            <TabsList>
              <TabsTrigger value="koordinat">Koordinat</TabsTrigger>
              <TabsTrigger value="daerah">Daerah</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="koordinat" className="w-full">
            <div className="w-full p-2 border rounded-md relative mt-8">
              <div className="w-full justify-center flex">
                <Label className="absolute -top-2 px-3 bg-white">
                  Koordinat
                </Label>
              </div>
              <div className="flex w-full mt-3 mb-2">
                <div className="py-2 px-2 pr-1 flex focus-within:bg-zinc-100 rounded-sm box-content w-full">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={lintangDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "lintang")}
                    type="number"
                  />
                  °
                </div>
                <div className="py-2 px-2 pr-1 flex focus-within:bg-zinc-100 rounded-sm box-content w-full">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={lintangMenit}
                    onChange={(e) => handleChange(e, 2, "menit", "lintang")}
                    type="text"
                  />
                  &apos;
                </div>
                <div className="py-2 px-2 pr-1 flex focus-within:bg-zinc-100 rounded-sm box-content w-full">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={lintangDetik}
                    onChange={(e) => handleChange(e, 5, "detik", "lintang")}
                    type="number"
                  />
                  &quot;
                </div>
                <Popover open={onOpenLintang} onOpenChange={setOnOpenLintang}>
                  <PopoverTrigger asChild>
                    <Button className="h-10 w-10 flex ml-1 text-xs focus-visible:ring-0 rounded-sm group hover:text-white focus-visible:bg-zinc-100 focus-visible:ring-offset-0">
                      <p className="group-hover:opacity-0 transition-all">
                        {
                          lintangArray.find((item) => item.value === lintang)
                            ?.name
                        }
                      </p>
                      <ChevronDown className="h-4 w-4 group-hover:opacity-100 opacity-0 absolute transition-all text-white animate-accordion-up" />
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
              <Separator />
              <div className="flex w-full mt-2">
                <div className="py-2 px-2 pr-1 flex focus-within:bg-zinc-100 rounded-sm box-content w-full">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={bujurDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "bujur")}
                    type="number"
                  />
                  °
                </div>
                <div className="py-2 px-2 pr-1 flex focus-within:bg-zinc-100 rounded-sm box-content w-full">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={bujurMenit}
                    onChange={(e) => handleChange(e, 2, "menit", "bujur")}
                    type="text"
                  />
                  &apos;
                </div>
                <div className="py-2 px-2 pr-1 flex focus-within:bg-zinc-100 rounded-sm box-content w-full">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={bujurDetik}
                    onChange={(e) => handleChange(e, 5, "detik", "bujur")}
                    type="number"
                  />
                  &quot;
                </div>
                <Popover open={onOpenBujur} onOpenChange={setOnOpenBujur}>
                  <PopoverTrigger asChild>
                    <Button className="h-10 w-10 flex ml-1 text-xs focus-visible:ring-0 rounded-sm group hover:text-white focus-visible:bg-zinc-100 focus-visible:ring-offset-0">
                      <p className="group-hover:opacity-0 transition-all">
                        {bujurArray.find((item) => item.value === bujur)?.name}
                      </p>
                      <ChevronDown className="h-4 w-4 group-hover:opacity-100 opacity-0 absolute transition-all text-white animate-accordion-up" />
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
            <div className="w-full p-2 border rounded-md relative mt-8">
              <div className="w-full justify-center flex">
                <Label className="absolute -top-2 px-3 bg-white">
                  Bujur Waktu Daerah
                </Label>
                <div className="flex w-16 justify-center focus-within:bg-zinc-100 items-center py-1 px-3 rounded-md mt-3">
                  <Input
                    className="text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-0 py-0 bg-transparent h-auto w-full"
                    value={bwdDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "bwd")}
                    type="number"
                  />
                  °
                </div>
              </div>
            </div>
            <div className="w-full p-2 border rounded-md relative mt-10">
              <div className="w-full justify-center flex">
                <Popover open={onOpenTanggal} onOpenChange={setOnOpenTanggal}>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-10/12 flex h-10 justify-start text-sm absolute -top-5"
                      variant={"outline"}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <p className="flex-1">{`${tanggalKet + 1} ${
                        bulanCollection[bulanKet]
                      }`}</p>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[195px]" align="center">
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
                        <Button
                          size={"icon"}
                          onClick={() => setOnOpenTanggal(false)}
                        >
                          OK
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex w-full flex-col mt-8 gap-2">
                <Label>Deklinasi Matahari</Label>
                <div className="bg-zinc-100 rounded-sm flex w-full text-xs">
                  <div className="h-10 px-2 pr-1 flex justify-center  items-center rounded-sm box-content w-full">
                    {deklinasiArray.derajat[totalTanggal[bulanKet] + tanggalKet]
                      .toString()
                      .startsWith("-") ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      Math.abs(
                        deklinasiArray.derajat[
                          totalTanggal[bulanKet] + tanggalKet
                        ]
                      )
                    )}{" "}
                    °
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      deklinasiArray.menit[totalTanggal[bulanKet] + tanggalKet]
                    )}{" "}
                    &apos;
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      deklinasiArray.detik[totalTanggal[bulanKet] + tanggalKet]
                    )}{" "}
                    &quot;
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col mt-5 gap-2">
                <Label>Equation of Time</Label>
                <div className="bg-zinc-100 rounded-sm flex w-full text-xs">
                  <div className="h-10 px-2 pr-1 flex justify-center  items-center rounded-sm box-content w-full">
                    {equationArray.menit[totalTanggal[bulanKet] + tanggalKet]
                      .toString()
                      .startsWith("-") ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    00 °
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      Math.abs(
                        equationArray.menit[totalTanggal[bulanKet] + tanggalKet]
                      )
                    )}{" "}
                    &apos;
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      equationArray.detik[totalTanggal[bulanKet] + tanggalKet]
                    )}{" "}
                    &quot;
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <Button className="flex-1" onClick={() => calculate("koordinat")}>
                Calculate
              </Button>
              <Button className="w-10 h-10 p-0" onClick={resetValue}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute bottom-8 w-[calc(100%-40px)]">
              <div className="w-full p-2 border rounded-md relative">
                <div className="w-full justify-center flex">
                  <Label className="absolute -top-2 px-3 bg-white">
                    Notes:
                  </Label>
                </div>
                <ul className="text-xs mt-3 space-y-2">
                  <li className="flex gap-2 items-center">
                    - List Deklinasi Matahari
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                  <li className="flex gap-2 items-center">
                    - List Equation of Time
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                  <li className="flex gap-2 items-center">
                    - List Koordinat Daerah
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                  <li className="flex gap-2 items-center">
                    - Rumus Perhitungan
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="daerah" className="w-full">
            <div className="w-full p-2 border rounded-md relative mt-8">
              <div className="w-full justify-center flex">
                <div className="w-10/12 absolute -top-5 bg-white">
                  <Popover open={onOpenDaerah} onOpenChange={setOnOpenDaerah}>
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
                      className="p-0 w-[200px] sm:w-[280px]"
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
                                    onSelect={() => {
                                      setDaerah(item.value);
                                      setOnOpenDaerah(false);
                                    }}
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
                                <HoverCardContent
                                  side="right"
                                  className="w-full"
                                >
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
              </div>
              <div className="flex w-full mt-6 mb-2">
                <div className="py-2 px-2 pr-1 flex text-xs justify-start items-center rounded-sm box-content w-full">
                  {getValuePartial(
                    convertToDerajat(
                      getValueArray(
                        daerahArray.find((item) => item.value === daerah)
                          ?.lintang
                      )
                    ).derajat
                  )}{" "}
                  °
                </div>
                <div className="py-2 px-2 pr-1 flex text-xs justify-start items-center rounded-sm box-content w-full">
                  {getValuePartial(
                    convertToDerajat(
                      getValueArray(
                        daerahArray.find((item) => item.value === daerah)
                          ?.lintang
                      )
                    ).menit
                  )}{" "}
                  &apos;
                </div>
                <div className="py-2 px-2 pr-1 flex text-xs justify-start items-center rounded-sm box-content w-full">
                  {getValuePartial(
                    convertToDerajat(
                      getValueArray(
                        daerahArray.find((item) => item.value === daerah)
                          ?.lintang
                      )
                    ).detik
                  )}{" "}
                  &quot;
                </div>
                <div className="h-10 w-10 flex-none text-xs font-semibold rounded-sm flex justify-center items-center bg-primary text-white">
                  {daerahArray
                    .find((item) => item.value === daerah)
                    ?.lintang.toString()
                    .startsWith("-")
                    ? "LS"
                    : "LU"}
                </div>
              </div>
              <Separator />
              <div className="flex w-full mt-3 mb-2">
                <div className="py-2 px-2 pr-1 flex text-xs justify-start items-center rounded-sm box-content w-full">
                  {getValuePartial(
                    convertToDerajat(
                      getValueArray(
                        daerahArray.find((item) => item.value === daerah)?.bujur
                      )
                    ).derajat
                  )}{" "}
                  °
                </div>
                <div className="py-2 px-2 pr-1 flex text-xs justify-start items-center rounded-sm box-content w-full">
                  {getValuePartial(
                    convertToDerajat(
                      getValueArray(
                        daerahArray.find((item) => item.value === daerah)?.bujur
                      )
                    ).menit
                  )}{" "}
                  &apos;
                </div>
                <div className="py-2 px-2 pr-1 flex text-xs justify-start items-center rounded-sm box-content w-full">
                  {getValuePartial(
                    convertToDerajat(
                      getValueArray(
                        daerahArray.find((item) => item.value === daerah)?.bujur
                      )
                    ).detik
                  )}{" "}
                  &quot;
                </div>
                <div className="h-10 w-10 flex-none text-xs font-semibold rounded-sm flex justify-center items-center bg-primary text-white">
                  {daerahArray
                    .find((item) => item.value === daerah)
                    ?.bujur.toString()
                    .startsWith("-")
                    ? "BB"
                    : "BT"}
                </div>
              </div>
            </div>
            <div className="w-full p-2 border rounded-md relative mt-8">
              <div className="w-full justify-center flex">
                <Label className="absolute -top-2 px-3 bg-white">
                  Bujur Waktu Daerah
                </Label>
                <div className="py-2 px-2 pr-1 flex text-xs justify-center items-center rounded-sm box-content w-full mt-3">
                  {daerahArray.find((item) => item.value === daerah)?.bwd}°
                </div>
              </div>
            </div>
            <div className="w-full p-2 border rounded-md relative mt-10">
              <div className="w-full justify-center flex">
                <Popover open={onOpenTanggal} onOpenChange={setOnOpenTanggal}>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-10/12 flex h-10 justify-start text-sm absolute -top-5"
                      variant={"outline"}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <p className="flex-1">{`${tanggalKet + 1} ${
                        bulanCollection[bulanKet]
                      }`}</p>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[195px]" align="center">
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
                        <Button
                          size={"icon"}
                          onClick={() => setOnOpenTanggal(false)}
                        >
                          OK
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex w-full flex-col mt-8 gap-2">
                <Label>Deklinasi Matahari</Label>
                <div className="bg-zinc-100 rounded-sm flex w-full text-xs">
                  <div className="h-10 px-2 pr-1 flex justify-center  items-center rounded-sm box-content w-full">
                    {deklinasiArray.derajat[totalTanggal[bulanKet] + tanggalKet]
                      .toString()
                      .startsWith("-") ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      Math.abs(
                        deklinasiArray.derajat[
                          totalTanggal[bulanKet] + tanggalKet
                        ]
                      )
                    )}{" "}
                    °
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      deklinasiArray.menit[totalTanggal[bulanKet] + tanggalKet]
                    )}{" "}
                    &apos;
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      deklinasiArray.detik[totalTanggal[bulanKet] + tanggalKet]
                    )}{" "}
                    &quot;
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col mt-5 gap-2">
                <Label>Equation of Time</Label>
                <div className="bg-zinc-100 rounded-sm flex w-full text-xs">
                  <div className="h-10 px-2 pr-1 flex justify-center  items-center rounded-sm box-content w-full">
                    {equationArray.menit[totalTanggal[bulanKet] + tanggalKet]
                      .toString()
                      .startsWith("-") ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    00 °
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      Math.abs(
                        equationArray.menit[totalTanggal[bulanKet] + tanggalKet]
                      )
                    )}{" "}
                    &apos;
                  </div>
                  <div className="h-10 items-center px-2 pr-1 flex justify-center  rounded-sm box-content w-full">
                    {getValuePartial(
                      equationArray.detik[totalTanggal[bulanKet] + tanggalKet]
                    )}{" "}
                    &quot;
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <Button className="flex-1" onClick={() => calculate("daerah")}>
                Calculate
              </Button>
              <Button className="w-10 h-10 p-0" onClick={resetValue}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute bottom-8 w-[calc(100%-40px)]">
              <div className="w-full p-2 border rounded-md relative">
                <div className="w-full justify-center flex">
                  <Label className="absolute -top-2 px-3 bg-white">
                    Notes:
                  </Label>
                </div>
                <ul className="text-xs mt-3 space-y-2">
                  <li className="flex gap-2 items-center">
                    - List Deklinasi Matahari
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                  <li className="flex gap-2 items-center">
                    - List Equation of Time
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                  <li className="flex gap-2 items-center">
                    - List Koordinat Daerah
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                  <li className="flex gap-2 items-center">
                    - Rumus Perhitungan
                    <Link href={"#"}>
                      <ArrowUpRightSquare className="w-3 h-3" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Separator orientation="vertical" className="h-full" />
      <div className="w-full h-full px-5 pt-8">
        <div className="w-full border rounded-md px-5 py-3 relative">
          <div className="w-full flex justify-center">
            <Label className="absolute -top-2 px-3 bg-white">
              Waktu Sholat
            </Label>
          </div>
          <div className="grid grid-cols-4 xl:grid-cols-8 gap-4 pt-3">
            <CardWaktu label="Imsak" time={ikhtiyatiImsya} />
            <CardWaktu label="Subuh" time={ikhtiyatiSubuh} />
            <CardWaktu label="Terbit" time={ikhtiyatiTerbit} />
            <CardWaktu label="Dhuha" time={ikhtiyatiDhuha} />
            <CardWaktu label="Dzuhur" time={ikhtiyatiDzuhur} />
            <CardWaktu label="Ashar" time={ikhtiyatiAshar} />
            <CardWaktu label="Maghrib" time={ikhtiyatiMaghrib} />
            <CardWaktu label="Isya" time={ikhtiyatiIsya} />
          </div>
        </div>
        <div className="w-full h-[calc(100vh-322px)] xl:h-[calc(100vh-249px)] mt-8 border border-border px-4 pb-4 rounded-md relative">
          {isCalculate ? (
            <div className="flex w-full h-full  ">
              {isJawaban ? (
                <div className="flex w-full h-full flex-col pt-16 justify-center items-center">
                  <div className="absolute top-0 h-24 w-full z-10">
                    <div className="h-14 bg-white w-full flex justify-end items-center px-5">
                      <Button onClick={() => setIsJawaban(false)}>
                        <Minimize className="w-4 h-4 mr-2" />
                        Perkecil
                      </Button>
                    </div>
                    <div className="h-10 w-full bg-gradient-to-b from-white to-transparent" />
                  </div>
                  <ScrollArea className="h-[calc(100vh-(249px+80px))] w-full">
                    <div className="pt-6 w-full h-full flex flex-col">
                      <div className="flex sm:flex-row flex-col gap-8">
                        <CardValue
                          label="Lintang"
                          value={
                            lintangDaerahA +
                            " " +
                            lintangArray.find((item) => item.value === lintang)
                              ?.name
                          }
                        />
                        <CardValue
                          label="Bujur"
                          value={
                            bujurDaerahA +
                            " " +
                            bujurArray.find((item) => item.value === bujur)
                              ?.name
                          }
                        />
                        <CardValue
                          label="Bujur Waktu Daerah"
                          value={bujurWaktuDaerah}
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
                            = &#40;Bujur Tempat/Daerah&divide; Bujur Waktu
                            Daerah&#41; &divide; 15
                          </div>
                          <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                            = &#40;{bujurDaerah} - {bujurWaktuDaerah}&#41;
                            &divide; 15
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
                              = &#40;tan [lintang daerah &minus; deklinasi]&#41;
                              + 1
                            </div>
                            <div className="w-full flex py-2 mt-2 items-center px-8 text-start bg-zinc-100">
                              = &#40;tan [{lintangDaerah} &minus;{" "}
                              {deklinasiMatahari}
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
                          <CardValue
                            label="HDzuhur"
                            className="my-5"
                            value="-"
                          />
                          <CardValue
                            label="HAshar"
                            className="my-5"
                            value="Dengan Rumus"
                          />
                          <CardValue
                            label="HMaghrib"
                            className="my-5"
                            value="-1°"
                          />
                          <CardValue
                            label="HIsya"
                            className="my-5"
                            value="-18°"
                          />
                          <CardValue
                            label="HSubuh"
                            className="my-5"
                            value="-20°"
                          />
                          <CardValue
                            label="HImsa"
                            className="my-5"
                            value="10 Menit Sebelum Subuh"
                          />
                          <CardValue
                            label="HTerbit"
                            className="my-5"
                            value="-1°"
                          />
                          <CardValue
                            label="HDhuha"
                            className="my-5"
                            value="-4° 30'"
                          />
                        </CardValue>
                      </div>
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
                  </ScrollArea>
                </div>
              ) : (
                <div className="flex w-full h-full gap-y-3 flex-col justify-center items-center">
                  <Label>Cara & Rumus</Label>
                  <Button className="px-6" onClick={() => setIsJawaban(true)}>
                    <Expand className="w-4 h-4 mr-2" />
                    Perluas
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex w-full h-full gap-y-3 flex-col justify-center items-center">
              <Label className="text-lg opacity-50">
                Calculate first to show the answer.
              </Label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HisabWaktuShalatPage;
