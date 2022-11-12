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
        map.current?.controls?.[google.maps.ControlPosition.TOP_CENTER]?.pop();

        map.current?.controls?.[google.maps.ControlPosition.TOP_CENTER]?.push(
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
    const ref = React.createRef<HTMLDivElement>();
    const map = React.useRef<google.maps.Map>();
    const drawing = React.useRef<google.maps.drawing.DrawingManager>();
    const polygon = React.useRef<google.maps.Polygon>();
    const customButton = React.useRef<boolean>();
    const initialized = React.useRef<any>();
    const [coordinates, setCoordinates] = React.useState();
    const { user } = useAuthUser();
    const { dispatch } = usePolygons();

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
                center: new google.maps.LatLng(52.6571673, -8.6216564),
                zoom: 15,
                panControl: false,
                scaleControl: false,
                rotateControl: false,
                scrollwheel: false,
                streetViewControl: false,
                zoomControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
            } as google.maps.MapOptions);

            map.current = mapConfig;

            try {
                const drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                    drawingControl: false,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
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
        if (Array.isArray(coordinates)) {
            initialized?.current?.setMap(null);

            initialized.current = new google.maps.Polygon({
                paths: coordinates,
                fillColor: "#FE4C4C",
                fillOpacity: 0.5,
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
            <h1>Map of the least recommended areas</h1>
            <div className={styles.mapContainer}>
                <div ref={ref} className={styles.otroMapa} />
            </div>
        </>
    );
}
Map.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
