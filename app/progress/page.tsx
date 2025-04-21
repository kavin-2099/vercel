"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, ArrowUp, ArrowDown, Activity, Dumbbell, Scale, Ruler, ChevronDown } from "lucide-react"

// Sample data for charts
const weightData = [
  { date: "1/1", weight: 185 },
  { date: "1/8", weight: 183 },
  { date: "1/15", weight: 181 },
  { date: "1/22", weight: 182 },
  { date: "1/29", weight: 180 },
  { date: "2/5", weight: 178 },
  { date: "2/12", weight: 177 },
  { date: "2/19", weight: 176 },
  { date: "2/26", weight: 175 },
  { date: "3/5", weight: 174 },
  { date: "3/12", weight: 173 },
]

const strengthData = [
  { exercise: "Bench Press", previous: 185, current: 195 },
  { exercise: "Squat", previous: 225, current: 245 },
  { exercise: "Deadlift", previous: 275, current: 295 },
  { exercise: "Shoulder Press", previous: 115, current: 125 },
  { exercise: "Pull-ups", previous: 8, current: 10 },
]

const workoutDistribution = [
  { name: "Strength", value: 45, color: "#0072f5" },
  { name: "Cardio", value: 30, color: "#00c853" },
  { name: "Flexibility", value: 15, color: "#aa00ff" },
  { name: "Recovery", value: 10, color: "#ff6d00" },
]

const bodyMeasurements = [
  { part: "Chest", current: 42, previous: 41, unit: "in" },
  { part: "Waist", current: 32, previous: 34, unit: "in" },
  { part: "Hips", current: 38, previous: 39, unit: "in" },
  { part: "Arms", current: 15, previous: 14.5, unit: "in" },
  { part: "Thighs", current: 23, previous: 22.5, unit: "in" },
]

const calorieData = [
  { day: "Mon", calories: 2200, goal: 2500 },
  { day: "Tue", calories: 2350, goal: 2500 },
  { day: "Wed", calories: 2400, goal: 2500 },
  { day: "Thu", calories: 2300, goal: 2500 },
  { day: "Fri", calories: 2450, goal: 2500 },
  { day: "Sat", calories: 2600, goal: 2500 },
  { day: "Sun", calories: 2700, goal: 2500 },
]

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("3 Months")
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Progress Tracking</h1>

        <div className="relative">
          <button
            onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {timeRange}
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {showTimeRangeDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              {["1 Month", "3 Months", "6 Months", "1 Year", "All Time"].map((range) => (
                <button
                  key={range}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    timeRange === range ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setTimeRange(range)
                    setShowTimeRangeDropdown(false)
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <Scale className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Current Weight</h2>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">173 lbs</p>
                <div className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowDown className="h-4 w-4" />
                  <span>12 lbs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Activity className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Workouts Completed</h2>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">48</p>
                <div className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-4 w-4" />
                  <span>8 more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Dumbbell className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Weight Lifted</h2>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">24,350 lbs</p>
                <div className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-4 w-4" />
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Ruler className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Body Fat</h2>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">15.2%</p>
                <div className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowDown className="h-4 w-4" />
                  <span>2.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Progress Chart */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Weight Progress</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#0072f5" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strength Progress and Workout Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Strength Progress</h2>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={strengthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="exercise" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="previous" name="Previous" fill="#94a3b8" />
                  <Bar dataKey="current" name="Current" fill="#0072f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Workout Distribution</h2>
          </div>
          <div className="p-6">
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workoutDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {workoutDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Body Measurements and Calorie Intake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Body Measurements</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Body Part
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Previous
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bodyMeasurements.map((measurement, index) => {
                    const change = measurement.current - measurement.previous
                    const isPositive = change > 0
                    const isNegative = change < 0

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {measurement.part}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {measurement.current} {measurement.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {measurement.previous} {measurement.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`flex items-center ${
                              isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-gray-500"
                            }`}
                          >
                            {isPositive && <ArrowUp className="h-4 w-4 mr-1" />}
                            {isNegative && <ArrowDown className="h-4 w-4 mr-1" />}
                            {change === 0 ? "No change" : `${Math.abs(change)} ${measurement.unit}`}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Calorie Intake (Last Week)</h2>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calorieData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calories" name="Calories Consumed" fill="#0072f5" />
                  <Bar dataKey="goal" name="Calorie Goal" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Tracking */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Fitness Goals</h2>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-600">
            Add New Goal
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {[
              { name: "Lose 20 lbs", progress: 60, target: "September 30, 2023", category: "Weight Loss" },
              { name: "Bench Press 225 lbs", progress: 85, target: "August 15, 2023", category: "Strength" },
              { name: "Run a 10K", progress: 40, target: "October 10, 2023", category: "Cardio" },
              { name: "Complete 100 Workouts", progress: 48, target: "December 31, 2023", category: "Consistency" },
            ].map((goal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{goal.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Target: {goal.target}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.category === "Weight Loss"
                          ? "bg-red-100 text-red-800"
                          : goal.category === "Strength"
                            ? "bg-blue-100 text-blue-800"
                            : goal.category === "Cardio"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {goal.category}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        goal.category === "Weight Loss"
                          ? "bg-red-500"
                          : goal.category === "Strength"
                            ? "bg-blue-500"
                            : goal.category === "Cardio"
                              ? "bg-green-500"
                              : "bg-purple-500"
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
