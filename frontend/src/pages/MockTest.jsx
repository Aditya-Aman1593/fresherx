import React, { useState, useEffect, useRef } from 'react';
import Camera from '../components/Functional/Camera';

const questions = [
  // --- Your original questions ---
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
    options: [
      "Depth-First Search",
      "Dijkstra's Algorithm",
      "Prim's Algorithm",
      "Kruskal's Algorithm",
    ],
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
  // --- New additional questions ---
  {
    question: "Which traversal method is used for Depth First Search (DFS)?",
    options: ["Inorder", "Preorder", "Postorder", "Any"],
    answer: "Any",
  },
  {
    question: "Which data structure is ideal for implementing undo operations?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    answer: "Stack",
  },
  {
    question: "In a min-heap, the minimum element is at which position?",
    options: ["Leaf node", "Root", "Middle", "Depends"],
    answer: "Root",
  },
  {
    question: "Which of the following algorithms is not greedy?",
    options: ["Kruskal's Algorithm", "Prim's Algorithm", "Dijkstra's Algorithm", "Bellman-Ford Algorithm"],
    answer: "Bellman-Ford Algorithm",
  },
];

function MockTest() {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [cheatingDetected, setCheatingDetected] = useState(false);

  const intervalRef = useRef(null);

  // Fullscreen
  useEffect(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !submitted) {
        // User exited full screen
        terminateTestDueToCheating("You exited fullscreen. Test terminated!");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [submitted]);

  // Timer Countdown
  useEffect(() => {
    if (submitted) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [submitted]);

  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let newScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
    clearInterval(intervalRef.current);
    document.exitFullscreen?.();
  };

  const terminateTestDueToCheating = (reason) => {
    setScore(0);
    setSubmitted(true);
    clearInterval(intervalRef.current);
    document.exitFullscreen?.();
    setCheatingDetected(reason);
  };

  const handleInvalidDetection = (invalidCount) => {
    if (invalidCount >= 5 && !submitted) {
      terminateTestDueToCheating("Cheating detected (multiple persons or movement). Test terminated!");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4">
      <Camera onInvalidDetection={handleInvalidDetection} />
      <h1 className="text-3xl font-bold text-center mb-4">Data Structures & Algo Test</h1>

      {/* Timer */}
      {!submitted && (
        <div className="text-center text-xl mb-4 font-semibold text-red-600">
          Time Left: {formatTime(timeLeft)}
        </div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <p className="text-lg font-medium">
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
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Submit Test
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-6 p-6 border rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Test Result</h2>
          {cheatingDetected ? (
            <p className="text-xl text-red-500 mb-2">{cheatingDetected}</p>
          ) : (
            <p className="text-xl">Your score: {score} out of {questions.length}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MockTest;
