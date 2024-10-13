import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto w-screen relative">
      <div className="flex w-full justify-center h-screen absolute px-4 md:px-8 top-0 items-center">
        <div className="h-4 w-4 absolute top-10 left-14 sm:top-24 sm:left-44 bg-zinc-700 rounded-sm rotate-45 animate-up-down" />
        <div className="h-4 w-4 absolute top-20 right-20 sm:top-40 sm:right-40 bg-zinc-500 rounded-sm rotate-45 animate-up-down" />
        <div className="h-4 w-4 absolute bottom-28 left-28 sm:bottom-60 sm:left-[500px] bg-zinc-600 rounded-sm rotate-45 animate-up-down" />
        <div>
          <h1 className="sm:text-7xl text-4xl text-center font-bold">
            ILMU FALAK
          </h1>
          <h3 className="sm:text-lg text-sm text-center font-medium">
            SHIQOCRED INCORPORATE BETTER FUTURE TECHNOLOGY SOLUTIONS
          </h3>
          <p className="mt-8 max-w-2xl sm:text-base text-sm text-center font-light text-zinc-500">
            Official website of Shiqocred inc for calculate the direction of the
            Qibla.
          </p>
          <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-center items-center mt-8 gap-x-4">
            <Link
              href={"/hisab-arah-kiblat"}
              className={buttonVariants({ variant: "default" })}
            >
              Arah Kiblat Daerah
            </Link>
            <Link
              href={"/hisab-bayangan-kiblat"}
              className={buttonVariants({ variant: "default" })}
            >
              Arah Kiblat Bayangan
            </Link>
            <Link
              href={"/hisab-waktu-shalat"}
              className={buttonVariants({ variant: "default" })}
            >
              Hisab Waktu Shalat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
