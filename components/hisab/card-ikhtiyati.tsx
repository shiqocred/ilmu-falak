import CardValue from "./card-value";

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

export default CardIkhtiyati;
