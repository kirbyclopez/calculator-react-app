import React, {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CalculatorContext } from "../context/CalculatorContext";

export interface IProps extends ComponentPropsWithoutRef<"div"> {}

const CalculatorDisplay: React.FC<IProps> = ({ ...divProps }) => {
  const { display } = useContext(CalculatorContext);
  const [scale, setScale] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const actualScale = 320 / ref.current.offsetWidth;
      if (scale !== actualScale) setScale(actualScale > 1 ? 1 : actualScale);
    }
  }, [display]);

  const numberWithCommas = (number: string) => {
    let values = number.split(".");

    values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return values.length > 1 ? `${values[0]}.${values[1]}` : values[0];
  };

  return (
    <div
      {...divProps}
      className="bg-black text-white w-[320px] h-[120px] p-2 flex"
    >
      <div
        className="h-fit text-right text-8xl self-center absolute right-0 origin-right px-[20px] transition-none"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={ref}
      >
        {numberWithCommas(display)}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
