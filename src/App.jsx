import { useState, useMemo } from 'react';
import Flag from './Flag.jsx';
import AnswerBox from './AnswerBox.jsx';
import Hint from './Hint.jsx';
import Answer from './Answer.jsx';

// Fetch the country data from the json file
async function getCountryData() {
  let response = await fetch('/country_names.json');
  let data = await response.json();
  return data;
}

const countryData = await getCountryData();

// This will be our working array
const unguessedCountries = [];

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
  const [hintVisible, setHintVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);

  function displayNextFlag() {
    setCurrentCountryIndex(currentCountryIndex+1)
    if (currentCountryIndex >= unguessedCountries.length - 1) setCurrentCountryIndex(0);
  }
  
  function displayPrevFlag() {
    setCurrentCountryIndex(currentCountryIndex-1)
    if (currentCountryIndex <= 0) setCurrentCountryIndex(unguessedCountries.length - 1);
  }

  function checkGuess(input) {
    let correct = countryData[unguessedCountries[currentCountryIndex]].toLowerCase().trim() === input.toLowerCase().trim();
    if (correct) {
      setScore(score+1);

      setHintVisible(false)
      let prevCountryIndex = currentCountryIndex;
      displayNextFlag();
      unguessedCountries.splice(prevCountryIndex, 1)
      setInputValue('');
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
    checkGuess(event.target.value);
  }

  return (
    <>
      <Flag country={unguessedCountries[currentCountryIndex]} />
      <div>
        <button type="button" onClick={displayPrevFlag}>Prev</button>
        <button type="button" onClick={displayNextFlag}>Next</button>
      </div>
      <AnswerBox onChange={handleInputChange} inputValue={inputValue} />
      <p>Score: {score}/{flagsCount}</p>
      <Hint countryCode={unguessedCountries[currentCountryIndex]} hintVisible={hintVisible} toggleHint={() => setHintVisible(!hintVisible)}/>
      <Answer answerVisible={answerVisible} showAnswer={() => setAnswerVisible(true)}>{countryData[unguessedCountries[currentCountryIndex]]}</Answer>
    </>
  );
}