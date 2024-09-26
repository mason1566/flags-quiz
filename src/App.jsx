import { useState, useMemo } from 'react';
import Flag from './Flag.jsx';
import AnswerBox from './AnswerBox.jsx';
import Hint from './Hint.jsx';
import Answer from './Answer.jsx';

// Fetch the country data from the json file
async function getCountryData() {
  let response = await fetch('/country_data.json');
  let data = await response.json();
  return data;
}

// Returns an object with the mapping: {country-code: 'Country name'}.
const countryData = await getCountryData();

// This will be our working array
const unguessedCountries = [];

const revealedCountries = {};

// Game setup
function setUpGame() {
  // Add all the country codes from
  for (let countryCode in countryData) {
    unguessedCountries.push(countryCode);
  }

  unguessedCountries.forEach((country) => {
    revealedCountries[country] = false;
  })

  shuffleArray(unguessedCountries);
  shuffleArray(unguessedCountries);
}

// JavaScript implementation of the Durstenfield shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

setUpGame();

export default function App() {
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0)
  /* const flagsCount = useMemo(() => unguessedCountries.length, []) // Using an empty dependency array to make sure our flagsCount never changes */
  const [flagsCount, setFlagsCount] = useState(unguessedCountries.length);
  const [hintVisible, setHintVisible] = useState(false);
  const [revealedCountries, setRevealedCountries] = useState({});

  function displayNextFlag() {
    setCurrentCountryIndex(currentCountryIndex+1)
    if (currentCountryIndex >= unguessedCountries.length - 1) setCurrentCountryIndex(0);
    setHintVisible(false);
    setInputValue('')
  }
  
  function displayPrevFlag() {
    setCurrentCountryIndex(currentCountryIndex-1)
    if (currentCountryIndex <= 0) setCurrentCountryIndex(unguessedCountries.length - 1);
    setHintVisible(false);
    setInputValue('')
  }

  function checkGuess(input) {
    input = input.toLowerCase().trim();
    const currentCountry = countryData[unguessedCountries[currentCountryIndex]];
    let isCorrect = false;

    for (const name of currentCountry["names"]) {
      if (name.toLowerCase().trim() === input) {
        isCorrect = true;
        break;
      }
    }
    if (isCorrect) {
      setScore(score+1);

      setHintVisible(false)
      let prevCountryIndex = currentCountryIndex;
      displayNextFlag();
      unguessedCountries.splice(prevCountryIndex, 1)
      setInputValue('');
    }
  }

  function handleInput(event) {
    setInputValue(event.target.value);
    checkGuess(event.target.value);
  }

  function revealAnswer() {
    if (revealedCountries[unguessedCountries[currentCountryIndex]]) return; // Return if the flag is already revealed

    let rc = structuredClone(revealedCountries); // Must use this notation. Component will not update with notation like: let arrayCopy = array
    console.log(rc)
    rc[unguessedCountries[currentCountryIndex]] = true;
    setRevealedCountries(rc);
    setFlagsCount(flagsCount-1);
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
    </>
  );
}