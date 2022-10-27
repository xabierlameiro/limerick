import styles from "./header.module.css";
import Link from "next/link";
import React from "react";
import {
    signInWithPopup,
    provider,
    GoogleAuthProvider,
    signOut,
    setPersistence,
    auth,
    browserLocalPersistence,
} from "@/firebase";
import useAuthUser from "@/hooks/useAuthUser";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";

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
                        <Link
                            href="/rip-limerick"
                            title="Go to rip limerick post"
                        >
                            &#128214;
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" title="Go to search page">
                            &#128269;
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                {!user && (
                    <MdOutlineLogin
                        className={styles.loginIcon}
                        onClick={() =>
                            setPersistence(auth, browserLocalPersistence)
                                .then(() => {
                                    // Existing and future Auth states are now persisted in the current
                                    // session only. Closing the window would clear any existing state even
                                    // if a user forgets to sign out.
                                    // ...
                                    // New sign-in will be persisted with session persistence.
                                    return signInWithPopup(auth, provider)
                                        .then((result) => {
                                            // This gives you a Google Access Token. You can use it to access the Google API.
                                            const credential =
                                                GoogleAuthProvider.credentialFromResult(
                                                    result
                                                );
                                            const token =
                                                credential?.accessToken;
                                            // The signed-in user info.
                                            const user = result.user;
                                            debugger;
                                            if (
                                                user.email !==
                                                "xabier.lameiro@gmail.com"
                                            ) {
                                                throw new Error(
                                                    "Solo se permite el login a Xabier Lameiro"
                                                );
                                            }
                                        })
                                        .catch((error) => {
                                            signOut(auth)
                                                .then(() => {
                                                    console.log(
                                                        "usuario des-logueado"
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.log(
                                                        "error al des-loguear el usuario",
                                                        error
                                                    );
                                                });
                                        });
                                })
                                .catch((error) => {
                                    // Handle Errors here.
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                })
                        }
                    />
                )}
                {user && (
                    <MdOutlineLogout
                        className={styles.loginIcon}
                        onClick={() =>
                            signOut(auth)
                                .then(() => {
                                    console.log("usuario des-logueado");
                                })
                                .catch((error) => {
                                    console.log(
                                        "error al des-loguear el usuario",
                                        error
                                    );
                                })
                        }
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
