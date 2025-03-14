import { useContext, useState, createContext } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    logout: () => {}
});

export const ContextProvider = ({ children }) => {

    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('USER_DATA');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('USER_DATA', JSON.stringify(userData));
        } else {
            localStorage.removeItem('USER_DATA');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_DATA');
        <Navigate to='/'/>
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser: updateUser,
            setToken,
            logout
        }}>
            {children}
        </StateContext.Provider>
    );
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const UseStateContext = () => useContext(StateContext);
