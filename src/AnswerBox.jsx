export default function AnswerBox({onChange, inputValue}) {
    return (
        <input type="text" className="mt-5px" onChange={onChange} value={inputValue} />
    );
}