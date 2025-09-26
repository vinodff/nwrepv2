import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SmartQuizGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the correct way to define a function in Python?",
      options: [
        "function myFunc():",
        "def myFunc():",
        "define myFunc():",
        "func myFunc():"
      ],
      correctAnswer: 1,
      explanation: "In Python, functions are defined using the 'def' keyword followed by the function name and parentheses."
    },
    {
      id: 2,
      question: "Which of the following is a mutable data type in Python?",
      options: [
        "String",
        "Tuple",
        "List",
        "Integer"
      ],
      correctAnswer: 2,
      explanation: "Lists are mutable in Python, meaning their contents can be changed after creation. Strings, tuples, and integers are immutable."
    },
    {
      id: 3,
      question: "What does the 'return' statement do in a Python function?",
      options: [
        "Prints a value to the console",
        "Ends the program execution",
        "Sends a value back to the caller",
        "Creates a new variable"
      ],
      correctAnswer: 2,
      explanation: "The 'return' statement sends a value back to the code that called the function, allowing functions to produce output."
    }
  ];

  const generateQuiz = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (!quizStarted) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Generated Quiz</h3>
          <p className="text-gray-600 mb-6">
            Test your understanding of Python concepts with questions tailored to your learning progress
          </p>
          
          {isGenerating ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-orange-600 font-medium">Analyzing your notes and generating personalized questions...</p>
            </div>
          ) : (
            <button
              onClick={generateQuiz}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
            >
              <Brain className="w-5 h-5" />
              <span>Generate Quiz</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Complete!</h3>
          <p className="text-2xl font-bold text-green-600 mb-2">{score}/{questions.length}</p>
          <p className="text-gray-600">You scored {percentage}%</p>
        </div>

        <div className="space-y-4 mb-6">
          {questions.map((question, index) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Your answer:</span> {question.options[selectedAnswers[index]]}
                  </p>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-600 mb-2">
                      <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 italic">{question.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-3">
          <button
            onClick={resetQuiz}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <button
            onClick={generateQuiz}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Brain className="w-4 h-4" />
            <span>New Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Quiz</h3>
            <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
          Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-orange-500 bg-orange-50 text-orange-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default SmartQuizGenerator;