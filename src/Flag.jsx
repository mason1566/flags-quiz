import './Flag.css';

export default function Flag({country, height="250px", className=""}) {
    return (
        <img src={`/flags/${country}.svg`} className={className + ' flag'} key={country} height={height} />
    );
}