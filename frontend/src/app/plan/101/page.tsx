"use client";

import { useParams, useRouter } from "next/navigation";

export default function PlanDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // For now, use static data (later replace with API call)
  const plan = {
    bookedBy: "Amit",
    source: "Delhi",
    destination: "Jaipur",
    date: "2025-08-25",
    time: "10:00 AM",
    people: 1,
    rideDetails: "Car - WagonR",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Plan Details</h1>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>Booked By:</strong> {plan.bookedBy}</p>
        <p><strong>Source:</strong> {plan.source}</p>
        <p><strong>Destination:</strong> {plan.destination}</p>
        <p><strong>Date:</strong> {plan.date}</p>
        <p><strong>Time:</strong> {plan.time}</p>
        <p><strong>No. of People:</strong> {plan.people}</p>
        <p><strong>Ride Details:</strong> {plan.rideDetails}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => alert("Chat feature coming soon!")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Chat with {plan.bookedBy}
        </button>

        <button
          onClick={() => alert("Join request sent!")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Request to Join
        </button>
      </div>
    </div>
  );
}
