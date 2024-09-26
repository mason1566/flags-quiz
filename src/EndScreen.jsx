import Flag from './Flag.jsx';

export default function EndScreen({score, totalFlags, countryData}) {

    // Generate flag cards
    let countryCodes = [];

    for (let code in countryData) {
        countryCodes.push(code)
    }

    let countries = countryCodes.map(code => (
        <li key={code}>
            <div className="flex-row align-center">
                <span>{countryData[code]["names"][0]}</span>
                <Flag country={code} height='80px' className="ml-5px mt-5px" />
            </div>
        </li>
    ))


    return (
        <>
            <h1>You got {score}/{totalFlags}!</h1>
            <ul>
                {countries}
            </ul>
        </>
    );
}