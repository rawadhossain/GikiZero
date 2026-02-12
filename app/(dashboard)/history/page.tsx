import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Award, TrendingUp, Target, Flame, Star } from "lucide-react"

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return <div>Not authenticated</div>
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      submissions: {
        orderBy: { createdAt: "desc" },
      },
      badges: {
        include: { badge: true },
        orderBy: { earnedAt: "desc" },
      },
    },
  })

  if (!user) {
    return <div>User not found</div>
  }

  // Calculate achievements
  const achievements = [
    {
      name: "First Steps",
      description: "Complete your first carbon footprint survey",
      icon: Target,
      earned: user.submissions.length >= 1,
      progress: Math.min(user.submissions.length, 1),
      total: 1,
    },
    {
      name: "Consistent Tracker",
      description: "Complete 5 surveys",
      icon: Calendar,
      earned: user.submissions.length >= 5,
      progress: Math.min(user.submissions.length, 5),
      total: 5,
    },
    {
      name: "Eco Warrior",
      description: "Complete 10 surveys",
      icon: Award,
      earned: user.submissions.length >= 10,
      progress: Math.min(user.submissions.length, 10),
      total: 10,
    },
    {
      name: "Streak Master",
      description: "Maintain a 7-day streak",
      icon: Flame,
      earned: user.longestStreak >= 7,
      progress: Math.min(user.longestStreak, 7),
      total: 7,
    },
    {
      name: "Point Collector",
      description: "Earn 500 eco points",
      icon: Star,
      earned: user.totalPoints >= 500,
      progress: Math.min(user.totalPoints, 500),
      total: 500,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History & Achievements</h1>
        <p className="text-muted-foreground">Track your progress and unlock achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.submissions.length}</div>
            <p className="text-xs text-muted-foreground">Completed assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.currentStreak}</div>
            <p className="text-xs text-muted-foreground">Days active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.longestStreak}</div>
            <p className="text-xs text-muted-foreground">Personal record</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.totalPoints}</div>
            <p className="text-xs text-muted-foreground">Points earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>Unlock badges by reaching sustainability milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className={`p-4 rounded-lg border ${
                  achievement.earned ? "bg-green-50 border-green-200" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <achievement.icon
                      className={`h-5 w-5 ${achievement.earned ? "text-green-600" : "text-muted-foreground"}`}
                    />
                    <h3 className="font-semibold">{achievement.name}</h3>
                  </div>
                  {achievement.earned && (
                    <Badge variant="default" className="bg-green-600">
                      Earned
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Submission History
          </CardTitle>
          <CardDescription>Your carbon footprint tracking timeline</CardDescription>
        </CardHeader>
        <CardContent>
          {user.submissions.length > 0 ? (
            <div className="space-y-4">
              {user.submissions.slice(0, 10).map((submission, index) => (
                <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {new Date(submission.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <Badge variant="outline">{submission.impactCategory}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Carbon Score: {submission.totalEmissionScore.toFixed(1)} kg CO₂
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">#{user.submissions.length - index}</div>
                  </div>
                </div>
              ))}
              {user.submissions.length > 10 && (
                <div className="text-center text-sm text-muted-foreground">
                  And {user.submissions.length - 10} more submissions...
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No submissions yet. Take your first survey to start tracking!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
