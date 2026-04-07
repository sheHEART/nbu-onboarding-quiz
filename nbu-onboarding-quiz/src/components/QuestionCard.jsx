export default function QuestionCard({
  question,
  selectedOption,
  onSelect,
}) {
  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <ul className="options-list">
        {question.options.map((option, index) => {
          let className = "option";
          if (selectedOption !== null) {
            if (index === question.correctIndex) {
              className += " correct";
            } else if (index === selectedOption) {
              className += " incorrect";
            }
          } else if (index === selectedOption) {
            className += " selected";
          }

          return (
            <li key={index}>
              <button className={className} onClick={() => onSelect(index)}>
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            </li>
          );
        })}
      </ul>
      {selectedOption !== null && (
        <p className="explanation">{question.explanation}</p>
      )}
    </div>
  );
}
