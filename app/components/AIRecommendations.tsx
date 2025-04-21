"use client"

import { useState } from "react"
import { Dumbbell, ChevronRight, ChevronDown, ThumbsUp, ThumbsDown } from "lucide-react"

const recommendations = [
  {
    id: 1,
    name: "High-Intensity Interval Training",
    description:
      "Boost your metabolism and burn fat with this HIIT workout. Perfect for your fitness goals and available time.",
    details:
      "This 30-minute HIIT workout alternates between 40 seconds of intense exercise and 20 seconds of rest. It includes jumping jacks, mountain climbers, burpees, and high knees to maximize calorie burn in a short time.",
    tags: ["Cardio", "Fat Loss", "Quick"],
  },
  {
    id: 2,
    name: "Strength Training for Beginners",
    description: "Build muscle and improve overall strength with this beginner-friendly routine.",
    details:
      "This full-body strength workout uses compound movements to build functional strength. It includes squats, push-ups, rows, and planks with modifications available for all fitness levels.",
    tags: ["Strength", "Beginner", "Full Body"],
  },
  {
    id: 3,
    name: "Yoga for Flexibility",
    description: "Increase your flexibility and reduce stress with this calming yoga session.",
    details:
      "This 45-minute yoga flow focuses on deep stretches for the hamstrings, hips, and shoulders - areas that tighten up from sitting. It ends with a 5-minute meditation to reduce stress.",
    tags: ["Flexibility", "Recovery", "Stress Relief"],
  },
]

export default function AIRecommendations() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">AI-Powered Workout Recommendations</h2>
      <p className="text-sm text-gray-600 mb-6">
        Personalized recommendations based on your fitness profile, goals, and workout history.
      </p>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={() => toggleExpand(rec.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="font-medium text-gray-900">{rec.name}</span>
                </div>
                {expandedId === rec.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </button>
            {expandedId === rec.id && (
              <div className="px-4 py-3 bg-white">
                <p className="text-gray-600 mb-3">{rec.description}</p>
                <p className="text-gray-600 mb-4">{rec.details}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {rec.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-500">
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500">
                      <ThumbsDown className="h-5 w-5" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors">
                    Start Workout
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
