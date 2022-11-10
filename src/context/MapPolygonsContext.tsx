import * as React from "react";

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
            return {
                ...state,
                coordinates: [...state.coordinates, [...action.payload]],
                polygons: [...state.polygons, { ...action.polygons }],
            };
        }
        case "POP_COORDINATE": {
            return {
                ...state,
                coordinates: state.coordinates.filter(
                    (_, i) => i !== state.coordinates.length - 1
                ),
                polygons: state.polygons.filter(
                    (_, i) => i !== state.polygons.length - 1
                ),
            };
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
