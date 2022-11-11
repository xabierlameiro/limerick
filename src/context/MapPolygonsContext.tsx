import * as React from "react";
import { doc, db } from "@/firebase";
import { arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";

type Action = {
    type: "ADD_COORDINATES" | "POP_COORDINATE";
    payload?: any;
    polygons?: any;
};
type Dispatch = (action: Action) => void;
type State = { coordinates: Array<Array<any>>; polygons: Array<Array<any>> };
type CountProviderProps = { children: React.ReactNode };

const MapPolygonStateContext = React.createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

function mapPolygonReducer(state: State, action: Action) {
    switch (action.type) {
        case "ADD_COORDINATES": {
            const newValue = {
                ...state,
                coordinates: [...state.coordinates, [...action.payload]],
                polygons: [...state.polygons, { ...action.polygons }],
            };

            try {
                updateDoc(doc(db, "coordinates", "map"), {
                    data: arrayUnion({
                        0: JSON.parse(JSON.stringify(action.payload)),
                    }),
                });
            } catch (e) {
                console.error("Error when try write a document", e);
            }
            return newValue;
        }
        case "POP_COORDINATE": {
            try {
                updateDoc(doc(db, "coordinates", "map"), {
                    data: arrayRemove({
                        0: JSON.parse(JSON.stringify(action.payload)),
                    }),
                });
            } catch (e) {
                console.error("Error when try write a document", e);
            }
        }
        default: {
            return state;
        }
    }
}

function MapPolygonsProvider({ children }: CountProviderProps) {
    const [state, dispatch] = React.useReducer(mapPolygonReducer, {
        coordinates: [],
        polygons: [],
    });
    const value = { state, dispatch };
    return (
        <MapPolygonStateContext.Provider value={value}>
            {children}
        </MapPolygonStateContext.Provider>
    );
}

function usePolygons() {
    const context = React.useContext(MapPolygonStateContext);
    if (context === undefined) {
        throw new Error(
            "usePolygons must be used within a MapPolygonStateContext"
        );
    }
    return context;
}

export { MapPolygonsProvider, usePolygons };
