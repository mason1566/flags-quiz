export default function EndScreen({score, totalFlags}) {
    return (
        <>
            <h1>LOSER!</h1>
            <p>You got {score}/{totalFlags}!</p>
        </>
    );
}