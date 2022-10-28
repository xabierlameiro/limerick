import React from "react";

const TimeCounter = ({ publishDate }: { publishDate: Date }) => {
    const [time, setTime] = React.useState("");

    setInterval(function () {
        var now = new Date().getTime();
        var distance = now - new Date(publishDate).getTime();
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTime(
            `${days != 0 ? `${days}d` : ""} ${hours}h ${minutes}m ${seconds}s`
        );
    }, 1000);

    return (
        <>
            Time since publication: <strong>{time}</strong>
        </>
    );
};

export default TimeCounter;
