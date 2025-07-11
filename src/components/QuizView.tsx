
import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizViewProps {
  quiz: any;
  onBack: () => void;
}

export const QuizView = ({ quiz, onBack }: QuizViewProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const questions = [
    {
      id: 1,
      question: "What is JSX in React?",
      options: [
        "A JavaScript extension that allows HTML-like code in JavaScript",
        "A CSS framework for styling React components",
        "A state management library for React",
        "A testing framework for React applications"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "What is the purpose of useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create custom hooks",
        "To optimize component rendering"
      ],
      correct: 1
    },
    {
      id: 4,
      question: "How do you pass data from parent to child component?",
      options: [
        "Using state",
        "Using context",
        "Using props",
        "Using refs"
      ],
      correct: 2
    },
    {
      id: 5,
      question: "What is the virtual DOM?",
      options: [
        "A real DOM element",
        "A JavaScript representation of the actual DOM",
        "A CSS framework",
        "A state management tool"
      ],
      correct: 1
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] || "");
    } else {
      // Quiz completed
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">{percentage}%</div>
              <p className="text-gray-600">
                You scored {score} out of {questions.length} questions correctly
              </p>
            </div>

            <div className="space-y-4">
              <Progress value={percentage} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-semibold text-green-700">Correct</div>
                  <div className="text-green-600">{score} questions</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="font-semibold text-red-700">Incorrect</div>
                  <div className="text-red-600">{questions.length - score} questions</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <Button onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setSelectedAnswer("");
                setShowResult(false);
              }}>
                Retake Quiz
              </Button>
              <Button variant="outline" onClick={onBack}>
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <Card>
          <CardHeader>
            <CardTitle>Review Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = parseInt(answers[index]);
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">{question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserChoice = userAnswer === optionIndex;
                        const isCorrectAnswer = question.correct === optionIndex;
                        
                        return (
                          <div 
                            key={optionIndex}
                            className={`p-2 rounded flex items-center space-x-2 ${
                              isCorrectAnswer 
                                ? 'bg-green-50 border border-green-200' 
                                : isUserChoice && !isCorrect
                                ? 'bg-red-50 border border-red-200'
                                : 'bg-gray-50'
                            }`}
                          >
                            {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {isUserChoice && !isCorrect && <XCircle className="h-4 w-4 text-red-600" />}
                            <span className={
                              isCorrectAnswer 
                                ? 'text-green-700 font-medium' 
                                : isUserChoice && !isCorrect
                                ? 'text-red-700'
                                : 'text-gray-700'
                            }>
                              {option}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Quiz Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{quiz.title}</CardTitle>
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleAnswerSelect(index.toString())}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
