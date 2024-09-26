import Flag from './Flag.jsx';

export default function EndScreen({score, totalFlags, countryData}) {

    // Generate flag cards
    let countryCodes = [];

    for (let code in countryData) {
        countryCodes.push(code)
    }

    let countries = countryCodes.map(code => (
        <tr>
            <th className="flex-row"><span>{countryData[code]["names"][0]}:</span></th>
            <td className="flex-row align-center"><Flag country={code} height='80px' className="mt-5px" /></td>
        </tr>
    ))


    return (
        <>
            <h1>You got {score}/{totalFlags}!</h1>
            <table>
                <tbody>{countries}</tbody>
            </table>
        </>
    );
}