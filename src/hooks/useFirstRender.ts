import React from "react";

const useFirstRender = () => {
    const ref = React.useRef(true);
    const firstRender = ref.current;
    ref.current = false;

    return { firstRender };
};

export default useFirstRender;
