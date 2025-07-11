
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, ArrowLeft, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface CoursePlayerProps {
  course: any;
  onBack: () => void;
}

export const CoursePlayer = ({ course, onBack }: CoursePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(80);
  const videoRef = useRef<HTMLVideoElement>(null);

  const lessons = [
    { id: 1, title: "Introduction to React", duration: "15:30", completed: true },
    { id: 2, title: "Components and Props", duration: "22:45", completed: true },
    { id: 3, title: "State and Lifecycle", duration: "18:20", completed: false },
    { id: 4, title: "Handling Events", duration: "12:15", completed: false },
    { id: 5, title: "Conditional Rendering", duration: "16:40", completed: false }
  ];

  const [currentLesson, setCurrentLesson] = useState(0);
  const [note, setNote] = useState("");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative bg-black rounded-t-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
                  onTimeUpdate={handleTimeUpdate}
                >
                  <source src="#" type="video/mp4" />
                </video>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="space-y-2">
                    <Progress value={currentTime} className="h-1" />
                    
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipForward className="h-4 w-4" />
                        </Button>
                        
                        <span className="text-sm">8:45 / 15:30</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4" />
                        <div className="w-20">
                          <Progress value={volume} className="h-1" />
                        </div>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{lessons[currentLesson].title}</h2>
                <p className="text-gray-600">Learn the fundamentals of React components and how they work together.</p>
              </div>
            </CardContent>
          </Card>

          {/* Course Content Tabs */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">What you'll learn</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Understanding React components</li>
                      <li>• Working with props and state</li>
                      <li>• Handling user interactions</li>
                      <li>• Component lifecycle methods</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Take Notes</h3>
                    <Textarea
                      placeholder="Write your notes here..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-32"
                    />
                    <Button>Save Note</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussion" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Discussion</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">Sarah M.</span>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-gray-700">Great explanation of React components! The examples really helped me understand.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Course Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">65%</div>
                  <p className="text-gray-600">Complete</p>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-gray-600">2 of 5 lessons completed</p>
              </div>
            </CardContent>
          </Card>

          {/* Lesson List */}
          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      index === currentLesson 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                      {index === currentLesson && (
                        <Play className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
