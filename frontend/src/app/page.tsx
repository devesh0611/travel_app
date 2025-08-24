import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* White card content */}
      <div className="relative z-10 bg-white bg-opacity-80 p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full mx-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">TravelEase</span>
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Your hassle-free travel companion. Plan. Book. Enjoy.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/auth/login">
            <button className="px-8 py-3 border border-gray-400 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
