interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
}

const Navbar = ({ links }: NavbarProps) => {
  return (
    <header className="w-full flex justify-between items-center py-4 px-8 sm:px-16 bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-white">Dine & Flush</h1>
      <nav className="flex gap-6">
        {links.map((link, index) => (
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
