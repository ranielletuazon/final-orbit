import styles from "./css/Home.module.css";
import logo from '../assets/orbitlogo.png';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Home(){

    const [user, setUser] = useState(null);

    return(
        <>
            <div className={styles.container}>
                <div className={styles.page}>
                    <div className={styles.header}>
                        <img src={logo} alt="Orbit Logo" className={styles.logo}/>
                        <Link to="/login" className={styles.loginButton}>Login</Link>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentHead}>EXPLORE AND FIND YOUR IDEAL TEAM</div>
                        <div className={styles.contentBody}>Orbit will help you find your preferred team-mate, friend, and community to achieve your best expectation in your game. Comes with own space to chat, chill and hang-out.</div>
                    </div>
                </div>
            </div>
        </>
    );
}