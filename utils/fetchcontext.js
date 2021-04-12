import { createContext } from "react";

const FetchContext = createContext({});

export const FetchProvider = FetchContext.Provider;

export default FetchContext;