"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full py-5 items-center border-b flex justify-start">
      <Link href="/" className="z-10">
        <h1 className="font-bold text-sm">ARAHKIBLAT</h1>
      </Link>
      <div className="text-sm ml-8 flex gap-x-4">
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
      </div>
    </div>
  );
};

export default Navbar;
