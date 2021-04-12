import { createContext } from "react";

const StateContext = createContext({});

export const StateProvider = StateContext.Provider;

export default StateContext;