import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      setNavLinks([
        { label: "Restauranger", href: "/restaurants" },
        { label: "Hem", href: "/user" }
      ]);
    } else {
      setNavLinks([
        { label: "Restauranger", href: "/restaurants" },
        { label: "Logga in", href: "/sign-in" },
        { label: "Skapa konto", href: "/sign-up" },
      ]);
    }
  }, []);

  return (
    <header className="w-full flex justify-between items-center py-4 px-8 sm:px-16 bg-gray-800 shadow-md">
      <Link href="/" className="text-2xl font-bold text-white hover:opacity-80">
        Dine & Flush
      </Link>
      <nav className="flex gap-6">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-gray-300 hover:text-blue-400"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;