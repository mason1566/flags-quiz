export default function AnswerBox({onChange}) {
    return (
        <input type="text" className="d-block mt-5px" onChange={(event) => onChange(event.target.value)} />
    );
}