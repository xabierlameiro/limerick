import React from "react";

const Delayed = ({ children, index }: any) => {
    const [isShown, setIsShown] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsShown(true);
        }, index * 2000);
        return () => clearTimeout(timer);
    }, [index]);
    return isShown ? children : null;
};

export default Delayed;
