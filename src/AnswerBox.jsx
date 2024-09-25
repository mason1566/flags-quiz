export default function AnswerBox({onChange, inputValue}) {
    return (
        <input type="text" className="d-block mt-5px" onChange={onChange} value={inputValue} />
    );
}