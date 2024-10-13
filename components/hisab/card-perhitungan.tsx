import CardValue from "./card-value";

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

export default CardPerhitungan;
