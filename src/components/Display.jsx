import { useContext } from 'react';
import { Context } from '../stateManagement/Provider';

export const Display = () => {
    const { screenFormula, screenOutput } = useContext(Context);
    return (
        <div id='display'>
            <div className='display1'>{screenFormula.map(el => el)}</div>
            <div className='display2'>{screenOutput.map(el => el)}</div>
        </div>
    );
};
