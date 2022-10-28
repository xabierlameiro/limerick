import React from "react";
import Delayed from "@/components/delayed";
import Card from "@/components/card";
import styles from "../../../styles/search.module.css";

const NUM_OF_ELEMENTS = 10;

export const Flats = ({ data, display }: any) =>
    data.slice(0, NUM_OF_ELEMENTS).map(({ listing }: any, index: number) => {
        const ref = React.createRef<HTMLDivElement>();
        return (
            <Delayed key={listing.id} index={index}>
                <Card
                    display={display}
                    key={listing.id}
                    mapReference={ref}
                    listing={listing}
                    index={index}
                >
                    <div
                        className={` ${display ? styles.noDisplay : ""}`}
                        ref={ref}
                    />
                </Card>
            </Delayed>
        );
    });

export default Flats;
