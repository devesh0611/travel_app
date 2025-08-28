"use client";

import { useRouter } from "next/navigation";

interface TravelPlan {
  id: number; // Add unique ID for each plan
  destination: string;
  date: string;
  status: string;
}

export default function TravelCard({ plan }: { plan: TravelPlan }) {
  const isRecommendation = plan.status.startsWith("Posted by");
  const router = useRouter();

  const handleViewPlan = () => {
    router.push(`/plan/${plan.id}`); // Redirect to dynamic route
  };

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{plan.destination}</h3>
      <p className="text-gray-600">{plan.date}</p>

      <span
        className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
          plan.status === "Completed"
            ? "bg-green-100 text-green-700"
            : plan.status === "Upcoming"
            ? "bg-yellow-100 text-yellow-700"
            : plan.status.startsWith("Posted by")
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {plan.status}
      </span>

      {isRecommendation && (
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleViewPlan}
        >
          View plan details
        </button>
      )}
    </div>
  );
}
