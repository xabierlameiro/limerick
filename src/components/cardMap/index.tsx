import React from "react";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
const q = query(collection(db, "coordinates"));

const CardMap = ({
    display,
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
        map?.setZoom(14);
    }, [display]);

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
                fillOpacity: 0.7,
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

            let directionsRenderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                markerOptions: {
                    visible: true,
                },
                polylineOptions: {
                    strokeColor: "#17236eff",
                    geodesic: true,
                    strokeWeight: 2,
                },
            });
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

            directionsService
                .route(route, function (response, status) {
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
                })
                .then((e: any) => {
                    const myRoute = e!.routes[0]!.legs[0]!;
                    const RightWordMarker = new google.maps.Marker({
                        icon: {
                            url: "/rightWord.jpeg",
                            scaledSize: {
                                width: 30,
                                height: 30,
                            },
                        },
                    });
                    RightWordMarker.setMap(map);
                    RightWordMarker.setPosition(myRoute.end_location);

                    const ApartmentMarker = new google.maps.Marker({
                        animation: google.maps.Animation.BOUNCE,
                        icon: {
                            path: "M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z",
                            strokeWeight: 0.7,
                            scale: 1.5,
                            fillOpacity: 1,
                            anchor: new google.maps.Point(10, 19),
                            strokeColor: "#17236eff",
                        },
                        optimized: true,
                    });
                    ApartmentMarker.setMap(map);
                    ApartmentMarker.setPosition(myRoute.start_location);
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
