import { useContext } from 'react';
import { Context } from '../stateManagement/Provider';

export const Operators = () => {
    const { screenFormula, setScreenFormula, screenOutput, setScreenOutput } =
        useContext(Context);
    const clear = () => {
        setScreenOutput(['0']);
        setScreenFormula([]);
    };
    const addOperation = e => {
        const lastElement = screenFormula[screenFormula.length - 1];
        const penultimateElement = screenFormula[screenFormula.length - 2];
        if (penultimateElement === '=') {
            setScreenOutput([e.target.value]);
            setScreenFormula([screenFormula.pop(), e.target.value]);
        } else if (e.target.value === '-' && screenOutput[0] !== '-') {
            setScreenOutput([e.target.value]);
            setScreenFormula([...screenFormula, e.target.value]);
        } else if (isNaN(lastElement) && isNaN(penultimateElement)) {
            setScreenFormula([
                ...screenFormula.slice(0, screenFormula.length - 2),
                e.target.value,
            ]);
            setScreenOutput([e.target.value]);
        } else if (isNaN(lastElement)) {
            screenFormula.pop();
            setScreenOutput([e.target.value]);
            setScreenFormula([...screenFormula, e.target.value]);
        } else if (screenOutput[0] === 'Error: Division by zero') {
            setScreenOutput([e.target.value]);
            setScreenFormula([e.target.value]);
        } else {
            setScreenOutput([e.target.value]);
            setScreenFormula([...screenFormula, ...e.target.value]);
        }
    };
    const decimal = e => {
        const separateDigits = screenFormula.join('').split(/[-/+*]/);
        const currentNumber = separateDigits[separateDigits.length - 1];
        if (!currentNumber.includes('.')) {
            if (/[X/+]/.test(screenFormula[0]) || screenFormula.length === 0) {
                setScreenFormula(['0.']);
                setScreenOutput(['0.']);
            } else if (/[-/+X]/.test(screenOutput[0])) {
                setScreenOutput(['0.']);
                setScreenFormula([...screenFormula, '0.']);
            } else {
                setScreenOutput([...screenOutput, e.target.value]);
                setScreenFormula([...screenFormula, e.target.value]);
            }
        }
    };
    const equal = () => {
        const separateOperation = screenFormula
            .join('')
            .replace(/[+]/g, '+>')
            .replace(/[-]/g, '>-')
            .replace(/[X]/g, '>*>')
            .replace(/[/]/g, '>/>');
        const operationList = separateOperation
            .split('>')
            .filter(el => el !== ''); //to remove blank spaces
        //to resolve operation
        const beforeOperator = operator =>
            parseFloat(operationList[operationList.indexOf(operator) - 1]);
        const afterOperator = operator =>
            parseFloat(operationList[operationList.indexOf(operator) + 1]);
        const pushResult = (operator, result) =>
            operationList.splice(
                operationList.indexOf(operator) - 1,
                3,
                result
            );
        while (true) {
            if (/=/.test(screenFormula[screenFormula.length - 2])) break;
            else if (
                parseFloat(operationList[operationList.indexOf('/') + 1]) ===
                    0 &&
                operationList.indexOf('/') !== -1
            ) {
                setScreenOutput(['Error: Division by zero']);
                break;
            } else if (screenFormula.length === 0) {
                setScreenFormula(['=', '0']);
                break;
            } else if (isNaN(operationList[operationList.length - 1])) {
                setScreenOutput(['Incomplete expression']);
                break;
            } else if (
                operationList.indexOf('/') !== -1 &&
                operationList.indexOf('*') !== -1
            ) {
                //resolve left-right order
                if (operationList.indexOf('/') < operationList.indexOf('*')) {
                    const result = beforeOperator('/') / afterOperator('/');
                    pushResult('/', result);
                } else {
                    const result = beforeOperator('*') * afterOperator('*');
                    pushResult('*', result);
                }
            } else if (
                operationList.indexOf('*') !== -1 &&
                operationList.length >= 3
            ) {
                const result = beforeOperator('*') * afterOperator('*');
                pushResult('*', result);
            } else if (
                operationList.indexOf('/') !== -1 &&
                operationList.length >= 3
            ) {
                const result = beforeOperator('/') / afterOperator('/');
                pushResult('/', result);
            } else {
                const total = operationList.reduce(
                    (acc, el) => parseFloat(acc) + parseFloat(el)
                );
                setScreenFormula([
                    ...screenFormula,
                    '=',
                    Number(Math.round(total + 'e12') + 'e-12'),
                ]);
                setScreenOutput([Number(Math.round(total + 'e12') + 'e-12')]);
                break;
            }
        }
    };
    return (
        <>
            <input
                type='button'
                value='AC'
                id='clear'
                onClick={() => clear()}
            />
            <input
                type='button'
                value='/'
                id='divide'
                onClick={e => addOperation(e)}
            />
            <input
                type='button'
                value='X'
                id='multiply'
                onClick={e => addOperation(e)}
            />
            <input
                type='button'
                value='-'
                id='subtract'
                onClick={e => addOperation(e)}
            />
            <input
                type='button'
                value='+'
                id='add'
                onClick={e => addOperation(e)}
            />
            <input type='button' value='=' id='equal' onClick={() => equal()} />
            <input
                type='button'
                value='.'
                id='decimal'
                onClick={e => decimal(e)}
            />
        </>
    );
};
