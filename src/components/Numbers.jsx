import { useContext } from 'react';
import { Context } from '../stateManagement/Provider';

export const Numbers = () => {
    const { screenFormula, setScreenFormula, screenOutput, setScreenOutput } =
        useContext(Context);
    const digit = e => {
        const separateDigits = screenFormula.join('').split(/[-/+X]/);
        const currentNumber = separateDigits[separateDigits.length - 1];
        const lastElement = screenFormula[screenFormula.length - 1];
        if (screenFormula[screenFormula.length - 2] === '=') {
            setScreenOutput([e.target.value]);
            setScreenFormula([e.target.value]);
        } else if (screenOutput[0] === 'Error: Division by zero') {
            setScreenOutput([e.target.value]);
            setScreenFormula([e.target.value]);
        } else if (!currentNumber.includes('.') && lastElement === '0') {
            setScreenOutput([e.target.value]);
            setScreenFormula([...screenFormula]);
        } else if (screenFormula.length === 0) {
            setScreenOutput([e.target.value]);
            setScreenFormula([e.target.value]);
        } else if (
            currentNumber.includes('.') ||
            !isNaN(screenOutput[screenOutput.length - 1])
        ) {
            setScreenOutput([...screenOutput, e.target.value]);
            setScreenFormula([...screenFormula, e.target.value]);
        } else if (/[X/+]/.test(screenFormula[0])) {
            setScreenFormula([e.target.value]);
            setScreenOutput([e.target.value]);
        } else if (screenOutput[0] === 'Incomplete expression') {
            setScreenOutput([e.target.value]);
            setScreenFormula([...screenFormula, e.target.value]);
        } else {
            setScreenOutput([e.target.value]);
            setScreenFormula([...screenFormula, e.target.value]);
        }
    };
    return (
        <>
            <input type='button' id='seven' value='7' onClick={e => digit(e)} />
            <input type='button' id='eight' value='8' onClick={e => digit(e)} />
            <input type='button' id='nine' value='9' onClick={e => digit(e)} />
            <input type='button' id='four' value='4' onClick={e => digit(e)} />
            <input type='button' id='five' value='5' onClick={e => digit(e)} />
            <input type='button' id='six' value='6' onClick={e => digit(e)} />
            <input type='button' id='one' value='1' onClick={e => digit(e)} />
            <input type='button' id='two' value='2' onClick={e => digit(e)} />
            <input type='button' id='three' value='3' onClick={e => digit(e)} />
            <input type='button' id='zero' value='0' onClick={e => digit(e)} />
        </>
    );
};
