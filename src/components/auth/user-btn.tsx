import { buttonVariants } from "@/ui/button";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import Avatar from "boring-avatars";
import UserMenu from "./user-menu";
import { SignOut } from "./sign-out";
import MaterialIcon from "@/components/icons/material";
import Link from "next/link";

export default async function UserButton() {
  const session = await auth();

  if (!session?.user)
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
          className: "group",
        })}
      >
        <span>Admin Login</span>
        <MaterialIcon
          name="arrow_forward"
          size={16}
          className="ml-2 transform transition-transform group-hover:translate-x-[2px]"
        />
      </Link>
    );

  if (session?.user) {
    const avatarSeed =
      session.user.name ??
      session.user.email ??
      session.user.username ??
      session.user.id ??
      "User";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            name={session.user.name ?? "User Menu"}
            aria-label="User menu"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
          >
            <Avatar size={22} name={avatarSeed} variant="beam" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name ?? session.user.username ?? "User"}
              </p>
              <p className="text-xs leading-none text-neutral-400">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UserMenu />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
}
