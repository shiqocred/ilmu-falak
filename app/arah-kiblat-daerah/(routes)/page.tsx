"use client";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  cn,
  convertCos,
  convertCotan,
  convertFromTan,
  convertSin,
  convertToDecimal,
  convertToDerajat,
  convertToDetik,
  convertToMenit,
  getTrueValue,
} from "@/lib/utils";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { useState } from "react";

const lintangArray = [
  { name: "LU", value: "lintang utara" },
  { name: "LS", value: "lintang selatan" },
];
const bujurArray = [
  { name: "BB", value: "bujur barat" },
  { name: "BT", value: "bujur timur" },
];

const KiblatDaerahPage = () => {
  const [lintang, setLintang] = useState<string>("lintang utara");
  const [bujur, setBujur] = useState<string>("bujur barat");

  const [lintangDerajat, setLintangDerajat] = useState<string>("0");
  const [lintangMenit, setLintangMenit] = useState<string>("0");
  const [lintangDetik, setLintangDetik] = useState<string>("0");

  const [bujurDerajat, setBujurDerajat] = useState<string>("0");
  const [bujurMenit, setBujurMenit] = useState<string>("0");
  const [bujurDetik, setBujurDetik] = useState<string>("0");

  const derajatKosong = `00° 00' 00"`;

  const [hasilA, setHasilA] = useState<string>(derajatKosong);
  const hasilB = `68° 34' 38,96"`;
  const [hasilC, setHasilC] = useState<string>(derajatKosong);

  const [desimalCotanB, setDesimalCotanB] = useState<string>("0");
  const [derajatCotanB, setDerajatCotanB] = useState<string>("0");
  const [desimalTanB, setDesimalTanB] = useState<string>("0");
  const [derajatTanB, setDerajatTanB] = useState<string>("0");
  const [desimalUB, setDesimalUB] = useState<string>("0");
  const [derajatUB, setDerajatUB] = useState<string>("0");
  const [derajatBU, setDerajatBU] = useState<string>("0");

  const [isJawaban, setIsJawaban] = useState<boolean>(false);

  // handle
  const handleDerajat = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxLength: number,
    pos: "derajat" | "menit" | "detik",
    p: "lintang" | "bujur"
  ) => {
    let inputValue = e.target.value;

    if (pos === "derajat") {
      if (inputValue.length > maxLength) {
        const truncatedValueDerajat = inputValue.slice(0, maxLength);

        if (parseFloat(truncatedValueDerajat) > 360) {
          p === "lintang" ? setLintangDerajat("360") : setBujurDerajat("360");
        } else {
          p === "lintang"
            ? setLintangDerajat(truncatedValueDerajat)
            : setBujurDerajat(truncatedValueDerajat);
        }
      } else {
        if (parseFloat(inputValue) > 360) {
          p === "lintang" ? setLintangDerajat("360") : setBujurDerajat("360");
        } else {
          p === "lintang"
            ? setLintangDerajat(inputValue)
            : setBujurDerajat(inputValue);
        }
      }
    } else if (pos === "menit") {
      if (inputValue.length > maxLength) {
        const truncatedValueMenit = inputValue.slice(0, maxLength);

        if (parseFloat(truncatedValueMenit) > 60) {
          p === "lintang" ? setLintangMenit("60") : setBujurMenit("60");
        } else {
          p === "lintang"
            ? setLintangMenit(truncatedValueMenit)
            : setBujurMenit(truncatedValueMenit);
        }
      }

      if (parseFloat(inputValue) > 60) {
        p === "lintang" ? setLintangMenit("60") : setBujurMenit("60");
      } else {
        p === "lintang"
          ? setLintangMenit(inputValue)
          : setBujurMenit(inputValue);
      }
    } else {
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
        p === "lintang" ? setLintangDetik("60") : setBujurDetik("60");
      }
      p === "lintang" ? setLintangDetik(inputValue) : setBujurDetik(inputValue);
    }
  };

  // data
  const lintangDaerah = `${lintangDerajat}° ${lintangMenit}' ${lintangDetik}"`;
  const bujurDaerah = `${bujurDerajat}° ${bujurMenit}' ${bujurDetik}"`;
  const lintangKabah = `21° 25' 21,04"`;
  const bujurKabah = `39° 49' 34,4"`;

  // ----------------------------------------------------------------
  // .
  // reset data
  // .
  // ----------------------------------------------------------------
  const resetValue = () => {
    setIsJawaban(false);
    setBujurDerajat("0");
    setBujurMenit("0");
    setBujurDetik("0");
    setLintangDerajat("0");
    setLintangMenit("0");
    setLintangDetik("0");
  };

  // ----------------------------------------------------------------
  // .
  // calculate
  // .
  // ----------------------------------------------------------------
  const calculate = () => {
    // hasil a
    let a1 =
      90 -
      (lintang === "lintang utara"
        ? parseFloat(lintangDerajat)
        : -parseFloat(lintangDerajat));
    let a2 =
      0 -
      (lintang === "lintang utara"
        ? parseFloat(lintangMenit)
        : -parseFloat(lintangMenit));
    let a3 =
      0 -
      (lintang === "lintang utara"
        ? parseFloat(lintangDetik)
        : -parseFloat(lintangDetik));

    if (a3 < 0) {
      a2 -= 1;
      a3 += 60;
    }

    if (a2 < 0) {
      a1 -= 1;
      a2 += 60;
    }

    setHasilA(`${a1}° ${a2}' ${parseFloat(a3.toFixed(2))}"`);

    // hasil c
    let c1 =
      bujur === "bujur timur"
        ? parseFloat(bujurDerajat) - 39
        : parseFloat(`-${bujurDetik}`) - 39;
    let c2 =
      bujur === "bujur timur"
        ? parseFloat(bujurMenit) - 49
        : parseFloat(`-${bujurDetik}`) - 49;
    let c3 =
      bujur === "bujur timur"
        ? parseFloat(bujurDetik) - 34.4
        : parseFloat(`-${bujurDetik}`) - 34.4;

    if (c3 < 0) {
      c2 -= 1;
      c3 += 60;
    }

    if (c2 < 0) {
      c1 -= 1;
      c2 += 60;
    }

    setHasilC(`${c1}° ${c2}' ${parseFloat(c3.toFixed(2))}"`);

    const desimalA = convertToDecimal(a1, a2, a3);
    const desimalB = convertToDecimal(68, 34, 38.96);
    const desimalC = convertToDecimal(c1, c2, c3);

    const sinA = convertSin(parseFloat(desimalA));
    const cotanB = convertCotan(parseFloat(desimalB));
    const sinC = convertSin(parseFloat(desimalC));
    const cosA = convertCos(parseFloat(desimalA));
    const cotanC = convertCotan(parseFloat(desimalC));

    const desCotanB = ((sinA * cotanB) / sinC - cosA * cotanC).toFixed(9);
    setDesimalCotanB(desCotanB);

    const derCotanB = `${convertToDerajat(Number(desCotanB))}° ${convertToMenit(
      Number(desCotanB)
    )}' ${convertToDetik(Number(desCotanB)).toFixed(2)}"`;
    setDerajatCotanB(derCotanB);

    const desTanB = getTrueValue(Number(desCotanB)).toFixed(9);
    setDesimalTanB(desTanB);

    const derTanB = `${convertToDerajat(Number(desTanB))}° ${convertToMenit(
      Number(desTanB)
    )}' ${convertToDetik(Number(desTanB)).toFixed(2)}"`;
    setDerajatTanB(derTanB);

    const desB = convertFromTan(parseFloat(desTanB)).toFixed(9);
    setDesimalUB(desB);

    const derUB = `${convertToDerajat(Number(desB))}° ${convertToMenit(
      Number(desB)
    )}' ${convertToDetik(Number(desB)).toFixed(2)}"`;
    setDerajatUB(derUB);

    let bU1 = 90 - convertToDerajat(parseFloat(desB));
    let bU2 = 0 - convertToMenit(parseFloat(desB));
    let bU3 = 0 - convertToDetik(parseFloat(desB));

    if (bU3 < 0) {
      bU2 -= 1;
      bU3 += 60;
    }

    if (bU2 < 0) {
      bU1 -= 1;
      bU2 += 60;
    }

    const derBU = `${bU1}° ${bU2}' ${bU3.toFixed(2)}"`;
    setDerajatBU(derBU);
    setIsJawaban(true);
  };
  return (
    <div className="w-full h-full py-10 sm:py-32 flex flex-col justify-center items-center">
      <h1 className="font-semibold text-xl">Arah Kiblat Daerah</h1>
      <div className="flex flex-col gap-y-8 w-full lg:w-[800px] mt-4 items-center border border-border p-8 overflow-hidden rounded-md">
        <div className="flex flex-col">
          <Label className="mb-2">Ka&apos;bah</Label>
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-8">
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
                className="px-3 w-14 flex justify-center disabled:opacity-100"
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
                className="px-3  w-14 flex justify-center disabled:opacity-100"
                disabled
              >
                BT
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="mb-2">Koordinator Daerah/Tempat</Label>
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-8">
            <div className="flex gap-x-2 items-center">
              <div className="w-14 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={lintangDerajat}
                  onChange={(e) => handleDerajat(e, 3, "derajat", "lintang")}
                  type="number"
                />
                °
              </div>
              <div className="w-12 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={lintangMenit}
                  onChange={(e) => handleDerajat(e, 2, "menit", "lintang")}
                  type="number"
                />
                &apos;
              </div>
              <div className="w-20 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={lintangDetik}
                  onChange={(e) => handleDerajat(e, 5, "detik", "lintang")}
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
                  onChange={(e) => handleDerajat(e, 3, "derajat", "bujur")}
                  type="number"
                />
                °
              </div>
              <div className="w-12 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={bujurMenit}
                  onChange={(e) => handleDerajat(e, 2, "menit", "bujur")}
                  type="number"
                />
                &apos;
              </div>
              <div className="w-20 flex border rounded-md box-content pr-1">
                <Input
                  className="w-full border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={bujurDetik}
                  onChange={(e) => handleDerajat(e, 5, "detik", "bujur")}
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
            <div className="sm:flex block mt-16 sm:mt-12">
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
            <Separator className="mt-16" />
            <p className="mt-3">Unsur:</p>
            <div className="sm:flex block">
              <p>
                a = 90° -{" "}
                {lintang === "lintang utara"
                  ? lintangDaerah
                  : `(- ${lintangDaerah})`}{" "}
              </p>
              <p className="absolute left-3.5 sm:left-72">= {hasilA}</p>
            </div>
            <div className="sm:flex block mt-7 sm:mt-0">
              <p>b = 90° - {lintangKabah}</p>
              <p className="absolute left-3.5 sm:left-72">= {hasilB}</p>
            </div>
            <div className="sm:flex block mt-7 sm:mt-0">
              <p>
                c = {bujurDaerah} - {bujurKabah}
              </p>
              <p className="absolute left-3.5 sm:left-72">= {hasilC}</p>
            </div>
            <Separator className="mt-10 sm:mt-3" />
            <p className="mt-3">Perhitungan:</p>
            <div className="sm:flex block">
              <p>- cotan B</p>
              <p className="absolute left-3 sm:left-20 flex">
                = sin a &times; cotan b &divide; sin c &minus; cos a{" "}
                <span className="sm:flex hidden">&times; cotan c</span>
              </p>
            </div>
            <div className="sm:hidden block">
              <p className="opacity-0">- cotan B</p>
              <p className="absolute left-3 sm:left-20">&times; cotan c</p>
            </div>
            <div className="flex mt-7 sm:mt-0">
              <p className="opacity-0">- cotan B</p>
              <p className="absolute left-3 sm:left-20 flex">
                = sin {hasilA} &times; cotan {hasilB}&nbsp;
                <span className="sm:flex hidden">
                  &divide; sin {hasilC} &minus; cos {hasilA}
                </span>
              </p>
            </div>
            <div className="sm:hidden flex">
              <p className="opacity-0">- cotan B</p>
              <p className="absolute left-3 sm:left-20">
                &divide; sin {hasilC} &minus; cos {hasilA}
              </p>
            </div>
            <div className="flex">
              <p className="opacity-0">- cotan B</p>
              <p className="absolute left-3 sm:left-20">
                &times; cotan {hasilC}
              </p>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <p className="opacity-0">- cotan B</p>
              <p className="absolute left-3 sm:left-20">= {desimalCotanB}</p>
            </div>
            <div className="flex mt-1 sm:mt-0">
              <p className="opacity-0">- cotan B</p>
              <p className="absolute left-3 sm:left-20">= {derajatCotanB}</p>
            </div>
            <div className="sm:flex block mt-5">
              <p>- tan B</p>
              <p className="absolute left-3 sm:left-20">= {desimalTanB}</p>
            </div>
            <div className="flex mt-7 sm:mt-0">
              <p className="opacity-0">- tan B</p>
              <p className="absolute left-3 sm:left-20">= {derajatTanB}</p>
            </div>
            <div className="sm:flex block mt-5">
              <p>- B</p>
              <p className="absolute left-3 sm:left-20">= {desimalUB}</p>
            </div>
            <div className="flex mt-7 sm:mt-0">
              <p className="opacity-0">B</p>
              <p className="absolute left-3 sm:left-20">
                = {derajatUB} (U - B)
              </p>
            </div>
            <div className="flex mt-1">
              <p className="opacity-0">B</p>
              <p className="absolute left-3 sm:left-20">
                = {derajatBU} (B - U)
              </p>
            </div>
            <Separator className="my-3" />
            <p>Jadi, Arah Kiblat daerah anda adalah</p>
            <p className="ml-0 sm:ml-10">
              = <span className="font-bold text-sm">{derajatUB}</span> dari
              titik Utara (sejati) ke arah Barat atau
            </p>
            <p className="ml-0 sm:ml-10">
              = <span className="font-bold text-sm">{derajatBU}</span> dari
              titik Barat ke arah Utara
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KiblatDaerahPage;
