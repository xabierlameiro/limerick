import React from "react";
import { usePolygons } from "@/context/MapPolygonsContext";

const CardMap = ({
    children,
    mapReference,
    coordinates: coordinatesMap,
}: any) => {
    const [a, b]: [number, number] = coordinatesMap;
    const [map, setMap] = React.useState<google.maps.Map>();
    const [message, setMessage] = React.useState([""]);
    const {
        state: { coordinates },
    } = usePolygons();

    const center = React.useMemo(() => {
        return { lat: b, lng: a };
    }, [a, b]);

    React.useEffect(() => {
        if (coordinates && map) {
            const bermudaTriangle = new google.maps.Polygon({
                paths: coordinates as any,
                fillColor: "#FE4C4C",
                strokeColor: "#FE4C4C",
                geodesic: true,
                fillOpacity: 0.5,
                strokeWeight: 1,
                strokeOpacity: 1,
            });
            bermudaTriangle.setMap(map);
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
