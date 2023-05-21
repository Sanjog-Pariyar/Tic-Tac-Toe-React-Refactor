import './Menu.css'
import { useState } from 'react';

export default function Menu({reset, newRound}) {

    const [ hidden, setHidden ] = useState(false);
    const [ indicator, setIndicator ] = useState('v');

    const actionBtn = () => {
        if (indicator === 'v') {
            setIndicator('^')
        } else {
            setIndicator('v')
        }
    }

    return(
        <div className="menu">
            <button className="menu-btn" onClick={() => {
                setHidden((prev) => !prev)
                actionBtn()
            }}>
                Actions<span>{indicator}</span>
            </button>

            { hidden && (
                <div className="items">
                    <button onClick={reset}>Reset</button>
                    <button onClick={newRound}>New Round</button>
                </div>
            ) }
        </div>
    )
}