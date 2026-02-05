"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Mediterranean Magic", href: "/products/mediterranean-magic" },
      { label: "Smoky BBQ Rub", href: "/products/smoky-bbq-rub" },
      { label: "Asian Fusion", href: "/products/asian-fusion" },
      { label: "Tuscan Herb Blend", href: "/products/tuscan-herb" },
      { label: "Everything Bagel", href: "/products/everything-bagel" },
      { label: "Moroccan Ras el Hanout", href: "/products/moroccan-blend" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Gift Sets", href: "/gift-sets" },
  { label: "Subscribe & Save", href: "/subscribe" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll to add background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a nav item is active based on current path
  const isActive = (href: string, children?: { href: string }[]) => {
    if (pathname === href) return true;
    if (children) {
      return children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"));
    }
    return pathname.startsWith(href + "/");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
        <span className="text-heading">
          FREE SAMPLE WITH EVERY ORDER | FREE SHIPPING OVER $35
        </span>
      </div>

      {/* Main Header */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? "bg-primary/50 backdrop-blur-sm shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-logo text-3xl text-primary">
                      Spice & Soul
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-8 flex flex-col gap-4">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <div className="ml-4 mt-2 flex flex-col gap-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex items-center gap-1 -ml-4">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger 
                            variant="transparent"
                            className={`text-heading font-semibold hover:text-accent data-[state=open]:text-accent relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full data-[state=open]:after:w-full ${
                              isActive(item.href, item.children)
                                ? "text-accent after:w-full"
                                : "text-white after:w-0"
                            }`}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-2 p-4 w-48">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      className="block py-2 px-3 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild variant="transparent">
                          <Link
                            href={item.href}
                            className={`px-4 py-2 text-heading font-semibold hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                              isActive(item.href)
                                ? "text-accent after:w-full"
                                : "text-white after:w-0"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Logo - Center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-logo text-3xl lg:text-4xl text-white"
            >
              Spice & Soul
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/subscribe"
                className="hidden md:block text-sm text-heading font-semibold text-white hover:text-white/80 transition-colors"
              >
                Subscribe & Save
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/10"
                asChild
              >
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
