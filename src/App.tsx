import React from "react";
import Calculator from "./components/Calculator";

const App: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center min-h-[530px]">
      <div className="w-[330px] h-[530px] p-[5px] relative bg-black font-light text-3xl">
        <Calculator />
      </div>
    </div>
  );
};

export default App;
