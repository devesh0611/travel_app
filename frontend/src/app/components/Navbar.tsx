import { FaUserCircle } from "react-icons/fa";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-lg z-50 flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold">Travel Planner</h1>
      <button onClick={toggleSidebar}>
        <FaUserCircle size={30} />
      </button>
    </nav>
  );
}
