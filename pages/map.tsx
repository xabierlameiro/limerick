import React from "react";
import Layout from "@/components/layouts";
import type { ReactElement } from "react";
import styles from "@/styles/search.module.css";
import useAuthUser from "@/hooks/useAuthUser";
import Head from "next/head";
import { usePolygons } from "@/context/MapPolygonsContext";
import { toast } from "react-toastify";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import useWindowResize from "@/hooks/useWidowResize";
import useSWR from "swr";

const q = query(collection(db, "coordinates"));

function createCenterControl(
    map: any,
    coordinates: any,
    dispatch: any,
    customButton: any,
    user: any
) {
    const controlButton = document.createElement("button");

    if (!user || coordinates) {
        const element = document.getElementById("customButton");
        element?.remove();
        customButton.current = false;
    }
    if (!customButton.current && user) {
        controlButton.style.backgroundColor = "#fff";
        controlButton.style.border = "none";
        controlButton.style.borderRadius = "none";
        controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlButton.style.color = "rgb(25,25,25)";
        controlButton.style.cursor = "pointer";
        controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
        controlButton.style.fontSize = "8px";
        controlButton.style.margin = "5px -6px 22px";
        controlButton.style.padding = "8.35px 10px";
        controlButton.style.textAlign = "center";
        controlButton.style.borderBottomRightRadius = "3px";
        controlButton.style.borderTopRightRadius = "3px";
        controlButton.textContent = "Delete";
        controlButton.title = "Click to recenter the map";
        controlButton.type = "button";

        const centerControlDiv = document.createElement("div");
        centerControlDiv.setAttribute("id", "customButton");
        centerControlDiv.appendChild(controlButton);
        if (
            map?.current?.controls?.[google.maps.ControlPosition.TOP_CENTER]
                .length > 0
        )
            map?.current?.controls?.[
                google.maps.ControlPosition.TOP_CENTER
            ]?.pop();

        map?.current?.controls?.[google.maps.ControlPosition.TOP_CENTER]?.push(
            centerControlDiv
        );
        customButton.current = true;
    }
    if (coordinates) {
        const index = coordinates.length - 1;
        var elemEventHandler = () => {
            toast(
                <>
                    <p>Are you sure you want to delete it?</p>
                    <button
                        onClick={() =>
                            dispatch({
                                type: "POP_COORDINATE",
                                payload: coordinates[index],
                            })
                        }
                    >
                        Yes
                    </button>
                    {"     "}
                    <button onClick={() => console.log("close")}>No</button>
                </>,
                { autoClose: false }
            );
        };

        controlButton.addEventListener("click", elemEventHandler);
    }
}

export default function Map() {
    const { data: { url, grade } = {} } = useSWR("/api/weather");

    const ref = React.createRef<HTMLDivElement>();
    const map = React.useRef<google.maps.Map>();
    const drawing = React.useRef<google.maps.drawing.DrawingManager>();
    const polygon = React.useRef<google.maps.Polygon>();
    const customButton = React.useRef<boolean>();
    const initialized = React.useRef<any>();
    const weatherMark = React.useRef<any>();
    const [coordinates, setCoordinates] = React.useState();
    const { user } = useAuthUser();
    const { dispatch } = usePolygons();
    const { isMobile } = useWindowResize();

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
        if (ref?.current && !map.current) {
            const mapConfig = new window.google.maps.Map(ref.current, {
                center: new google.maps.LatLng(52.66, -8.6216564),
                zoom: 13.2,
                panControl: false,
                scaleControl: false,
                rotateControl: false,
                scrollwheel: false,
                streetViewControl: false,
                zoomControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
                styles: [
                    {
                        featureType: "administrative",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#686868",
                            },
                        ],
                    },
                    {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [
                            {
                                color: "#f2f2f2",
                            },
                        ],
                    },
                    {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [
                            {
                                visibility: "off",
                            },
                        ],
                    },
                    {
                        featureType: "road",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: -100,
                            },
                            {
                                lightness: 45,
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "all",
                        stylers: [
                            {
                                visibility: "simplified",
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                lightness: "-22",
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [
                            {
                                saturation: "11",
                            },
                            {
                                lightness: "-51",
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.text",
                        stylers: [
                            {
                                saturation: "3",
                            },
                            {
                                lightness: "-56",
                            },
                            {
                                weight: "2.20",
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                lightness: "-52",
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.text.stroke",
                        stylers: [
                            {
                                weight: "6.13",
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.icon",
                        stylers: [
                            {
                                lightness: "-10",
                            },
                            {
                                gamma: "0.94",
                            },
                            {
                                weight: "1.24",
                            },
                            {
                                saturation: "-100",
                            },
                            {
                                visibility: "off",
                            },
                        ],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [
                            {
                                lightness: "-16",
                            },
                        ],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                saturation: "-41",
                            },
                            {
                                lightness: "-41",
                            },
                        ],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "labels.text.stroke",
                        stylers: [
                            {
                                weight: "5.46",
                            },
                        ],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "labels.icon",
                        stylers: [
                            {
                                visibility: "off",
                            },
                        ],
                    },
                    {
                        featureType: "road.local",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                weight: "0.72",
                            },
                            {
                                lightness: "-16",
                            },
                        ],
                    },
                    {
                        featureType: "road.local",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                lightness: "-37",
                            },
                        ],
                    },
                    {
                        featureType: "transit",
                        elementType: "all",
                        stylers: [
                            {
                                visibility: "off",
                            },
                        ],
                    },
                    {
                        featureType: "water",
                        elementType: "all",
                        stylers: [
                            {
                                color: "#b7e4f4",
                            },
                            {
                                visibility: "on",
                            },
                        ],
                    },
                ],
            } as google.maps.MapOptions);

            map.current = mapConfig;

            try {
                const drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                    drawingControl: false,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                            google.maps.drawing.OverlayType.POLYGON,
                            google.maps.drawing.OverlayType.MARKER,
                        ],
                    },
                    polygonOptions: {
                        fillColor: "#FE4C4C",
                        fillOpacity: 0.5,
                        strokeColor: "#FE4C4C",
                        strokeWeight: 2,
                        strokeOpacity: 1,
                        geodesic: true,
                    },
                });

                drawingManager.setMap(map.current);

                google.maps.event.addListener(
                    drawingManager,
                    "markercomplete",
                    function (data) {
                        data.setMap(null);
                        new google.maps.Marker({
                            position: data.getPosition(),
                            icon: "/cloud-1.svg",
                            map: map.current,
                        });
                    }
                );

                google.maps.event.addListener(
                    drawingManager,
                    "polygoncomplete",
                    function (data) {
                        var coordinates = data.getPath();

                        polygon.current = data;
                        if (map.current && polygon.current)
                            polygon.current.setMap(null);

                        dispatch({
                            type: "ADD_COORDINATES",
                            payload: coordinates.getArray(),
                            polygons: polygon,
                        });
                    }
                );
                drawing.current = drawingManager;
            } catch (e) {
                console.log("e", e);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, map]);

    React.useEffect(() => {
        weatherMark.current?.setMap(null);
        if (typeof url !== "undefined") {
            weatherMark.current = new google.maps.Marker({
                position: { lat: 52.66472, lng: -8.627 },
                icon: {
                    url: url,
                    scaledSize: new google.maps.Size(100, 100),
                },
                map: map.current,
                animation: google.maps.Animation.DROP,
                label: {
                    text: grade,
                    fontSize: "22px",
                    fontWeight: "bold",
                },
            });
        }
    }, [map, url, grade]);

    React.useEffect(() => {
        map.current?.setZoom(isMobile ? 12.5 : 13);
        map.current?.setCenter({ lat: 52.66472, lng: -8.627 });
    }, [isMobile, map]);

    React.useEffect(() => {
        if (Array.isArray(coordinates)) {
            initialized?.current?.setMap(null);

            initialized.current = new google.maps.Polygon({
                paths: coordinates,
                fillColor: "#FE4C4C",
                fillOpacity: 0.2,
                strokeColor: "#FE4C4C",
                strokeWeight: 0.1,
                strokeOpacity: 1,
                geodesic: true,
            });

            initialized.current.setMap(map.current);
        }
    }, [coordinates]);

    React.useEffect(() => {
        if (drawing)
            drawing.current?.setOptions({
                drawingControl: user,
                drawingMode: user
                    ? google.maps.drawing.OverlayType.POLYGON
                    : null,
            });
    }, [user, drawing]);

    React.useEffect(() => {
        createCenterControl(map, coordinates, dispatch, customButton, user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, coordinates]);

    return (
        <>
            <Head>
                <title>Limerick Map of the least recommended areas</title>
                <meta
                    name="description"
                    content="This is a map showing the worst areas to live in Limerick."
                />
                <meta
                    property="og:title"
                    content="Limerick Map of the least recommended areas"
                />
                <meta
                    property="og:description"
                    content="This is a map showing the worst areas to live in Limerick."
                />
                <meta name="robots" content="all" />
            </Head>
            <div className={styles.mapContainer}>
                <div ref={ref} className={styles.otroMapa} />
            </div>
        </>
    );
}
Map.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title={`"Less" recommended areas of Limerick`}>{page}</Layout>
    );
};
