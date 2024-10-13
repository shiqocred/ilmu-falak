import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const CardValue = ({
  label,
  value,
  className,
  classLabel,
  children,
}: {
  label: string;
  value?: string;
  className?: string;
  classLabel?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full relative border px-5 py-3 rounded-md text-sm transition-all",
        className
      )}
    >
      <Label
        className={cn(
          "absolute -top-3 bg-white px-3 py-1 rounded transition-all",
          classLabel
        )}
      >
        {label}
      </Label>
      {!children ? (
        <div className="w-full flex py-2 mt-2 items-center justify-center bg-zinc-100">
          {value}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default CardValue;
