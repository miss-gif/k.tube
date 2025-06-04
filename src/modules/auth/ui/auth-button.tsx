"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

export default function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <SignUpButton mode="modal">
            <Button
              variant={"outline"}
              className="rounded-full border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
            >
              <UserCircleIcon />
              Sign in
            </Button>
          </SignUpButton>
        </SignInButton>
      </SignedOut>
    </>
  );
}
