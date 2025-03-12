import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navItems } from "@/app/constant";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import Logout from "./Logout";


const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const user = useAppSelector((state) => state.user);
  console.log(user)

 

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={"/logo.png"} alt="Logo" />
            <span className="text-xl tracking-tight">Trackle</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {user.isAuthenticated ? (
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <span>Welcome, {user.name}</span>
              <Logout />
            </div>
          ) : (
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <Link href={"/login"} className="py-2 px-3 border rounded-md">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
