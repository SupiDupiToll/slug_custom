"use client";

import { Input } from "@/ui/input";
import { cn } from "@/utils";
import MaterialIcon from "@/components/icons/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchLinksProps {
  className?: string;
}

const SearchLinks = (props: SearchLinksProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set("search", e.target.value);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div className={cn("relative", props.className)}>
      <MaterialIcon
        name="search"
        size={16}
        className="absolute left-2 top-1/2 -translate-y-1/2 transform text-slate-400"
      />
      <Input
        type="search"
        autoComplete="off"
        placeholder="Search links"
        className="pl-8"
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
};

export default SearchLinks;
