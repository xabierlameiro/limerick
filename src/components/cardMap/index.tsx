import React from "react";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
const q = query(collection(db, "coordinates"));

const CardMap = ({
    children,
    mapReference,
    coordinates: coordinatesMap,
}: any) => {
    const [a, b]: [number, number] = coordinatesMap;
    const [map, setMap] = React.useState<google.maps.Map>();
    const [message, setMessage] = React.useState([""]);
    const [coordinates, setCoordinates] = React.useState();
    const initialized = React.useRef<any>();

    const center = React.useMemo(() => {
        return { lat: b, lng: a };
    }, [a, b]);

    React.useEffect(() => {
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            const cities: any = [];
            querySnapshot.forEach((doc) => {
                doc.data().data.forEach((e: Array<any>) => {
                    cities.push(
                        e[0].map((a: any) => new google.maps.LatLng(a))
                    );
                });
            });
            setCoordinates(cities);
        });

        return () => {
            unsuscribe();
        };
    }, []);

    React.useEffect(() => {
        if (Array.isArray(coordinates)) {
            initialized?.current?.setMap(null);

            initialized.current = new google.maps.Polygon({
                paths: coordinates,
                fillColor: "#FE4C4C",
                fillOpacity: 0.5,
                strokeColor: "#FE4C4C",
                strokeWeight: 0,
                strokeOpacity: 1,
                geodesic: true,
            });

            initialized.current.setMap(map);
        }
    }, [coordinates, map]);

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
                zoomControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
            } as google.maps.MapOptions);

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

    return (
        <>
            {children}
            <div>
                Walking {message[0]} (<strong>{message[1]}</strong>)
            </div>
        </>
    );
};

export default CardMap;
