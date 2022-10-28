import styles from "./header.module.css";
import Link from "next/link";
import React from "react";
import {
    signInWithPopup,
    provider,
    signOut,
    setPersistence,
    auth,
    browserLocalPersistence,
} from "@/firebase";
import useAuthUser from "@/hooks/useAuthUser";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { toast } from "react-toastify";

const Header = () => {
    const { user } = useAuthUser();

    return (
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <ul>
                    <li>
                        <Link href="/" title="Go to home page">
                            &#127968;
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" title="Go to search page">
                            &#128269;
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.login}>
                {!user && (
                    <MdOutlineLogin
                        className={styles.loginIcon}
                        onClick={() =>
                            setPersistence(auth, browserLocalPersistence)
                                .then(() => {
                                    return signInWithPopup(auth, provider)
                                        .then((result) => {
                                            const user = result.user;
                                            if (
                                                user.email !==
                                                "xabier.lameiro@gmail.com"
                                            ) {
                                                signOut(auth)
                                                    .then(() => {
                                                        toast.error(
                                                            "Only Xabier Lameiro can login to this application!",
                                                            {
                                                                position:
                                                                    "top-center",
                                                                autoClose: 5000,
                                                            }
                                                        );
                                                    })
                                                    .catch((error) => {
                                                        toast.error(
                                                            error.message,
                                                            {
                                                                position:
                                                                    "top-center",
                                                            }
                                                        );
                                                    });
                                            }
                                        })
                                        .catch((error) => {
                                            signOut(auth).catch(() => {
                                                toast.error(error.message, {
                                                    position: "top-center",
                                                });
                                            });
                                        });
                                })
                                .catch((error) => {
                                    toast.error(error.message, {
                                        position: "top-center",
                                    });
                                })
                        }
                    />
                )}
                {user && (
                    <>
                        <span>Hi, Xabier</span>
                        <MdOutlineLogout
                            className={styles.loginIcon}
                            onClick={() =>
                                signOut(auth)
                                    .then(() => {})
                                    .catch((error) => {})
                            }
                        />
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
