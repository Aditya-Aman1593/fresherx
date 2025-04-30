import React, { useState, useEffect } from 'react';

const questions = [
  {
    question: "What is the time complexity of binary search in a sorted array?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)",
  },
  {
    question: "Which data structure is used in a breadth-first search (BFS) algorithm?",
    options: ["Stack", "Queue", "Heap", "Graph"],
    answer: "Queue",
  },
  {
    question: "What is the worst-case time complexity of quicksort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: "O(n²)",
  },
  {
    question: "Which of the following is a self-balancing binary search tree?",
    options: ["Binary Tree", "AVL Tree", "Heap", "Trie"],
    answer: "AVL Tree",
  },
  {
    question: "What is the space complexity of merge sort?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
    answer: "O(n)",
  },
  {
    question: "Which data structure uses the LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    answer: "Stack",
  },
  {
    question: "What is the time complexity to search in a balanced binary search tree (BST)?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    answer: "O(log n)",
  },
  {
    question: "Which algorithm is used to find the shortest path in a weighted graph?",
    options: ["Depth-First Search", "Dijkstra's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm"],
    answer: "Dijkstra's Algorithm",
  },
  {
    question: "Which of the following sorting algorithms is stable?",
    options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
    answer: "Merge Sort",
  },
  {
    question: "Which data structure is used to implement recursion?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: "Stack",
  },
];

function PracticeMcq() {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 10 minutes (600 seconds)
  const [autoSubmitted, setAutoSubmitted] = useState(false); // new

  // Timer
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setAutoSubmitted(true); // show "Auto Submitted"
          handleSubmit(null, userAnswers); // pass latest answers
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, userAnswers]);

  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = (e, latestUserAnswers = userAnswers) => {
    if (e) e.preventDefault();
    let newScore = 0;
    questions.forEach((q, index) => {
      if (latestUserAnswers[index] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Data Structures & Algo Test</h1>

      {!submitted && (
        <div className="text-center mb-4 text-xl">
          Time Remaining: <span className="font-bold text-red-600">{formatTime(timeLeft)}</span>
        </div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <p className="text-xl font-medium mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="mt-2">
                {q.options.map((option, idx) => (
                  <label key={idx} className="block mb-1">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                      checked={userAnswers[index] === option}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Submit Test
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-6 p-4">
          {autoSubmitted && (
            <div className="text-red-600 text-lg mb-2 font-semibold">
              Time is up! Test auto-submitted.
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4">Test Result</h2>
          <p className="text-xl mb-6">Your score: {score} out of {questions.length}</p>

          <div className="text-left space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="p-4 border rounded-lg shadow">
                <p className="text-lg font-semibold mb-2">{index + 1}. {q.question}</p>

                <div className="mb-2">
                  <span className="font-medium">Your Answer: </span>
                  <span className={`font-bold ${userAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                    {userAnswers[index] || "Not Answered"}
                  </span>
                </div>

                <div>
                  <span className="font-medium">Correct Answer: </span>
                  <span className="font-bold text-green-600">
                    {q.answer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticeMcq;
