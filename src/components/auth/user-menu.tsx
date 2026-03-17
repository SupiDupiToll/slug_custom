"use client";

import { DropdownMenuItem } from "@/ui/dropdown-menu";
import MaterialIcon from "@/components/icons/material";
import Link from "next/link";

const UserMenu = () => {
  const iconSize = 15;

  return (
    <>
      <DropdownMenuItem asChild>
        <Link href="/">
          <MaterialIcon name="home" size={iconSize} />
          <span>Home</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard">
          <MaterialIcon name="space_dashboard" size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings">
          <MaterialIcon name="settings" size={iconSize} />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link
          href="https://github.com/pheralb/slug/issues/new/choose"
          target="_blank"
        >
          <div className="flex items-center space-x-3">
            <MaterialIcon name="bug_report" size={iconSize} />
            <span>Report a bug</span>
          </div>
          <MaterialIcon
            name="arrow_outward"
            size={iconSize}
            className="opacity-40"
          />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link href="https://twitter.com/pheralb_" target="_blank">
          <div className="flex items-center space-x-3">
            <MaterialIcon name="public" size={iconSize} />
            <span>Contact</span>
          </div>
          <MaterialIcon
            name="arrow_outward"
            size={iconSize}
            className="opacity-40"
          />
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default UserMenu;
