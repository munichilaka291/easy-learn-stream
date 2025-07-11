
import { Trophy, Award, Target, Zap, Star, Crown, Medal, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const AchievementsView = () => {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      earned: true,
      earnedDate: "2024-05-15",
      points: 100
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete 5 courses in a month",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      earned: true,
      earnedDate: "2024-06-10",
      points: 250
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Get 100% on 10 quizzes",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
      earned: true,
      earnedDate: "2024-06-20",
      points: 200
    },
    {
      id: 4,
      title: "Streak Master",
      description: "Study for 30 days straight",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      earned: false,
      progress: 75,
      currentStreak: 23,
      target: 30,
      points: 500
    },
    {
      id: 5,
      title: "Course Collector",
      description: "Complete 20 courses",
      icon: Medal,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      earned: false,
      progress: 60,
      current: 12,
      target: 20,
      points: 400
    },
    {
      id: 6,
      title: "Knowledge Seeker",
      description: "Study for 100 hours total",
      icon: Star,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      earned: false,
      progress: 48,
      current: 48,
      target: 100,
      points: 300
    }
  ];

  const stats = [
    { label: "Total Points", value: "1,850", icon: Gift },
    { label: "Achievements Unlocked", value: "3", total: "12", icon: Award },
    { label: "Current Level", value: "5", icon: Crown },
    { label: "Next Level Progress", value: "65%", icon: Target }
  ];

  const recentAchievements = achievements.filter(a => a.earned).slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your learning milestones and rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.total && <span className="text-base text-gray-500">/{stat.total}</span>}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${achievement.bgColor}`}>
                    <Icon className={`h-5 w-5 ${achievement.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-xs text-gray-500">
                      Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary">+{achievement.points}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>All Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.id} 
                  className={`p-6 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${achievement.bgColor} ${
                      !achievement.earned && 'opacity-50'
                    }`}>
                      <Icon className={`h-6 w-6 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        {achievement.earned ? (
                          <Badge className="bg-green-500">Earned</Badge>
                        ) : (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      
                      {achievement.earned ? (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600 font-medium">
                            Completed {new Date(achievement.earnedDate!).toLocaleDateString()}
                          </span>
                          <span className="text-gray-500">+{achievement.points} points</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {achievement.current || achievement.currentStreak}/{achievement.target} 
                              ({achievement.progress}%)
                            </span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Keep going!</span>
                            <span>+{achievement.points} points when completed</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
