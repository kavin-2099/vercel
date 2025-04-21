import { Calendar, Clock, Flame, ChevronRight } from "lucide-react"
import Link from "next/link"

const workouts = [
  {
    id: 1,
    name: "Full Body Workout",
    date: "Today",
    duration: "45 min",
    calories: "320",
    intensity: "Medium",
  },
  {
    id: 2,
    name: "Upper Body Strength",
    date: "Yesterday",
    duration: "60 min",
    calories: "450",
    intensity: "High",
  },
  {
    id: 3,
    name: "HIIT Cardio",
    date: "2 days ago",
    duration: "30 min",
    calories: "280",
    intensity: "High",
  },
  {
    id: 4,
    name: "Leg Day",
    date: "3 days ago",
    duration: "50 min",
    calories: "380",
    intensity: "Medium",
  },
]

export default function RecentWorkouts() {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
        <Link href="/workouts" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="flow-root">
        <ul className="-my-5 divide-y divide-gray-200">
          {workouts.map((workout) => (
            <li key={workout.id} className="py-4 hover:bg-gray-50 rounded-md transition-colors px-3">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-primary-100 p-2 rounded-md">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{workout.name}</p>
                  <p className="text-xs text-gray-500">{workout.date}</p>
                </div>
                <div className="flex space-x-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {workout.duration}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Flame className="h-4 w-4 mr-1 text-red-400" />
                    {workout.calories} cal
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        workout.intensity === "High"
                          ? "bg-red-100 text-red-800"
                          : workout.intensity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {workout.intensity}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/workouts/create"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          Create new workout
        </Link>
      </div>
    </div>
  )
}
