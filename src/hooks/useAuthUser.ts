import React from "react";
import { onAuthStateChanged, auth } from "@/firebase";

function useWindowResize(): any {
    const [hasUser, setHasUser] = React.useState(false);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setHasUser(true);
            } else {
                setHasUser(false);
            }
        });
    }, []);

    return { user: hasUser };
}
export default useWindowResize;
