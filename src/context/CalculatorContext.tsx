import { createContext } from "react";

export const CalculatorContext = createContext({
  display: "0",
  lastOperator: "",
});
