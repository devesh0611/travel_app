"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async() => {
    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }
 
    const token = localStorage.getItem("token"); // Get token from login
    if (!token) {
      setMessage("You must be logged in!");
      return;
    }

    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/account/change`, {
        method: "POST", // or POST depending on your backend
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password changed successfully!");
    // For now, just show success (replace with API call later)
   
    
    // Clear form
    setoldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }else {
        setMessage(data.message || "Failed to change password.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Enter Previous Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Enter New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && (
          <p className="mb-4 text-center text-sm text-red-500">{message}</p>
        )}

        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
