import React, { createContext, useEffect, useState } from "react";

export const MyTheme = createContext();

const ThemeContext = ({ children }) => {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("dark", dark);

        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <MyTheme.Provider value={{ dark, setDark }}>
            {children}
        </MyTheme.Provider>
    );
};

export default ThemeContext;