import { useState } from 'react';
import './Flag.css';

export default function Flag() {
    const {flag, setFlag} = useState(0);

    return (
        <img src={flag} className='flag' key={flag} />
    );
}