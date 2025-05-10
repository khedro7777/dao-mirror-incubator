
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeHeader: React.FC = () => {
  const { direction } = useLanguage();

  return (
    <div className="mb-8 py-10 hero-gradient rounded-xl px-8 shadow-lg transform transition-transform hover:shadow-xl">
      <h1 className={cn("text-3xl md:text-4xl font-bold mb-4", direction === "rtl" ? "text-right" : "")}>
        <span className="gradient-text">Welcome to Mirror DAO</span>
      </h1>
      <p className={cn("text-gray-100 text-lg max-w-3xl leading-relaxed", direction === "rtl" ? "text-right" : "")}>
        A decentralized platform for group buying, funding, freelance contracts, and collaborative marketing
      </p>
    </div>
  );
};

export default WelcomeHeader;
