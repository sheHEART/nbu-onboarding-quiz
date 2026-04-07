export default function ResultScreen({ score, total, onRestart }) {
  const percent = Math.round((score / total) * 100);

  let message;
  if (percent === 100) {
    message = "Perfect score! You're fully prepared to get started.";
  } else if (percent >= 80) {
    message = "Great job! You have a solid understanding of NBU.";
  } else if (percent >= 60) {
    message = "Good effort! Review the materials and try again if you'd like.";
  } else {
    message = "Keep learning! We recommend reviewing the onboarding guide.";
  }

  return (
    <div className="result-screen">
      <h2 className="result-title">Quiz Complete!</h2>
      <div className="score-circle">
        <span className="score-number">{score}</span>
        <span className="score-divider">/</span>
        <span className="score-total">{total}</span>
      </div>
      <p className="score-percent">{percent}%</p>
      <p className="result-message">{message}</p>
      <button className="restart-btn" onClick={onRestart}>
        Retake Quiz
      </button>
    </div>
  );
}
