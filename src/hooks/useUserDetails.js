// context hook for storing DID data for current user between pages
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(
    {
        user: {
            displayName: "Test",
            didDoc: {},
            SCVP: {},
        },
        setUser: () => {}
    }
);

export const userProvider = ({ children }) => {
    const [user, setUser] = useState({
        displayName: "Test",
        didDoc: {},
        SCVP: {},
    });

    return (
        <UserContext.Provider value={{ sampleData, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserData = () => useContext(UserContext);