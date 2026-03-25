"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="bg-card border-b border-border py-4">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-logo text-2xl lg:text-3xl text-primary"
        >
          Spice & Soul
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Secure Checkout</span>
        </div>
      </div>
    </header>
  );
}
