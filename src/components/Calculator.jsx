import { Buttons } from './Buttons';
import { Display } from './Display';
import { Provider } from '../stateManagement/Provider';
import { Footer } from './Footer';

function Calculator() {
    return (
        <main className='calculator-container'>
            <Provider>
                <Display />
                <Buttons />
            </Provider>
            <Footer />
        </main>
    );
}
export default Calculator;
