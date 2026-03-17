"use client";

import { handleSignOut } from "@/server/actions/auth";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import MaterialIcon from "@/components/icons/material";
import { toast } from "sonner";

export function SignOut() {
  const iconSize = 15;

  const handleLogout = () => {
    toast.promise(handleSignOut(), {
      loading: "Signing out...",
      success: "Signed out.",
      error: "Failed to sign out. Please try again.",
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <MaterialIcon name="logout" size={iconSize} />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
