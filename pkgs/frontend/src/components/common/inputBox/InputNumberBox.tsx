import { ChangeEvent } from "react";

type Props = {
  leftHeader: string;
  right: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * InputNumberBox Component
 * @param param0 
 * @returns 
 */
export default function InputNumberBox({
  leftHeader,
  right,
  value,
  onChange,
}: Props) {
  return (
    <div className="w-3/4 h-auto flex flex-col mx-auto my-10 p-0 md:p-4 rounded-lg relative overflow-hidden border-2 border-gray-500">
      <div className="flex justify-between text-white">
        <div>
          <p className="text-sm text-left"> 
            {leftHeader} 
          </p>
          <input
            className="w-70 h-12 text-lg bg-gray-900 text-white border-0 focus:outline-none"
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={"Plaese enter"}
          />
        </div>
        <div className="flex items-center justify-center text-2xl font-bold">
          {right}
        </div>
      </div>
    </div>
  );
}