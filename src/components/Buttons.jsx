import { Numbers } from './Numbers';
import { Operators } from './Operators';

export const Buttons = () => {
    return (
        <div className='wrapper-buttons'>
            <Operators/>
            <Numbers/>
        </div>
    )
}
