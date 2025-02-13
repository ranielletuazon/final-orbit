import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../components/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import styles from './css/Space.module.css';
import { set } from "firebase/database";
import valorant from '../assets/tejo.png'

import Header from '../components/Header';

export default function Space({ user }: { user: any }) {

    interface UserData{
        username: string,
        id: string,
        email?: string;
        emailConsent?: boolean;
    }
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);

    const [completeLoad, setCompleteLoad] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading((prev) => !prev);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
                auth.signOut()
            ),{
                loading: 'Logging out...',
                success: 'Successfully logged out!',
                error: 'An error occured while logging out. Please try again.'
            }
        )
    }

    // Check if this code still important?
    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth.currentUser) return; // Ensure user is authenticated

            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data() as UserData;
                setCurrentUser(userData);

                // Check if the emailConsent field exists
                if (userData.emailConsent === undefined || userData.emailConsent === false) {
                    // Redirect to /setup if emailConsent does not exist or is false
                    navigate("/setup");
                }
            } else {
                console.log("No such document!");
            }
        };
        fetchUserData();
        setCompleteLoad(false);
    }, [navigate]);
    
    return(
        <>
            <div className={styles.container}>
                <div className={styles.page}>
                    <div className={styles.pageContainer}>
                        <Header logout={() => handleLogout()} user={user} />
                        <div className={styles.main}>
                            <div className={styles.mainHeader}>
                                <div className={styles.intro}>Welcome back, <span style={{color: "white"}}>{currentUser?.username?.toUpperCase()}</span></div>
                                <div className={styles.sideButtons}>
                                    <button className="fa-solid fa-bell"></button>
                                    <button className="fa-solid fa-comment-dots"></button>
                                </div>
                            </div>
                            <div className={styles.gameSection}>
                                <div className={styles.popular}>
                                    <img src={valorant} alt="Valorant" className={styles.popularImage} />
                                    <div className={styles.popularSection}>
                                        <div className={styles.popularTag}>
                                            <i className="fa-solid fa-fire"></i>
                                            Popular
                                        </div>
                                    </div>
                                    <div className={styles.popularTitle}>
                                        <div className={styles.gameTitle}>Valorant</div>
                                    </div>
                                    <div className={styles.descriptionSection}>
                                        <div className={styles.description}>Valorant is an online multiplayer computer game, produced by Riot Games. It is a first-person shooter game, consisting of two teams of five, where one team attacks and the other defends. Players control characters known as 'agents', who all have different abilities to use during gameplay.</div>
                                    </div>
                                    <div className={styles.playersSection}>
                                        <div className={styles.playerCircles}>
                                            <div className={styles.player}></div>
                                            <div className={styles.player} style={{marginLeft: "-2rem"}}></div>
                                            <div className={styles.player} style={{marginLeft: "-2rem"}}></div>
                                        </div>
                                        <div className={styles.playersInfo}> +85 more looking for Valorant</div>
                                    </div>
                                </div>
                                <div className={styles.box}>
                                    <div className={styles.sampleline}></div>
                                    <div className={styles.sampleline}></div>
                                    <div className={styles.sampleline}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Header logout={() => handleLogout()}/>
                    {!completeLoad ? (
                        <>
                            <div className={styles.header}></div>
                        </>
                    ) : (
                        <>
                            Loading...
                        </>
                    )} */}
                </div>
            </div>
        </>
    );
}