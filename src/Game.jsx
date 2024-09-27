import { useState } from 'react';
import Flag from './Flag.jsx';
import AnswerBox from './AnswerBox.jsx';
import Hint from './Hint.jsx';
import Answer from './Answer.jsx';

export default function Game({ unguessedCountries, countryData, endGameFunction, score, setScore, totalFlags }) {
    const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    /* const flagsCount = useMemo(() => unguessedCountries.length, []) // Using an empty dependency array to make sure our flagsCount never changes */
    const [flagsCount, setFlagsCount] = useState(unguessedCountries.length);
    const [hintVisible, setHintVisible] = useState(false);
    const [revealedCountries, setRevealedCountries] = useState({});
    const [knownFlagsCount, setKnownFlagsCount] = useState(0); // Used in determining win state

    function displayNextFlag() {
        setCurrentCountryIndex(currentCountryIndex + 1)
        if (currentCountryIndex >= unguessedCountries.length - 1) setCurrentCountryIndex(0);
        setHintVisible(false);
        setInputValue('')
    }

    function displayPrevFlag() {
        setCurrentCountryIndex(currentCountryIndex - 1)
        if (currentCountryIndex <= 0) setCurrentCountryIndex(unguessedCountries.length - 1);
        setHintVisible(false);
        setInputValue('')
    }

    function checkWin() {
        if (knownFlagsCount === totalFlags-1) {
            endGameFunction();
        }
    }
    
    function checkGuess(input) {
        input = input.toLowerCase().trim();
        const currentCountry = countryData[unguessedCountries[currentCountryIndex]];
        let isCorrect = false;

        // Check each country name against the user's text-input
        for (const name of currentCountry["names"]) {

            // If the guess is correct:
            if (name.toLowerCase().trim() === input) {
                setScore(score + 1);
                setHintVisible(false) // Hide the hint
                setKnownFlagsCount(knownFlagsCount+1);

                // If this was the last unknown flag, end the game.
                checkWin();

                unguessedCountries.splice(currentCountryIndex, 1);
                setInputValue('');
                break;
            }
        }
    }

    // This function takes in text-box input events and routes it to the guess checker 
    function handleInput(event) {
        setInputValue(event.target.value);
        checkGuess(event.target.value);
    }

    // This function is ran when the answer button is pressed
    function revealAnswer() {
        if (revealedCountries[unguessedCountries[currentCountryIndex]]) return; // Return if the flag is already revealed

        let rc = structuredClone(revealedCountries); // Must use this notation. Component will not update with notation like: let arrayCopy = array
        rc[unguessedCountries[currentCountryIndex]] = true;
        setRevealedCountries(rc);
        setKnownFlagsCount(knownFlagsCount+1); // This is used for keeping track of win states
        setFlagsCount(flagsCount - 1); // This value is for the ui score counter
    }

    return (
        <>
            <Flag country={unguessedCountries[currentCountryIndex]} />
            <div>
                <button type="button" onClick={displayPrevFlag}>Prev</button>
                <button type="button" onClick={displayNextFlag}>Next</button>
            </div>
            <AnswerBox onChange={handleInput} inputValue={inputValue} disabled={revealedCountries[unguessedCountries[currentCountryIndex]]} />
            <p>Score: {score}/{flagsCount}</p>
            <Hint countryCode={unguessedCountries[currentCountryIndex]} hintVisible={hintVisible} toggleHint={() => setHintVisible(!hintVisible)} />
            <Answer answerVisible={revealedCountries[unguessedCountries[currentCountryIndex]]} showAnswer={revealAnswer} >{countryData[unguessedCountries[currentCountryIndex]]["names"][0]}</Answer>
            <button className='d-block' type="button" onClick={endGameFunction}>Give Up</button>
        </>
    );
}