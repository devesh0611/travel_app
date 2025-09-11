"use client";



import { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/Auth.module.css";
import { useRouter } from "next/navigation";


export default function Login() {

   const router = useRouter();

  // 1️⃣ State to store form input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2️⃣ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        // 3️⃣ Store token/session if needed
        localStorage.setItem("token", data.token); // for auth
         localStorage.setItem("user", JSON.stringify(data.user));  // for profile info
        alert("Login successful!");
        
        router.push("../dashboard"); // redirect to homepage or dashboard
      } else {
        const errorData = await res.json();
        alert("Login failed: " + errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className={styles.page} style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back 👋</h1>
        <p className={styles.subtitle}>Log in to continue your journey</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input  type="email" 
          name="email"
          placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            className={styles.input} />

          <input type="password"
          name="password"
          placeholder="Password"
            value={formData.password}
            onChange={handleChange} 
            className={styles.input} />

          <button type="submit"
            className={styles.primaryBtn}>Login</button>
        </form>

        <p className="mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
