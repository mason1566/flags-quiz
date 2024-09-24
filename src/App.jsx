import Flag from './Flag.jsx';
import AnswerBox from './AnswerBox.jsx';

async function getCountryData() {
  let response = await fetch('/country_names.json');
  let data = await response.json();
  return data;
}

let country_data = await getCountryData();

export default function App() {
  console.log(country_data);

  return (
    <>
      <Flag />
      <AnswerBox />
    </>
  );
}