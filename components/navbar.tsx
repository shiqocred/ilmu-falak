"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full lg:py-5 py-3 px-3 sm:px-8 items-center border-b flex lg:justify-start justify-between">
      <Link href="/" className="z-10 cursor-default sm:cursor-pointer">
        <h1 className="font-bold text-sm">ARAHKIBLAT</h1>
      </Link>
      <div className="text-sm ml-8 lg:flex hidden gap-x-4">
        <Link
          href={"/arah-kiblat-daerah"}
          className={cn(
            "transition-all",
            pathname === "/arah-kiblat-daerah"
              ? "opacity-100 underline"
              : "opacity-70 hover:underline font-light"
          )}
        >
          Arah Kiblat Daerah
        </Link>
        <Link
          href={"/arah-kiblat-bayangan"}
          className={cn(
            "transition-all",
            pathname === "/arah-kiblat-bayangan"
              ? "opacity-100 underline"
              : "opacity-70 hover:underline font-light"
          )}
        >
          Arah Kiblat Bayangan
        </Link>
        <Link
          href={"/hisab-waktu-shalat"}
          className={cn(
            "transition-all",
            pathname === "/hisab-waktu-shalat"
              ? "opacity-100 underline"
              : "opacity-70 hover:underline font-light"
          )}
        >
          Hisab Waktu Shalat
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            className="flex lg:hidden cursor-default sm:cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"top"}>
          <SheetTitle className="text-center mb-4">Menu</SheetTitle>
          <div className="text-sm flex-col flex w-full gap-y-4">
            <Link
              href={"/arah-kiblat-daerah"}
              className={cn(
                "transition-all w-full h-10 rounded-md flex justify-center items-center cursor-default",
                pathname === "/arah-kiblat-daerah"
                  ? "opacity-100 text-white bg-zinc-800"
                  : "opacity-70"
              )}
            >
              Arah Kiblat Daerah
            </Link>
            <Link
              href={"/arah-kiblat-bayangan"}
              className={cn(
                "transition-all w-full h-10 rounded-md flex justify-center items-center cursor-default",
                pathname === "/arah-kiblat-bayangan"
                  ? "opacity-100 text-white bg-zinc-800"
                  : "opacity-70"
              )}
            >
              Arah Kiblat Bayangan
            </Link>
            <Link
              href={"/hisab-waktu-shalat"}
              className={cn(
                "transition-all w-full h-10 rounded-md flex justify-center items-center cursor-default",
                pathname === "/hisab-waktu-shalat"
                  ? "opacity-100 text-white bg-zinc-800"
                  : "opacity-70"
              )}
            >
              Hisab Waktu Shalat
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
