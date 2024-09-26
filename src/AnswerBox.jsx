export default function AnswerBox({onChange, inputValue, disabled}) {
    return (
        <input type="text" className="mt-5px" onChange={onChange} value={inputValue} disabled={disabled} />
    );
}