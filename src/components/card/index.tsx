import React from "react";
import styles from "@/styles/search.module.css";
import Image from "next/image";
import noImage600x600 from "public/no-image-600x600.jpg";
import { TbMailForward, TbMailOff, TbBrandWhatsapp } from "react-icons/tb";
import useAuthUser from "@/hooks/useAuthUser";
import { setDoc, db, doc, getDoc } from "@/firebase";
import { toast } from "react-toastify";
import TimeCounter from "@/components/timeCounter";

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
    const { user } = useAuthUser();
    const [hasEmail, setHasEmail] = React.useState(false);
    const docRef = doc(db, "emails", listing.id.toString());

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

    React.useEffect(() => {
        async function findDoc() {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setHasEmail(true);
                } else {
                    setHasEmail(false);
                }
            } catch (err) {
                toast.error((err as Error).message, {
                    position: "top-center",
                });
            }
        }
        if (user) findDoc();
    }, [user]);

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
            <div className={styles.title}> {listing.title}</div>
            <div>
                Price <strong>{listing.price}</strong>
            </div>
            <div>Category : {listing.category}</div>
            <div>
                Baths : {listing.numBathrooms ?? "No info"} | Room :{" "}
                {listing.numBedrooms}
            </div>
            <div>
                Publish date: {new Date(listing.publishDate).toLocaleString()}
            </div>
            <div>
                <TimeCounter publishDate={listing.publishDate} />
            </div>
            {user && (
                <>
                    {listing.seller?.phone && (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            title="Sen a landlord message"
                            href={`https://wa.me/+353${listing.seller.phone
                                .replace(/\D/g, "")
                                .slice(-9)}/?text=Hello ${
                                listing.seller?.name == "Private User"
                                    ? ""
                                    : listing.seller?.name ?? ""
                            }%21%21%21%20My%20name%20is%20Xabier%20and%20I%20have%20seen%20your%20rental%20ad in ${
                                listing.title
                            }.%20I%20am%20a%20senior%20web%20developer%20working%20and%20living%20with%20my%20partner%20in%20Limerick%2C%20with%20a%20family%20who%20can%20give%20references.%20I%20also%20have%20a%20letter%20of%20recommendation%20from%20my%20company%20and%20my%20last%20landlady.%20You%20can%20see%20them%20here%20%3A%20https%3A%2F%2Fcouplelookinghomeinlimerick.com%2Fwork_recommendation%20and%20https%3A%2F%2Fcouplelookinghomeinlimerick.com%2Flandlady_recommendation%20.%20We%20are%20looking%20for%20accommodation%20for%20a%20long%20stay%2C%20If%20you%20have%20any%20questions%20just%20ask%20me%20and%20we%20can%20meet%20to%20get%20to%20know%20each%20other.%20Thanks`}
                        >
                            <TbBrandWhatsapp className={styles.whatsappIcon} />
                        </a>
                    )}
                    {!hasEmail && (
                        <TbMailForward
                            className={styles.mailIcon}
                            onClick={async () => {
                                try {
                                    await fetch(
                                        `${process.env.NEXT_PUBLIC_DOMAIN}/api/email?id=${listing.id}`
                                    );
                                    await setDoc(docRef, {
                                        id: listing.id,
                                        price: listing.price,
                                        title: listing.title,
                                        emailDate: new Date(),
                                    });
                                    setHasEmail(true);
                                } catch (err) {
                                    toast.error((err as Error).message, {
                                        position: "top-center",
                                    });
                                }
                            }}
                        />
                    )}
                    {hasEmail && <TbMailOff className={styles.mailIcon} />}
                </>
            )}
        </div>
    );
};

export default Card;
