import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Engagement } from "@/utils/types";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

interface SearchBarProps {
  setFilteredItems: (filteredItems: Engagement[]) => void;
  engagements: Engagement[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  setFilteredItems,
  engagements,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredItems = engagements.filter((engagement) =>
        engagement.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredItems(filteredItems);
    } else {
      setFilteredItems(engagements);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};
