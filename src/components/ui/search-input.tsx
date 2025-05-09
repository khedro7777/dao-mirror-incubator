
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
    <div className="relative">
      <Search 
        className={cn(
          "absolute top-3 text-gray-400 pointer-events-none", 
          direction === "rtl" ? "left-3" : "right-3"
        )} 
        size={18} 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "pl-4 pr-10 py-2 w-full bg-card/80 border-primary/30 text-white focus-visible:ring-primary",
          direction === "rtl" ? "pr-4 pl-10 text-right" : "",
          className
        )}
      />
    </div>
  );
};

export default SearchInput;
