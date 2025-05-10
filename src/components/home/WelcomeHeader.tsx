
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeHeader: React.FC = () => {
  const { direction } = useLanguage();

  return (
    <div className="mb-8 py-8 bg-gradient-to-r from-sidebar to-sidebar-accent/50 rounded-xl px-6 shadow-lg">
      <h1 className={cn("text-3xl md:text-4xl font-bold mb-3", direction === "rtl" ? "text-right" : "")}>
        <span className="gradient-text">Welcome to Mirror DAO</span>
      </h1>
      <p className={cn("text-gray-300 text-lg max-w-3xl", direction === "rtl" ? "text-right" : "")}>
        A decentralized platform for group buying, funding, freelance contracts, and collaborative marketing
      </p>
    </div>
  );
};

export default WelcomeHeader;
