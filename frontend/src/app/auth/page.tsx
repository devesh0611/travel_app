import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    >
      <div className="text-center px-6">
        <h1 className="text-6xl font-extrabold mb-4 animate-pulse">
          TravelEase
        </h1>
        <p className="text-xl mb-8 max-w-xl mx-auto">
          Your hassle-free travel companion. Book rides, plan trips, and connect with fellow travelers effortlessly.
        </p>

        <div className="flex justify-center gap-6">
          <Link href="/auth/login">
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100 transition shadow-lg">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="px-8 py-3 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-800 transition shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
