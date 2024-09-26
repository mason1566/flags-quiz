import { useState } from 'react';

export default function Hint({children, answerVisible, showAnswer}) {
    return (
        <>
            <button className='d-block' type="button" onClick={showAnswer}>Answer</button>
            {answerVisible && <p><strong>{children}</strong></p>}
        </>
    );
    
}