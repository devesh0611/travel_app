"use client";

import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="bg-white bg-opacity-90 rounded-xl p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 p-3 rounded hover:bg-gray-100 transition"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
