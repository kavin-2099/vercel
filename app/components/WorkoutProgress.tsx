"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Calendar, ChevronDown } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function WorkoutProgress() {
  const [timeRange, setTimeRange] = useState("This Week")
  const [showDropdown, setShowDropdown] = useState(false)

  const [data] = useState({
    labels,
    datasets: [
      {
        label: "Workout Duration (minutes)",
        data: [45, 60, 0, 75, 45, 90, 0],
        backgroundColor: "rgba(0, 114, 245, 0.7)",
        borderRadius: 6,
      },
    ],
  })

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Workout Progress</h2>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {timeRange}
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              {["Today", "This Week", "This Month", "Last Month", "This Year"].map((range) => (
                <button
                  key={range}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    timeRange === range ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setTimeRange(range)
                    setShowDropdown(false)
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Bar options={options} data={data} height={240} />

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="bg-primary-50 rounded-lg p-3">
          <p className="text-sm text-gray-500">Total Duration</p>
          <p className="text-xl font-semibold text-primary-700">5h 15m</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-sm text-gray-500">Workouts Completed</p>
          <p className="text-xl font-semibold text-green-700">5/7</p>
        </div>
      </div>
    </div>
  )
}
