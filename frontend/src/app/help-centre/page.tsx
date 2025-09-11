"use client";

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">
          Welcome to the Help Center! Here you can find FAQs, guides, and contact support.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>How to update your profile</li>
          <li>Changing your password</li>
          <li>Contact support via email: support@example.com</li>
        </ul>
      </div>
    </div>
  );
}
