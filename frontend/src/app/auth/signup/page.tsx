"use client";

import { useState } from "react";

const halls = ["SHR", "GHR", "SANGAM", "BHR", "MHR", "RHR"];
const genders = ["MALE", "FEMALE", "OTHER"];

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    hall: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation logic here
    console.log(form);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white bg-opacity-90 rounded-xl p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="hall"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Hall</option>
            {halls.map((hall) => (
              <option key={hall} value={hall}>
                {hall}
              </option>
            ))}
          </select>

          <select
            name="gender"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            minLength={8}
            maxLength={12}
            pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$"
            title="Password must be 8-12 chars, include 1 number & 1 special char"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
