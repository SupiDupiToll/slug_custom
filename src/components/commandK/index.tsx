"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

// Pages:
import { Pages } from "./items";

const CommandK = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleRoutePush = async (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const handleExternalRoute = (href: string) => {
    window.open(href, "_blank");
    setOpen(false);
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <span className="material-symbols-outlined text-lg">search</span>
        <span className="sr-only">Open Command Search Dialog</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="General">
            {Pages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => handleRoutePush(page.href)}
              >
                <span className="material-symbols-outlined text-lg">
                  {page.icon}
                </span>
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandK;
