import { Label } from "../ui/label";

const CardWaktu = ({ label, time }: { label: string; time: string }) => {
  return (
    <div className="flex col-span-1 w-full flex-col gap-2">
      <Label>{label}</Label>
      <div className="w-full py-2 text-center text-sm rounded-sm bg-zinc-100">
        {time}
      </div>
    </div>
  );
};

export default CardWaktu;
