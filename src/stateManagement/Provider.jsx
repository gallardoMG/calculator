import { createContext, useState } from 'react';

export const Provider = ({ children }) => {
    const [screenFormula, setScreenFormula] = useState([]);
    const [screenOutput, setScreenOutput] = useState(['0']);
    const values = {
        screenFormula: screenFormula,
        setScreenFormula: setScreenFormula,
        screenOutput: screenOutput,
        setScreenOutput: setScreenOutput,
    };
    return (
        <Context.Provider value={{ ...values }}>{children}</Context.Provider>
    );
};
export const Context = createContext();
