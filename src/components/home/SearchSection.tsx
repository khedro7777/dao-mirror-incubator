
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
    <section className="mb-6">
      <div className="mb-4">
        <SearchInput
          placeholder="Search contracts, projects, or opportunities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-full"
        />
      </div>
    </section>
  );
};

export default SearchSection;
