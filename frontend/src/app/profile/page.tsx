"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    hall: "",
    gender: "",
    email: "",
    profilePic: "",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  // Fetch user info from backend using token
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // get token from login
      console.log(token);
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // send token to verify user
          },
        });

        if (res.ok) {
          const user = await res.json();
          setProfile(user);
          setTempProfile(user);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setProfile(tempProfile);
    setIsEditing(false);

    // Optional: send updated info to backend
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/account/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(tempProfile),
      });

      if (!res.ok) console.error("Failed to update profile");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfile({ ...tempProfile, profilePic: imageUrl });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={profile.profilePic || "/default-avatar.png"}
            alt=""
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500"
            />
            <input
              type="text"
              value={tempProfile.name}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, name: e.target.value })
              }
              className="w-full border rounded p-2"
              placeholder="Name"
            />
            <input
              type="text"
              value={tempProfile.hall}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, hall: e.target.value })
              }
              className="w-full border rounded p-2"
              placeholder="Hostel"
            />
            <input
              type="text"
              value={tempProfile.gender}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, gender: e.target.value })
              }
              className="w-full border rounded p-2"
              placeholder="Gender"
            />
          
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Hostel:</strong> {profile.hall}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
