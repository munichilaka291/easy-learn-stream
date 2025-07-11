
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { CoursePlayer } from "@/components/CoursePlayer";
import { QuizView } from "@/components/QuizView";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'course' | 'quiz'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('course');
  };

  const handleQuizSelect = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentView('quiz');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourse(null);
    setSelectedQuiz(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onBackToDashboard={handleBackToDashboard} currentView={currentView} />
      
      <div className="flex">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onBackToDashboard={handleBackToDashboard}
        />
        
        <main className="flex-1 p-6 ml-64">
          {currentView === 'dashboard' && (
            <Dashboard 
              onCourseSelect={handleCourseSelect}
              onQuizSelect={handleQuizSelect}
            />
          )}
          
          {currentView === 'course' && selectedCourse && (
            <CoursePlayer 
              course={selectedCourse}
              onBack={handleBackToDashboard}
            />
          )}
          
          {currentView === 'quiz' && selectedQuiz && (
            <QuizView 
              quiz={selectedQuiz}
              onBack={handleBackToDashboard}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
