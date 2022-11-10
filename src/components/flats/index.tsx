import React from "react";
import Delayed from "@/components/delayed";
import Card from "@/components/card";
import styles from "../../../styles/search.module.css";

export const Flats = ({ data, display }: any) => {
    return data.map(({ listing }: any, index: number) => {
        const ref = React.createRef<HTMLDivElement>();
        return (
            <Delayed
                key={`${listing.id}${new Date(listing.publishDate).getTime()}}`}
                index={index}
            >
                <Card
                    display={display}
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
};

export default Flats;
