import { useState } from "react";
import { questions } from "../data/questions";

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isAnswered = selectedOption !== null;
  const isCorrect =
    isAnswered && selectedOption === currentQuestion.correctIndex;

  function selectOption(index) {
    if (isAnswered) return;
    setSelectedOption(index);
  }

  function nextQuestion() {
    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, selected: selectedOption },
    ];
    setAnswers(newAnswers);

    if (currentIndex + 1 >= totalQuestions) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    }
  }

  function restart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsFinished(false);
  }

  const score = answers.filter(
    (a) => a.selected === questions.find((q) => q.id === a.questionId)?.correctIndex
  ).length;

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOption,
    isAnswered,
    isCorrect,
    isFinished,
    score,
    selectOption,
    nextQuestion,
    restart,
  };
}
