import { useState, useMemo } from 'react';
import Flag from './Flag.jsx';
import AnswerBox from './AnswerBox.jsx';

// Fetch the country data from the json file
async function getCountryData() {
  let response = await fetch('/country_names.json');
  let data = await response.json();
  return data;
}

const countryData = await getCountryData();

// This will be our working array
let unguessedCountries = [];

// Game setup
function setUpGame() {
  for (let countryCode in countryData) {
    unguessedCountries.push(countryCode);
  }

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
  const flagsCount = useMemo(() => unguessedCountries.length, []) // Using an empty dependency array to make sure our flagsCount never changes 

  function displayNextFlag() {
    setCurrentCountryIndex(currentCountryIndex+1)
    if (currentCountryIndex >= unguessedCountries.length - 1) setCurrentCountryIndex(0);
  }
  
  function displayPrevFlag() {
    setCurrentCountryIndex(currentCountryIndex-1)
    if (currentCountryIndex <= 0) setCurrentCountryIndex(unguessedCountries.length - 1);
  }

  function checkGuess() {

  }

  return (
    <>
      <Flag country={unguessedCountries[currentCountryIndex]} />
      <div>
        <button type="button" onClick={displayPrevFlag} >Prev</button>
        <button type="button" onClick={displayNextFlag} >Next</button>
      </div>
      <AnswerBox onChange={setInputValue} />
      <p>Score: {score}/{flagsCount}</p>
    </>
  );
}