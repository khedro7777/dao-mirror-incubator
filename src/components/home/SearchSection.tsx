
import React from "react";
import SearchInput from "@/components/ui/search-input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, setSearchQuery }) => {
  const { direction } = useLanguage();

  return (
    <section className="mb-8">
      <div className="relative">
        <SearchInput
          placeholder="Search contracts, projects, or opportunities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-full shadow-md focus-within:shadow-lg transition-shadow"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-sm bg-primary/20 hover:bg-primary/30 px-2 py-1 rounded-md transition-colors"
            style={{ right: direction === "rtl" ? "auto" : "12px", left: direction === "rtl" ? "12px" : "auto" }}
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
