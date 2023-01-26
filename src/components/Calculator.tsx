import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKey from "./CalculatorKey";
import { CalculatorContext } from "../context/CalculatorContext";

interface IProps extends ComponentPropsWithoutRef<"div"> {}

const Calculator: React.FC<IProps> = ({ ...divProps }) => {
  const [values, setValues] = useState({
    display: "0",
    operator: "",
    result: 0,
    waitingForOperand: false,
    lastOperand: "",
    lastOperator: "",
  });

  const handleInputDigit = (digit: string) => {
    let { display, waitingForOperand } = values;

    if (waitingForOperand) {
      setValues((prevValues) => ({
        ...prevValues,
        display: String(digit),
        waitingForOperand: false,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        display: display === "0" ? digit : display + digit,
      }));
    }
  };

  const handleDot = () => {
    let { display, waitingForOperand } = values;

    if (waitingForOperand) display = "0";

    if (!/\./.test(display)) {
      setValues((prevValues) => ({
        ...prevValues,
        display: display + ".",
        waitingForOperand: false,
      }));
    }
  };

  const handleOperation = (nextOperator: string) => {
    let { result, display, operator, waitingForOperand, lastOperand } = values;
    let newValues = { ...values };
    let operand = parseFloat(display);

    if (waitingForOperand && operator === nextOperator) return;

    if (waitingForOperand && nextOperator !== "=") {
      setValues({
        ...newValues,
        operator: nextOperator,
        lastOperator: nextOperator,
      });
      return;
    }

    if (waitingForOperand && nextOperator === "=")
      operand = parseFloat(lastOperand);

    if (result === 0) newValues = { ...newValues, result: operand };

    if (operator) {
      const previousResult = result || 0;

      switch (operator) {
        case "/":
          result = previousResult / operand;
          break;
        case "*":
          result = previousResult * operand;
          break;
        case "-":
          result = previousResult - operand;
          break;
        case "+":
          result = previousResult + operand;
          break;
      }

      if (nextOperator === "=")
        newValues = { ...newValues, lastOperand: String(operand) };

      newValues = {
        ...newValues,
        result,
        display: String(result),
      };
    }

    if (nextOperator !== "=")
      newValues = { ...newValues, operator: nextOperator };

    newValues = {
      ...newValues,
      waitingForOperand: true,
      lastOperator: nextOperator,
    };

    setValues({ ...newValues });
  };

  const handleClear = () => {
    const { display, lastOperator } = values;
    if (display === "0" || lastOperator === "=") {
      setValues({
        display: "0",
        operator: "",
        result: 0,
        waitingForOperand: false,
        lastOperand: "",
        lastOperator: "",
      });
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        display: "0",
        waitingForOperand: false,
      }));
    }
  };

  const handleSign = () => {
    const { display } = values;
    setValues((prevValues) => ({
      ...prevValues,
      display: String(+display * -1),
    }));
  };

  const handlePercent = () => {
    const { display } = values;
    const currentValue = parseFloat(display);

    if (currentValue === 0) return;

    setValues((prevValues) => ({
      ...prevValues,
      display: String(parseFloat((currentValue / 100).toFixed(6))),
    }));
  };

  const handleBackspace = () => {
    const { display, waitingForOperand } = values;

    if (waitingForOperand)
      setValues((prevValues) => ({
        ...prevValues,
        display: "0",
        waitingForOperand: true,
      }));
    else
      setValues((prevValues) => ({
        ...prevValues,
        display: waitingForOperand
          ? "0"
          : display.substring(0, display.length - 1) || "0",
      }));
  };

  const handleKeyPress: any = (event: KeyboardEvent) => {
    let key = event.key !== "Enter" ? event.key : "=";

    switch (key) {
      case "Backspace":
        handleBackspace();
        break;
      case "Escape":
        handleClear();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleInputDigit(key);
        break;
      case ".":
        handleDot();
        break;
      case "%":
        handlePercent();
        break;
      case "/":
      case "*":
      case "-":
      case "+":
      case "=":
        handleOperation(key);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <CalculatorContext.Provider value={values}>
      <div {...divProps} className="flex flex-col shadow-2xl transition-all">
        <CalculatorDisplay />
        <div className="flex flex-row h-[400px] text-center">
          <div className="flex flex-col w-[240px]">
            <div className="flex flex-row">
              <CalculatorKey
                color="light"
                label={values.display === "0" ? "AC" : "C"}
                onClick={handleClear}
              />
              <CalculatorKey color="light" label="±" onClick={handleSign} />
              <CalculatorKey color="light" label="%" onClick={handlePercent} />
            </div>
            <div className="flex flex-row flex-wrap-reverse">
              <CalculatorKey
                color="dark"
                label="0"
                className="!w-[150px] pl-8 text-left"
                onClick={() => {
                  handleInputDigit("0");
                }}
              />
              <CalculatorKey
                color="dark"
                label="."
                className="font-black"
                onClick={handleDot}
              />
              <CalculatorKey
                color="dark"
                label="1"
                onClick={() => {
                  handleInputDigit("1");
                }}
              />
              <CalculatorKey
                color="dark"
                label="2"
                onClick={() => {
                  handleInputDigit("2");
                }}
              />
              <CalculatorKey
                color="dark"
                label="3"
                onClick={() => {
                  handleInputDigit("3");
                }}
              />
              <CalculatorKey
                color="dark"
                label="4"
                onClick={() => {
                  handleInputDigit("4");
                }}
              />
              <CalculatorKey
                color="dark"
                label="5"
                onClick={() => {
                  handleInputDigit("5");
                }}
              />
              <CalculatorKey
                color="dark"
                label="6"
                onClick={() => {
                  handleInputDigit("6");
                }}
              />
              <CalculatorKey
                color="dark"
                label="7"
                onClick={() => {
                  handleInputDigit("7");
                }}
              />
              <CalculatorKey
                color="dark"
                label="8"
                onClick={() => {
                  handleInputDigit("8");
                }}
              />
              <CalculatorKey
                color="dark"
                label="9"
                onClick={() => {
                  handleInputDigit("9");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-[120px]">
            <CalculatorKey
              color="orange"
              label="÷"
              onClick={() => {
                handleOperation("/");
              }}
            />
            <CalculatorKey
              color="orange"
              label="×"
              onClick={() => {
                handleOperation("*");
              }}
            />
            <CalculatorKey
              color="orange"
              label="-"
              onClick={() => {
                handleOperation("-");
              }}
            />
            <CalculatorKey
              color="orange"
              label="+"
              onClick={() => {
                handleOperation("+");
              }}
            />
            <CalculatorKey
              color="orange"
              label="="
              onClick={() => {
                handleOperation("=");
              }}
            />
          </div>
        </div>
      </div>
    </CalculatorContext.Provider>
  );
};

export default Calculator;
