"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/Auth.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    hall: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...payload } = formData;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Signup successful!");
      } else {
        const errorData = await res.json();
        alert("Signup failed: " + errorData.message);
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
        <h1 className={styles.title}>Join TravelEase</h1>
        <p className={styles.subtitle}>Create an account and start exploring</p>

        <div className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />

          <select
            name="hall"
            value={formData.hall}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select Hall</option>
            <option value="SHR">SHR</option>
            <option value="GHR">GHR</option>
            <option value="RHR">RHR</option>
            <option value="SANGAM">SANGAM</option>
            <option value="BHR">BHR</option>
            <option value="MHR">MHR</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
          />

          <button onClick={handleSubmit} className={styles.primaryBtn}>
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-gray-700">
          Already have an account?{" "}
          <Link href="/auth/login" className={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
