import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <header className="w-full px-8 py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logotyp */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          Bostad
        </Link>

        {/* Navigering */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `text-sm transition-colors hover:text-black ${
                isActive ? "text-black" : "text-gray-500"
              }`
            }
          >
            Annonser
          </NavLink>

          <Link
            to="/login"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Logga in
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
