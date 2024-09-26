import './Flag.css';

export default function Flag({country, height="250px"}) {
    return (
        <img src={`/flags/${country}.svg`} className='flag' key={country} height={height} />
    );
}