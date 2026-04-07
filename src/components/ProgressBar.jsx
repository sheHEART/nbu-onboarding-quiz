export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-label">
        Question {current} of {total}
      </span>
    </div>
  );
}
