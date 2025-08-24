"use client";

import Link from "next/link";
import styles from "./../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.page} style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.brand}>TravelEase</span>
        </h1>
        <p className={styles.subtitle}>
          Your hassle-free travel companion. <br /> Plan. Book. Enjoy. ✈️
        </p>

        <div className={styles.buttonContainer}>
          <Link href="/auth/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
          <Link href="/auth/signup">
            <button className={styles.signupBtn}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
