
import { Play, Clock, Users, Star, BookOpen, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CoursesViewProps {
  onCourseSelect: (course: any) => void;
}

export const CoursesView = ({ onCourseSelect }: CoursesViewProps) => {
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Sarah Johnson",
      duration: "4 hours",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      students: 1234,
      rating: 4.8,
      status: "In Progress"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Mike Chen",
      duration: "6 hours",
      progress: 30,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      students: 2156,
      rating: 4.9,
      status: "In Progress"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Emma Wilson",
      duration: "5 hours",
      progress: 85,
      thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop",
      students: 987,
      rating: 4.7,
      status: "Almost Complete"
    }
  ];

  const completedCourses = [
    {
      id: 4,
      title: "HTML & CSS Basics",
      instructor: "John Smith",
      duration: "3 hours",
      progress: 100,
      thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop",
      students: 3421,
      rating: 4.6,
      status: "Completed",
      completedDate: "2024-06-15"
    },
    {
      id: 5,
      title: "Python for Beginners",
      instructor: "Alice Brown",
      duration: "8 hours",
      progress: 100,
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      students: 2876,
      rating: 4.8,
      status: "Completed",
      completedDate: "2024-05-20"
    }
  ];

  const CourseCard = ({ course, showProgress = true }: { course: any, showProgress?: boolean }) => (
    <div className="group cursor-pointer" onClick={() => onCourseSelect(course)}>
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {course.status && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
            course.status === 'Completed' ? 'bg-green-500 text-white' : 
            course.status === 'Almost Complete' ? 'bg-yellow-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            {course.status}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600">by {course.instructor}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.students}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </span>
        </div>
        
        {showProgress && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        {course.completedDate && (
          <p className="text-xs text-gray-500">Completed on {new Date(course.completedDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Manage and continue your learning</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search courses..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="in-progress">In Progress ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
          <TabsTrigger value="all">All Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} course={course} showProgress={false} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...enrolledCourses, ...completedCourses].map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
