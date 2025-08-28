"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sapna Vishwakarma",
    hostel: "Hostel A",
    gender: "Female",
    email: "sapna@example.com",
    bio: "Hello! I'm an M.Tech student at IIT.",
    profilePic: "",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
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
              value={tempProfile.hostel}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, hostel: e.target.value })
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
            <input
              type="email"
              value={tempProfile.email}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, email: e.target.value })
              }
              className="w-full border rounded p-2"
              placeholder="Email"
            />
            <textarea
              value={tempProfile.bio}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, bio: e.target.value })
              }
              className="w-full border rounded p-2"
              placeholder="Bio"
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
            <p><strong>Hostel:</strong> {profile.hostel}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>

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
