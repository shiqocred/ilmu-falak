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
  bujurArray,
  bulanCollection,
  cn,
  convertCos,
  convertCotan,
  convertFromCos,
  convertFromTan,
  convertTan,
  convertToDecimal,
  convertToDerajat,
  getTrueValue,
  hariCollection,
  lintangArray,
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

  const [kiblatDerajat, setKiblatDerajat] = useState<string>("0");
  const [kiblatMenit, setKiblatMenit] = useState<string>("0");
  const [kiblatDetik, setKiblatDetik] = useState<string>("0");

  const [dekDerajat, setDekDerajat] = useState<string>("0");
  const [dekMenit, setDekMenit] = useState<string>("0");
  const [dekDetik, setDekDetik] = useState<string>("0");

  const [eqtDerajat, setEqtDerajat] = useState<string>("0");
  const [eqtMenit, setEqtMenit] = useState<string>("0");
  const [eqtDetik, setEqtDetik] = useState<string>("0");

  const [isEqtMinus, setIsEqtMinus] = useState(false);
  const [isDekMinus, setIsDekMinus] = useState(false);

  const [bwdDerajat, setBwdDerajat] = useState<string>("0");

  const [isJawaban, setIsJawaban] = useState<boolean>(false);

  const derajatKosong = `00° 00' 00"`;
  const jamKosong = `00j 00m 00d`;
  const clockKosong = `00:00:00`;

  const [hasilAz, setHasilAz] = useState<string>(derajatKosong);
  const [hasilA, setHasilA] = useState<string>(derajatKosong);
  const [hasilB, setHasilB] = useState<string>(derajatKosong);
  const [hasilMP, setHasilMP] = useState<string>(derajatKosong);
  const [hasilInter1, setHasilInter1] = useState<string>(derajatKosong);
  const [hasilInter, setHasilInter] = useState<string>(derajatKosong);
  const [hasilCotanP, setHasilCotanP] = useState<string>("0");
  const [hasilTanP, setHasilTanP] = useState<string>("0");
  const [derajatTanP, setDerajatTanP] = useState<string>(derajatKosong);
  const [hasilCosCP, setHasilCosCP] = useState<string>("0");
  const [hasilCP, setHasilCP] = useState<string>("0");
  const [hasilC, setHasilC] = useState<string>(derajatKosong);
  const [hasilCS15, setHasilCS15] = useState<string>(jamKosong);
  const [hasilBayangan, setHasilBayangan] = useState<string>(jamKosong);
  const [hasilJamBayangan, setHasilJamBayangan] = useState<string>(clockKosong);

  const lintangDaerah = `${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`;
  const bujurDaerah = `${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`;
  const arahKiblat = `${kiblatDerajat}° ${kiblatMenit}' ${kiblatDetik}"`;
  const deklinasiMatahari = `${
    isDekMinus ? "-" : ""
  }${dekDerajat}° ${dekMenit}' ${dekDetik}"`;
  const equationOfTime = `${
    isEqtMinus ? "-" : ""
  }${eqtDerajat}j ${eqtMenit}m ${eqtDetik}d`;
  const bujurWaktuDaerah = `${bwdDerajat}°`;
  const lintangKabah = `21° 25' 21,04"`;
  const bujurKabah = `39° 49' 34,4"`;
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
    } else if (p === "kiblat") {
      setKiblatDerajat(inputValue);
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
    } else if (p === "kiblat") {
      setKiblatMenit(inputValue);
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
    } else if (p === "kiblat") {
      setKiblatDetik(inputValue);
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
    setKiblatDerajat("0");
    setKiblatMenit("0");
    setKiblatDetik("0");
    setIsEqtMinus(false);
    setIsDekMinus(false);
  };

  const calculate = () => {
    let desDerKiblat = convertToDecimal(
      parseFloat(kiblatDerajat),
      parseFloat(kiblatMenit),
      parseFloat(kiblatDetik)
    );
    let desAz = 90 - desDerKiblat;
    let derAZ = convertToDerajat(desAz);
    setHasilAz(`${derAZ.derajat}° ${derAZ.menit}' ${derAZ.detik}"`);

    let desDeklimasi = convertToDecimal(
      parseFloat(dekDerajat),
      parseFloat(dekMenit),
      parseFloat(dekDetik)
    );
    let desA = 90 - (isDekMinus ? -desDeklimasi : desDeklimasi);
    let derA = convertToDerajat(desA);
    setHasilA(`${derA.derajat}° ${derA.menit}' ${derA.detik}"`);

    let desLintangDaerah = convertToDecimal(
      parseFloat(lintangDerajat),
      parseFloat(lintangMenit),
      parseFloat(lintangDetik)
    );
    let desB =
      90 -
      (lintang === "lintang selatan" ? -desLintangDaerah : desLintangDaerah);
    let derB = convertToDerajat(desB);
    setHasilB(`${derB.derajat}° ${derB.menit}' ${derB.detik}"`);

    let desEQT = convertToDecimal(
      parseFloat(eqtDerajat),
      parseFloat(eqtMenit),
      parseFloat(eqtDetik)
    );
    let desMP = 12 - (isEqtMinus ? -desEQT : desEQT);
    let derMP = convertToDerajat(desMP);
    setHasilMP(`${derMP.derajat}° ${derMP.menit}' ${derMP.detik}"`);

    let desBujurDaerah = convertToDecimal(
      parseFloat(bujurDerajat),
      parseFloat(bujurMenit),
      parseFloat(bujurDetik)
    );
    let inter1 =
      (bujur === "bujur barat" ? -desBujurDaerah : desBujurDaerah) - 105;
    let derI1 = convertToDerajat(inter1);
    setHasilInter1(`${derI1.derajat}° ${derI1.menit}' ${derI1.detik}"`);

    const desHasilInter = inter1 / 15;
    const derHI = convertToDerajat(desHasilInter);
    setHasilInter(`${derHI.derajat}° ${derHI.menit}' ${derHI.detik}"`);

    const resultCotanP = convertCos(desB) * convertTan(desAz);
    setHasilCotanP(`${parseFloat(resultCotanP.toFixed(9))}`);

    const resultTanP = getTrueValue(resultCotanP);
    setHasilTanP(`${parseFloat(resultTanP.toFixed(9))}`);

    const resultP = convertFromTan(resultTanP);
    const derRP = convertToDerajat(resultP);
    setDerajatTanP(`${derRP.derajat}° ${derRP.menit}' ${derRP.detik}"`);

    const resultCosCP =
      convertCotan(desA) * convertTan(desB) * convertCos(resultP);
    setHasilCosCP(`${parseFloat(resultCosCP.toFixed(9))}`);

    const resultDesCP = convertFromCos(resultCosCP);
    const derRDCP = convertToDerajat(resultDesCP);
    setHasilCP(`${derRDCP.derajat}° ${derRDCP.menit}' ${derRDCP.detik}"`);

    let desTotalC = resultDesCP + resultP;
    let derDTC = convertToDerajat(desTotalC);
    setHasilC(`${derDTC.derajat}° ${derDTC.menit}' ${derDTC.detik}"`);

    const resultDesC15 = desTotalC / 15;
    const derRDC15 = convertToDerajat(resultDesC15);
    setHasilCS15(`${derRDC15.derajat}° ${derRDC15.menit}' ${derRDC15.detik}"`);

    let desTotalBayangan = resultDesC15 + desMP - desHasilInter;
    let derDTB = convertToDerajat(desTotalBayangan);
    setHasilBayangan(`${derDTB.derajat}° ${derDTB.menit}' ${derDTB.detik}"`);
    setHasilJamBayangan(`${derDTB.derajat}:${derDTB.menit}:${derDTB.detik}`);
    setIsJawaban(true);
  };

  return (
    <div className="w-full h-full pb-20 pt-10 sm:py-32 flex flex-col justify-center items-center">
      <h1 className="font-semibold text-xl">Arah Kiblat Bayangan</h1>
      <div className="flex flex-col gap-y-8 w-full lg:w-[800px] items-center mt-4 border border-border p-8 overflow-hidden rounded-md">
        <div className="flex flex-col">
          <Label className="mb-2">Ka&apos;bah</Label>
          <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-8">
            <div className="flex gap-x-2 items-center">
              <div className="w-14 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-100"
                  value={"21"}
                  disabled
                  type="number"
                />
                °
              </div>
              <div className="w-12 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-100"
                  value={"25"}
                  disabled
                  type="number"
                />
                &apos;
              </div>
              <div className="w-20 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-100"
                  value={"21,04"}
                  disabled
                  type="text"
                />
                &quot;
              </div>
              <Button
                className="px-3 w-12 flex justify-center disabled:opacity-100"
                disabled
              >
                LU
              </Button>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="w-14 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-100"
                  value={"39"}
                  disabled
                  type="number"
                />
                °
              </div>
              <div className="w-12 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-100"
                  value={"49"}
                  disabled
                  type="number"
                />
                &apos;
              </div>
              <div className="w-20 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-100"
                  value={"34,4"}
                  disabled
                  type="text"
                />
                &quot;
              </div>
              <Button
                className="px-3 w-12 flex justify-center disabled:opacity-100"
                disabled
              >
                BT
              </Button>
            </div>
          </div>
        </div>
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
        <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-8">
          <div className="flex flex-col">
            <Label className="mb-2">Arah Kiblat</Label>
            <div className="flex gap-x-8">
              <div className="flex gap-x-2 items-center">
                <div className="w-14 flex border rounded-md box-content pr-1">
                  <Input
                    className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={kiblatDerajat}
                    onChange={(e) => handleChange(e, 3, "derajat", "kiblat")}
                    type="number"
                  />
                  °
                </div>
                <div className="w-12 flex border rounded-md box-content pr-1">
                  <Input
                    className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={kiblatMenit}
                    onChange={(e) => handleChange(e, 2, "menit", "kiblat")}
                    type="number"
                  />
                  &apos;
                </div>
                <div className="w-20 flex border rounded-md box-content pr-1">
                  <Input
                    className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={kiblatDetik}
                    onChange={(e) => handleChange(e, 5, "detik", "kiblat")}
                    type="number"
                  />
                  &quot;
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Bujur Waktu Daerah</Label>
            <div className="flex gap-x-8">
              <div className="flex gap-x-2 items-center">
                <div className="w-14 flex border rounded-md box-content pr-1">
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
        <div className="w-full flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[650px] pl-3 text-left font-normal")}
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
            <div className="sm:flex block mt-4">
              <p>- Ka&apos;bah</p>
              <div className="flex flex-col absolute sm:left-28 left-3">
                <p>= Lintang</p>
                <p>= Bujur</p>
              </div>
              <div className="flex flex-col absolute left-24 sm:left-52">
                <p>= {lintangKabah} LU</p>
                <p>= {bujurKabah} BT</p>
              </div>
            </div>
            <div className="sm:flex block mt-14 sm:mt-12">
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
              <p>- Arah Kiblat</p>
              <p className="absolute left-3 sm:left-52">= {arahKiblat}</p>
            </div>
            <div className="block sm:flex mt-8 sm:mt-5">
              <p>- Bujur Waktu Daerah</p>
              <p className="absolute left-3 sm:left-52">: {bujurWaktuDaerah}</p>
            </div>
            <Separator className="mt-10 mb-5" />
            <p>Unsur:</p>
            <div className="flex mt-3">
              <p>Az</p>
              <p className="absolute left-20">: 90° - Arah kiblat</p>
            </div>
            <div className="flex">
              <p className="opacity-0">Az</p>
              <p className="absolute left-20">: 90° - {arahKiblat}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">Az</p>
              <p className="absolute left-20">: {hasilAz}</p>
            </div>
            <div className="flex mt-3">
              <p>a</p>
              <p className="absolute left-20">: 90 - Deklinasi Matahari</p>
            </div>
            <div className="flex">
              <p className="opacity-0">a</p>
              <p className="absolute left-20">: 90 - {deklinasiMatahari}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">a</p>
              <p className="absolute left-20">: {hasilA}</p>
            </div>
            <div className="flex mt-3">
              <p>b</p>
              <p className="absolute left-20">: 90 - Lintang Tempat/Daerah</p>
            </div>
            <div className="flex">
              <p className="opacity-0">b</p>
              <p className="absolute left-20">
                : 90 -{" "}
                {lintang === "lintang utara"
                  ? lintangDaerah
                  : `(-${lintangDaerah})`}
              </p>
            </div>
            <div className="flex">
              <p className="opacity-0">b</p>
              <p className="absolute left-20">: {hasilB}</p>
            </div>
            <div className="flex mt-3">
              <p>MP</p>
              <p className="absolute left-20">: 12j - Equation of Time</p>
            </div>
            <div className="flex">
              <p className="opacity-0">MP</p>
              <p className="absolute left-20">: 12j - {equationOfTime}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">MP</p>
              <p className="absolute left-20">: {hasilMP}</p>
            </div>
            <div className="flex mt-3">
              <p>Inter</p>
              <p className="absolute flex left-20">
                : &#40;Bujur Tempat/Daerah&nbsp;
                <span className="hidden sm:flex">
                  &divide; Bujur Waktu Daerah&#41; &divide; 15
                </span>
              </p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-20">
                &divide; Bujur Waktu Daerah&#41; &divide; 15
              </p>
            </div>
            <div className="flex">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-20">
                : &#40;{bujurDaerah} - {bujurWaktuDaerah}&#41; &divide; 15
              </p>
            </div>
            <div className="flex">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-20">
                : &#40;{hasilInter1}&#41; &divide; 15
              </p>
            </div>
            <div className="flex">
              <p className="opacity-0">Inter</p>
              <p className="absolute left-20">: {hasilInter}</p>
            </div>
            <Separator className="my-5" />
            <p>Perhitungan:</p>
            <div className="flex mt-3">
              <p>cotan P</p>
              <p className="absolute left-24">: cos b &times; tan Az</p>
            </div>
            <div className="flex">
              <p className="opacity-0">cotan P</p>
              <p className="absolute flex left-24">
                : cos {hasilB}&nbsp;
                <span className="hidden sm:flex">&times; tan {hasilAz}</span>
              </p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">cotan P</p>
              <p className="absolute left-24">&times; tan {hasilAz}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">cotan P</p>
              <p className="absolute left-24">: {hasilCotanP}</p>
            </div>
            <div className="flex mt-5">
              <p>tan P</p>
              <p className="absolute left-24">: {hasilTanP}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">tan P</p>
              <p className="absolute left-24">: {derajatTanP}</p>
            </div>
            <div className="flex mt-5">
              <p>cos (C - P)</p>
              <p className="absolute left-24">
                : cotan a &times; tan b &times; cos P
              </p>
            </div>
            <div className="flex">
              <p className="opacity-0">tan P</p>
              <p className="absolute flex left-24">
                : cotan {hasilA}&nbsp;
                <span className="hidden sm:flex">&times; tan {hasilB}</span>
                &nbsp;
                <span className="hidden sm:flex">
                  &times; cos {derajatTanP}
                </span>
              </p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">tan P</p>
              <p className="absolute left-24">&times; tan {hasilB} </p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">tan P</p>
              <p className="absolute left-24">&times; cos {derajatTanP}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">tan P</p>
              <p className="absolute left-24">: {hasilCosCP}</p>
            </div>
            <div className="flex mt-5">
              <p>(C - P)</p>
              <p className="absolute left-24">: {hasilCP}</p>
            </div>
            <div className="flex mt-5">
              <p>C</p>
              <p className="absolute left-24">: (C - P) + P</p>
            </div>
            <div className="flex">
              <p className="opacity-0">C</p>
              <p className="absolute flex left-24">
                : {hasilCP}&nbsp;
                <span className="hidden sm:flex">+ {derajatTanP}</span>
              </p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">C</p>
              <p className="absolute left-24">+ {derajatTanP}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">C</p>
              <p className="absolute left-24">: {hasilC}</p>
            </div>
            <div className="flex mt-5">
              <p>C : 15</p>
              <p className="absolute left-24">: {hasilCS15}</p>
            </div>
            <div className="flex mt-5">
              <p>Bayangan</p>
              <p className="absolute left-24">: hasil C : 15 + MP - Inter</p>
            </div>
            <div className="flex">
              <p className="opacity-0">Bayangan</p>
              <p className="absolute flex left-24">
                : {hasilCS15}&nbsp;
                <span className="hidden sm:flex">+ {hasilMP}</span>&nbsp;
                <span className="hidden sm:flex">- {hasilInter}</span>
              </p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">Bayangan</p>
              <p className="absolute left-24">+ {hasilMP}</p>
            </div>
            <div className="flex sm:hidden">
              <p className="opacity-0">Bayangan</p>
              <p className="absolute left-24">- {hasilInter}</p>
            </div>
            <div className="flex">
              <p className="opacity-0">Bayangan</p>
              <p className="absolute left-24">: {hasilBayangan}</p>
            </div>
            <Separator className="my-3" />
            <p>
              Jadi, Bayangan Arah Kiblat daerah anda pada {triggerTanggal}{" "}
              adalah&nbsp;
            </p>
            <p>
              <span className="font-bold text-sm">{hasilBayangan}</span>
              &nbsp;atau&nbsp;
              <span className="font-bold text-sm">{hasilJamBayangan}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KiblatBayanganPage;
