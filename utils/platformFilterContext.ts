import React, { useContext } from "react";
import { Checkbox } from "../interfaces/checkbox";

export interface PlatformsContextType {
    platforms: Checkbox[]
    setPlatforms: Function
}

export const PlatformsContext = React.createContext<PlatformsContextType>({
    platforms: [],
    setPlatforms: (p: Checkbox[]) => {}
})

export const usePlatforms = () => useContext(PlatformsContext)