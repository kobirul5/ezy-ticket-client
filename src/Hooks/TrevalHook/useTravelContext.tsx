import { useContext } from "react";
import { TravelContext } from "@/Provider/TravelProvider";

const useTravelContext = () => {
    const travelData = useContext(TravelContext);
    if (!travelData) {
        throw new Error("useTravelContext must be used within a TravelProvider");
    }
    return travelData;
};

export default useTravelContext;
