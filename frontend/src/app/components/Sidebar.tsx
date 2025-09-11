"use client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("Logged out")// Remove the token
    router.push("../"); // Redirect to landing page
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <ul className="space-y-4">
          <li>
              <button
                onClick={() => router.push("/profile")}
                className=" hover:text-green-600 cursor-pointer "
              >
                View Profile
              </button>
          </li>
       
          <li> 
            <button 
            onClick={() =>router.push("/change_psw")}
              className="hover:text-blue-600 cursor-pointer">
                Change Password
                </button>
                </li>
          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => router.push("/help-centre")}
          >
            Help Center
          </li>      
          
          <li
            className="hover:text-yellow-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
      <button
        className="absolute top-4 right-4 text-gray-500"
        onClick={toggleSidebar}
      >
        ✕
      </button>
    </div>
  );
}
