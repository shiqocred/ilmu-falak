import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl sm:px-8 px-2 mx-auto relative">
      <div className="flex w-full justify-center h-screen absolute top-0 items-center">
        <div className="h-4 w-4 absolute top-24 left-44 bg-zinc-700 rounded-sm rotate-45 animate-up-down" />
        <div className="h-4 w-4 absolute top-40 right-40 bg-zinc-500 rounded-sm rotate-45 animate-up-down" />
        <div className="h-4 w-4 absolute bottom-60 left-[500px] bg-zinc-600 rounded-sm rotate-45 animate-up-down" />
        <div>
          <h1 className="text-7xl text-center font-bold">ILMU FALAK</h1>
          <h3 className="text-lg text-center font-medium">
            BUSINESS LAW CENTRE UIN SUNAN KALIJAGA YOGYAKARTA
          </h3>
          <p className="mt-8 max-w-2xl text-center font-light text-zinc-500">
            Official website of Business Law Centre UIN Suka Yogyakarta for
            calculate the direction of the Qibla.
          </p>
          <div className="flex justify-center items-center mt-8 gap-x-4">
            <Link
              href={"/arah-kiblat-daerah"}
              className={buttonVariants({ variant: "default" })}
            >
              Arah Kiblat Daerah
            </Link>
            <Link
              href={"/arah-kiblat-bayangan"}
              className={buttonVariants({ variant: "default" })}
            >
              Arah Kiblat Bayangan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
