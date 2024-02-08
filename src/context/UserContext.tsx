import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    id: number;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    userInfo: { email: string; address: string };
    setUserInfo: React.Dispatch<React.SetStateAction<{ email: string; address: string }>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [id] = useState(5);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({ email: '', address: '' });

    return (
        <UserContext.Provider value={{ password, setPassword, username, setUsername, userInfo, setUserInfo, id }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
