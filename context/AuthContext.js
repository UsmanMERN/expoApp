import React, { createContext, useState, useEffect } from 'react';
import { getData, storeData } from '../utils/Services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const authStatus = await getData('userAuthenticated');
            setUserAuthenticated(authStatus === 'true');
        };

        checkAuthStatus();
    }, []);

    const updateAuthentication = async (authenticated) => {
        setUserAuthenticated(authenticated);
        await storeData('userAuthenticated', authenticated.toString());
    };

    return (
        <AuthContext.Provider value={{ userAuthenticated, updateAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};
