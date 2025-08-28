"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TravelCard from "../components/TravelCard";

type TravelPlan = {
  id: number;
  destination: string;
  date: string;
  status: string;
};



export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPlans, setCurrentPlans] = useState<TravelPlan[]>([]);

  const router = useRouter();

  // Load user's current plans from localStorage
  useEffect(() => {
    const storedPlans = localStorage.getItem("currentPlans");
    if (storedPlans) {
      setCurrentPlans(JSON.parse(storedPlans));
    }
  }, []);

  // Past trips
  const pastPlans : TravelPlan[] = [
    { id: 1, destination: "Goa", date: "Jan 15 - Jan 20, 2024", status: "Completed" },
    { id: 2, destination: "Manali", date: "Feb 5 - Feb 10, 2024", status: "Completed" },
  ];

  // Recommendations from other users
  const recommendations = [
    { id: 101, destination: "Jaipur", date: "Sept 5 - Sept 9, 2025", postedBy: "Amit" },
    { id: 102, destination: "Kerala", date: "Oct 12 - Oct 18, 2025", postedBy: "Neha" },
    { id: 103, destination: "Leh-Ladakh", date: "Nov 1 - Nov 10, 2025", postedBy: "Rahul" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <div className="p-6 mt-16">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Create Travel Plan Button */}
        <button
          onClick={() => router.push("/new_travel")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-8"
        >
          Create New Travel Plan
        </button>

        {/* Current Travel Plans */}
        <h2 className="text-xl font-semibold mb-4">Your Current Plans</h2>
        {currentPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {currentPlans.map(plan => (
              <TravelCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-8">You don't have any current plans yet.</p>
        )}

        {/* Past Travel Plans */}
        <h2 className="text-xl font-semibold mb-4">Your Past Travel Plans</h2>
        {pastPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {pastPlans.map(plan => (
              <TravelCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-8">You don't have any past trips yet.</p>
        )}

        {/* Recommendations */}
      <h2 className="text-xl font-semibold mb-4">Join Other Travelers</h2>
{recommendations.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {recommendations.map(rec => (
     <TravelCard
  key={rec.id}
  plan={{
    id: rec.id, // Pass the ID
    destination: rec.destination,
    date: rec.date,
    status: `Posted by ${rec.postedBy}`,
  }}
  
/>

    ))}
  </div>
) : (
  <p className="text-gray-500">No recommendations available at the moment.</p>
)}

      </div>
    </div>
  );
}
