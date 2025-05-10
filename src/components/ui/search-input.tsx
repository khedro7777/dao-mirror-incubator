
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchInputProps) => {
  const { direction } = useLanguage();

  return (
    <div className="relative w-full">
      <Search 
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none", 
          direction === "rtl" ? "left-4" : "right-4"
        )} 
        size={18} 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full bg-card/60 border-primary/30 text-white focus-visible:ring-primary focus-visible:border-primary py-6",
          direction === "rtl" ? "pl-12 pr-4 text-right" : "pr-12 pl-4",
          className
        )}
      />
    </div>
  );
};

export default SearchInput;
