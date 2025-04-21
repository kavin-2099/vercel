import { Activity, Flame, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Workouts Completed",
    value: 12,
    change: "+3 this week",
    icon: Activity,
    color: "bg-primary-500",
    trend: "up",
  },
  {
    name: "Calories Burned",
    value: "3,500",
    change: "15% increase",
    icon: Flame,
    color: "bg-red-500",
    trend: "up",
  },
  {
    name: "Total Time",
    value: "8h 30m",
    change: "2h more than last week",
    icon: Clock,
    color: "bg-green-500",
    trend: "up",
  },
  {
    name: "Progress",
    value: "15%",
    change: "Toward monthly goal",
    icon: TrendingUp,
    color: "bg-purple-500",
    trend: "neutral",
  },
]

export default function DashboardStats() {
  return (
    <>
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.trend === "up"
                          ? "text-green-600"
                          : stat.trend === "down"
                            ? "text-red-600"
                            : "text-gray-500"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
