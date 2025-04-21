import DashboardStats from "./components/DashboardStats"
import WorkoutProgress from "./components/WorkoutProgress"
import RecentWorkouts from "./components/RecentWorkouts"
import AIRecommendations from "./components/AIRecommendations"
import { Activity, Calendar, TrendingUp, Award, Users } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">Welcome back, John!</h1>
        <div className="text-sm text-gray-500">
          Last workout: <span className="font-medium text-primary-600">Upper Body Strength, Yesterday</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          href="/workouts"
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-primary-50 transition-colors border border-gray-100"
        >
          <div className="p-3 rounded-full bg-primary-100 text-primary-600 mb-3">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-gray-900">Start Workout</span>
        </Link>

        <Link
          href="/schedule"
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-primary-50 transition-colors border border-gray-100"
        >
          <div className="p-3 rounded-full bg-green-100 text-green-600 mb-3">
            <Calendar className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-gray-900">Schedule</span>
        </Link>

        <Link
          href="/progress"
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-primary-50 transition-colors border border-gray-100"
        >
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
            <TrendingUp className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-gray-900">Progress</span>
        </Link>

        <Link
          href="/achievements"
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:bg-primary-50 transition-colors border border-gray-100"
        >
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-3">
            <Award className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-gray-900">Achievements</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WorkoutProgress />
        <RecentWorkouts />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AIRecommendations />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Community Activity</h2>
          <div className="space-y-4">
            {[
              {
                user: "Sarah J.",
                action: "completed a 5K run",
                time: "2 hours ago",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                user: "Mike T.",
                action: "achieved a new PR on bench press",
                time: "5 hours ago",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                user: "Emma W.",
                action: "shared a new workout routine",
                time: "Yesterday",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                user: "David K.",
                action: 'earned the "30-Day Streak" badge',
                time: "Yesterday",
                avatar: "/placeholder.svg?height=40&width=40",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={activity.avatar || "/placeholder.svg"}
                    alt={activity.user}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/community"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              View Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
