"use client";

import Link from "next/link";
import styles from "../../../styles/Auth.module.css";

export default function Login() {
  return (
    <div className={styles.page} style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back 👋</h1>
        <p className={styles.subtitle}>Log in to continue your journey</p>

        <form className="space-y-6">
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.primaryBtn}>Login</button>
        </form>

        <p className="mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
