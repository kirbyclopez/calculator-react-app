import React, { ComponentPropsWithoutRef, useContext } from "react";
import { CalculatorContext } from "../context/CalculatorContext";

export interface IProps extends ComponentPropsWithoutRef<"div"> {
  color: "light" | "dark" | "orange";
  label: string;
  className?: string;
}

const CalculatorKey: React.FC<IProps> = ({
  color,
  label,
  className,
  ...divProps
}) => {
  const { lastOperator } = useContext(CalculatorContext);
  let customColor = "bg-gray-100/75 active:bg-gray-100 text-black";

  if (color === "dark")
    customColor = "bg-gray-100/[0.2] active:bg-gray-100/[0.4] text-white";
  else if (color === "orange")
    customColor =
      (lastOperator === label && lastOperator !== "="
        ? "bg-amber-400"
        : "bg-amber-500") + " active:bg-amber-400 text-white";

  return (
    <div
      {...divProps}
      className={`cursor-pointer h-[70px] leading-[70px] m-[5px] border-0 rounded-full ease-out duration-200 w-[70px] ${customColor} ${
        className ? className : ""
      }`}
    >
      {label}
    </div>
  );
};

export default CalculatorKey;
