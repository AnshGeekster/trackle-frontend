import Logout from "@/components/Logout";
import Link from "next/link";
import { Home, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* App Name */}
      <div className="text-2xl font-bold text-black">Trackle</div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link href="/user-dashboard" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Logout Button */}
      <Logout />
    </nav>
  );
};

export default Navbar;
