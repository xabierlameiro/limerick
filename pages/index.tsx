import Head from "next/head";
import dynamic from "next/dynamic";
import Collapsible from "../components/collapsible/collapsible";
import Tooltip from "../components/tooltip/tooltip";
import Layout from "../components/layouts";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const DynamicMap = dynamic(() =>
    import("../components/map/map").then((mod) => mod.Map)
);
const Banner = dynamic(() => import("../components/banner").then((mod) => mod));

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>
                    We are looking for flatmates, roommates, rent in Limerick
                    city or share
                </title>
                <meta
                    name="description"
                    content="We are a couple looking for rent limerick, share, flatmates, roommates, housing in limerick city, I am a programmer and my girlfriend is a teacher. We are serious, friendly and do not smoke."
                />
                <meta
                    property="og:title"
                    content="We are looking for flatmates, roommates, rent in Limerick
                        city or share"
                />
                <meta
                    property="og:description"
                    content="We are a couple looking for rent limerick, share, flatmates, roommates, housing in limerick city, I am a programmer and my girlfriend is a teacher. We are serious, friendly and do not smoke."
                />
                <meta name="robots" content="all" />
            </Head>
            <Banner />
            <main>
                <h1>
                    Looking for accommodation, rent, share in Limerick city
                    centre
                </h1>
                <article>
                    <h2>Hello &#128075; we are Xabi and María!</h2>
                    <h3>
                        We are a couple looking for accommodation in{" "}
                        <a
                            title="Link to limerick city centre map position"
                            onClick={() =>
                                (window as any).gtag("event", "Limerick link", {
                                    event_category: "click",
                                    event_label: "Click on Limerick map link",
                                })
                            }
                            href="https://www.google.com/maps/place/Limerick,+Irlanda/@52.6515619,-8.6651593,13z/data=!3m1!4b1!4m5!3m4!1s0x485b5c611f545113:0xa00c7a997317330!8m2!3d52.6638367!4d-8.6267343"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Limerick (County)
                        </a>
                        , for a <span>long-term</span> stay.
                        <Tooltip />
                    </h3>
                    <p>
                        Our aim is to get to know Ireland, learn and practice
                        English while continuing with our usual life, working as
                        a programmer in my case and studying for the competitive
                        examinations to become a Kindergarten teacher in
                        Maria&apos;s case.
                    </p>
                    <p>
                        We are from Galicia (Spain) and we are 32 and 31 years
                        old respectively, we are quiet people, we like animals
                        and we are no-smokers.
                    </p>
                    <p>
                        We would like to rent a one-bedroom flat or a shared
                        living space in this area if possible:
                    </p>

                    <DynamicMap />

                    <h5>
                        #houses #flat #apartments #rent #bedroom #double #room
                        #ireland #rental only
                    </h5>

                    <p>
                        If you know someone who is looking for housemates,
                        flatmates, or you are simply a landlord willing to get
                        to know us, please do not hesitate to contact us.
                    </p>
                </article>
                <nav id="contact">
                    <ul>
                        <li>
                            Email us at{" "}
                            <a
                                title="Send email for get more information to Xabier"
                                onClick={() =>
                                    (window as any).gtag("event", "Mail to", {
                                        event_category: "click",
                                        event_label:
                                            "Sending mail to xabier.lameiro@gmail.com",
                                    })
                                }
                                href="mailto:xabier.lameiro@gmail.com"
                            >
                                Xabi
                            </a>{" "}
                            o{" "}
                            <a
                                title="Send email for get more information to Maria"
                                onClick={() =>
                                    (window as any).gtag("event", "Mail to", {
                                        event_category: "click",
                                        event_label:
                                            "Sending mail to maria.otero.ces@gmail.com",
                                    })
                                }
                                href="mailto:maria.otero.ces@gmail.com"
                            >
                                María
                            </a>{" "}
                        </li>
                        <li>
                            Better Whastapp ?{" "}
                            <a
                                title="Making a chat with Xabier"
                                onClick={() =>
                                    (window as any).gtag("event", "Whatsapp", {
                                        event_category: "click",
                                        event_label:
                                            "Sending whatsapp to Xabier",
                                    })
                                }
                                href="https://wa.me/+34603018268/?text=Hi,%20I%20saw%20you%20on%20www.couplelookinghomeinlimerick.com"
                            >
                                Send message
                            </a>
                        </li>
                    </ul>
                </nav>
                <Collapsible />
            </main>
        </>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;
