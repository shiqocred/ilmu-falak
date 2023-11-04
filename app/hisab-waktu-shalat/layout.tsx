import Navbar from "@/components/navbar";
import React from "react";

const PageAKDLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl sm:px-8 px-2 mx-auto relative">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default PageAKDLayout;
