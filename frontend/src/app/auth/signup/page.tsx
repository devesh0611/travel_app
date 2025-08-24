"use client";

import Link from "next/link";
import styles from "../../../styles/Auth.module.css";

export default function Signup() {
  return (
    <div
      className={styles.page}
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>Join TravelEase</h1>
        <p className={styles.subtitle}>
          Create an account and start exploring
        </p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
            required
          />

          <select className={styles.input} required>
            <option value="">Select Hall</option>
            <option value="SHR">SHR</option>
            <option value="GHR">GHR</option>
            <option value="RHR">RHR</option>
            <option value="SANGAM">SANGAM</option>
            <option value="BHR">BHR</option>
            <option value="MHR">MHR</option>
          </select>

          <select className={styles.input} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            required
          />

          <button type="submit" className={styles.primaryBtn}>
            Sign Up
          </button>
        </form>

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
