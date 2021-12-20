import React from 'react';

export const UserContext = React.createContext(undefined);

export function useUser() {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserContext must be used inside UserProvider')
    }
    return context;
}
