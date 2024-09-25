import { useState } from 'react';

export default function Hint({countryCode, hintVisible, toggleHint}) {
    return (
        <>
            <button className='d-block' type="button" onClick={toggleHint}>hint</button>
            {hintVisible && <p className='d-block'><strong>Country Code:</strong> {countryCode}</p>}
        </>
    );
    
}