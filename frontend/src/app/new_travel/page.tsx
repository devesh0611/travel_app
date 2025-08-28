"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTravelPlan() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    people: "",
    vehicle: "",
    rideDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPlan = {
      id: Date.now(),
      source: formData.source,
      destination: formData.destination,
      date: `${formData.date} at ${formData.time}`,
      people: formData.people,
      vehicle: formData.vehicle,
      rideDetails: formData.rideDetails,
      status: "Upcoming",
    };

    if (typeof window !== "undefined") {
      const existingPlans = JSON.parse(localStorage.getItem("pastPlans") || "[]");
      existingPlans.push(newPlan);
      localStorage.setItem("pastPlans", JSON.stringify(existingPlans));
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Travel Plan</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Source */}
          <div>
            <label className="block text-gray-700 mb-1">Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Enter source location"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Enter destination"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* No. of People */}
          <div>
            <label className="block text-gray-700 mb-1">No. of People</label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Enter number of people"
            />
          </div>

          {/* Vehicle Details (Optional) */}
          <div>
            <label className="block text-gray-700 mb-1">Vehicle Details (Optional)</label>
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Vehicle type, plate number, etc."
            />
          </div>

          {/* Ride Details (Optional) */}
          <div>
            <label className="block text-gray-700 mb-1">Ride Details (Optional)</label>
            <input
              type="text"
              name="rideDetails"
              value={formData.rideDetails}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Driver name, additional info"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Plan
          </button>
        </form>
      </div>
    </div>
  );
}
