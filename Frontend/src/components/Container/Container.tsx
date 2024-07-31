import React from "react";
import Header from "../Header/Header";
interface Props {
  children: React.ReactNode;
}
function Container({ children }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-7 items-center">
      <Header />
      {children}
    </div>
  );
}

export default Container;
