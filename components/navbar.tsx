"use client";

import Link from "next/link";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import './navbar.css'; // Import the custom CSS file

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <nav className="sticky top-0 z-50 bg-gray-50 shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo or brand */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-700">
          ecommerce
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/checkout" className="nav-link">Checkout</Link>
        </div>

        {/* Cart and mobile menu button */}
        <div className="flex items-center space-x-4">
        <Link href="/checkout" className="relative">
          <ShoppingCartIcon className="h-6 w-6 text-gray-800 hover:text-gray-700" />
             {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-md">
             {cartCount}
              </span>
            )}
        </Link>

          <Button 
            variant="ghost" 
            className="md:hidden" 
            onClick={() => setMobileOpen(prev => !prev)}>
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="bg-gray-100">
          <ul className="flex flex-col py-2">
            <li>
              <Link href='/' className="nav-link-mobile">Home</Link>
            </li>
            <li>
              <Link href='/products' className="nav-link-mobile">Products</Link>
            </li>
            <li>
              <Link href='/checkout' className="nav-link-mobile">Checkout</Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};