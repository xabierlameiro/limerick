import React from "react";
import styles from "@/styles/search.module.css";
import hash from "stable-hash";
import Image from "next/image";
import noImage600x600 from "public/no-image-600x600.jpg";

export const Card = ({
    listing,
    item,
    children,
    mapReference,
    display,
}: any) => {
    const [map, setMap] = React.useState<google.maps.Map>();
    const [a, b]: [number, number] = item.listing.point.coordinates;
    const [message, setMessage] = React.useState([""]);
    const [time, setTime] = React.useState("");
    const center = React.useMemo(() => {
        return { lat: b, lng: a };
    }, [a, b]);

    React.useEffect(() => {
        if (mapReference?.current && !map) {
            const map = new window.google.maps.Map(mapReference.current, {
                center,
                zoom: 12,
                panControl: false,
                scaleControl: false,
                rotateControl: false,
                scrollwheel: false,
                streetViewControl: false,
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
            });
            setMap(map);

            let directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            let directionsService = new google.maps.DirectionsService();

            const route: any = {
                origin: center,
                destination: {
                    lat: 52.65944817040037,
                    lng: -8.631464207693316,
                },
                travelMode: "WALKING",
            };

            directionsService.route(route, function (response, status) {
                // anonymous function to capture directions
                if (status !== "OK") {
                    return;
                } else {
                    directionsRenderer.setDirections(response); // Add route to the map
                    var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                    if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                    } else {
                        setMessage([
                            directionsData.distance.text,
                            directionsData.duration.text,
                        ]);
                    }
                }
            });
        }
    }, [mapReference, map, center]);

    var x = setInterval(function () {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = now - new Date(listing.publishDate).getTime();
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTime(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return (
        <div className={styles.card}>
            <Image
                className={`${styles.image} ${
                    !display ? styles.noDisplay : ""
                }`}
                src={
                    listing.media.totalImages > 0
                        ? listing.media.images?.[0].size600x600
                        : noImage600x600
                }
                alt={listing.title}
                fill
            />
            {children}
            <div>
                Walking distance is {message[0]} (<strong>{message[1]}</strong>)
            </div>
            <div> {listing.title}</div>
            <div>
                Price <strong>{listing.price}</strong>
            </div>
            <div>Id : {listing.id}</div>
            <div>Category : {listing.category}</div>
            {/* <div>
                Baths : {listing.numBathrooms ?? "No info"} | Room :{" "}
                {listing.numBedrooms}
            </div> */}
            <div>
                Publish date: {new Date(listing.publishDate).toLocaleString()}
            </div>
            <div>
                Time since publication: <strong>{time}</strong>
            </div>
        </div>
    );
};

export default Card;
