
import { TrendingUp, Clock, Trophy, Target, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const ProgressView = () => {
  const overallStats = [
    { label: "Courses Completed", value: "12", total: "15", icon: BookOpen, color: "text-blue-600" },
    { label: "Hours Studied", value: "48", total: "60", icon: Clock, color: "text-green-600" },
    { label: "Quizzes Passed", value: "28", total: "30", icon: Target, color: "text-purple-600" },
    { label: "Certificates Earned", value: "8", total: "12", icon: Award, color: "text-yellow-600" }
  ];

  const weeklyProgress = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 2.8 }
  ];

  const courseProgress = [
    { name: "Introduction to React", progress: 85, color: "bg-blue-500" },
    { name: "Advanced JavaScript", progress: 65, color: "bg-green-500" },
    { name: "UI/UX Design", progress: 92, color: "bg-purple-500" },
    { name: "Node.js Fundamentals", progress: 45, color: "bg-yellow-500" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
        <p className="text-gray-600">Track your learning journey and achievements</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          const percentage = (parseInt(stat.value) / parseInt(stat.total)) * 100;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}/{stat.total}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(0)}% Complete</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Weekly Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">{day.day}</p>
                <div className="bg-gray-200 rounded-lg h-24 flex items-end justify-center p-2">
                  <div 
                    className="bg-blue-500 rounded w-6 transition-all duration-500"
                    style={{ height: `${(day.hours / 4) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{day.hours}h</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {courseProgress.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <span className="text-sm text-gray-600">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
