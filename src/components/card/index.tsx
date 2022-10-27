import React from "react";
import styles from "@/styles/search.module.css";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
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
    const [message, setMessage] = React.useState("");
    const center = { lat: b, lng: a };

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

            const route = {
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
                        setMessage(
                            " Walking distance is " +
                                directionsData.distance.text +
                                " (" +
                                directionsData.duration.text +
                                ")."
                        );
                    }
                }
            });
        }
    }, [mapReference, map, center]);

    const deepCompareEqualsForMaps = createCustomEqual(
        (deepEqual) => (a: any, b: any) => {
            if (
                isLatLngLiteral(a) ||
                a instanceof google.maps.LatLng ||
                isLatLngLiteral(b) ||
                b instanceof google.maps.LatLng
            ) {
                return new google.maps.LatLng(a).equals(
                    new google.maps.LatLng(b)
                );
            }

            // TODO extend to other types

            // use fast-equals for other objects
            return deepEqual(a, b);
        }
    );

    function useDeepCompareMemoize(value: any) {
        const ref = React.useRef();

        if (!deepCompareEqualsForMaps(value, ref.current)) {
            ref.current = value;
        }

        return ref.current;
    }

    function useDeepCompareEffectForMaps(
        callback: React.EffectCallback,
        dependencies: any[]
    ) {
        React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
    }

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
            <div> {listing.title}</div>
            <div>{message}</div>
            <div className={styles.price}>Price {listing.price}</div>
            <div>Id : {listing.id}</div>
            <div>Category : {listing.category}</div>
            <div>
                Baths : {listing.numBathrooms ?? "No info"} | Room :{" "}
                {listing.numBedrooms}
            </div>
            <div>
                Publish date: {new Date(listing.publishDate).toLocaleString()}
            </div>
        </div>
    );
};

export default Card;
