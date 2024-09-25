import './Flag.css';

export default function Flag({country}) {
    return (
        <img src={`/flags/${country}.svg`} className='flag' key={country} height="250px" />
    );
}