import { useMemo, useState } from 'react';
import Game from './Game.jsx';
import EndScreen from './EndScreen.jsx';

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
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const totalFlags = useMemo(() => unguessedCountries.length, [])

  return (
    <>
      {(!isGameOver && <Game 
                          unguessedCountries={unguessedCountries} 
                          countryData={countryData} 
                          giveUpFunction={() => setIsGameOver(true)} 
                          score={score} 
                          setScore={setScore} />) 
        || <EndScreen score={score} totalFlags={totalFlags} countryData={countryData} />}
      
      
    </>
  );
}