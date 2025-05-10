
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeHeader: React.FC = () => {
  const { direction } = useLanguage();

  return (
    <div className="mb-8 py-10 bg-gradient-to-r from-primary/20 via-secondary/30 to-sidebar/80 rounded-xl px-8 shadow-lg transform transition-all hover:shadow-xl border border-primary/10 backdrop-blur-sm">
      <h1 className={cn("text-3xl md:text-4xl font-bold mb-4", direction === "rtl" ? "text-right" : "")}>
        <span className="gradient-text">Mirror DAO</span>
      </h1>
      <p className={cn("text-gray-100 text-lg max-w-3xl leading-relaxed", direction === "rtl" ? "text-right" : "")}>
        A decentralized platform for group buying, funding, freelance contracts, and collaborative marketing
      </p>
    </div>
  );
};

export default WelcomeHeader;
