"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParam } from "@/hooks/use-search-params";

export const SearchInput = () => {
  const [search,setSearch]= useSearchParam();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form  onSubmit={handleSubmit}  className="relative max-w-[720px] w-full">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.15)] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
        />
        {value && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-0 h-auto hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <XIcon size={18} className="text-neutral-600" />
          </Button>
        )}
        <Button
          type="submit"
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-0 h-auto hover:bg-transparent focus:bg-transparent active:bg-transparent"
        >
          <SearchIcon size={18} className="text-neutral-600" />
        </Button>
      </form>
    </div>
  );
};