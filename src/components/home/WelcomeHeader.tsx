
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeHeader: React.FC = () => {
  const { direction } = useLanguage();

  return (
    <div className="mb-8 py-6 bg-gradient-to-r from-sidebar to-sidebar-accent/30 rounded-lg px-6">
      <h1 className={cn("text-3xl font-bold text-white mb-2", direction === "rtl" ? "text-right" : "")}>
        Welcome to Mirror DAO
      </h1>
      <p className={cn("text-gray-300 text-lg", direction === "rtl" ? "text-right" : "")}>
        A decentralized platform for group buying, funding, freelance contracts, and collaborative marketing
      </p>
    </div>
  );
};

export default WelcomeHeader;
