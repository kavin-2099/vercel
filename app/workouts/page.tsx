"use client"

import { useState } from "react"
import { Calendar, Clock, Filter, Plus, ChevronDown, Search, Dumbbell, Heart, Share2, BookmarkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample workout plans data with images
const workoutPlans = [
  {
    id: 1,
    name: "12-Week Strength Builder",
    description: "Progressive strength training program designed to build muscle and increase overall strength.",
    workoutsCount: 36,
    duration: "45-60 min",
    level: "Intermediate",
    category: "Strength",
    image: "/placeholder.svg?height=200&width=300",
    trainer: "Alex Johnson",
    trainerImage: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    reviews: 124,
    isFavorite: false,
  },
  {
    id: 2,
    name: "30-Day HIIT Challenge",
    description: "High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.",
    workoutsCount: 30,
    duration: "20-30 min",
    level: "Advanced",
    category: "Cardio",
    image: "/placeholder.svg?height=200&width=300",
    trainer: "Maria Garcia",
    trainerImage: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    reviews: 89,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Beginner's Fitness Journey",
    description: "Perfect for newcomers to fitness, focusing on proper form and building a foundation.",
    workoutsCount: 24,
    duration: "30-45 min",
    level: "Beginner",
    category: "Full Body",
    image: "/placeholder.svg?height=200&width=300",
    trainer: "John Smith",
    trainerImage: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    reviews: 156,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Core Crusher",
    description: "Targeted core workouts to strengthen your abs, lower back, and improve posture.",
    workoutsCount: 16,
    duration: "15-20 min",
    level: "Intermediate",
    category: "Core",
    image: "/placeholder.svg?height=200&width=300",
    trainer: "Sarah Williams",
    trainerImage: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    reviews: 78,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Yoga Flow Series",
    description: "Improve flexibility, balance, and mental clarity with this progressive yoga program.",
    workoutsCount: 20,
    duration: "30-45 min",
    level: "All Levels",
    category: "Flexibility",
    image: "/placeholder.svg?height=200&width=300",
    trainer: "Emma Chen",
    trainerImage: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    reviews: 112,
    isFavorite: true,
  },
  {
    id: 6,
    name: "Powerlifting Fundamentals",
    description: "Master the squat, bench press, and deadlift with this strength-focused program.",
    workoutsCount: 24,
    duration: "60-75 min",
    level: "Advanced",
    category: "Strength",
    image: "/placeholder.svg?height=200&width=300",
    trainer: "Mike Johnson",
    trainerImage: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    reviews: 95,
    isFavorite: false,
  },
]

// Sample upcoming workouts
const upcomingWorkouts = [
  {
    id: 1,
    name: "Upper Body Strength",
    date: "Today",
    time: "5:00 PM",
    duration: "45 min",
    image: "/placeholder.svg?height=100&width=100",
    exercises: ["Bench Press", "Shoulder Press", "Pull-ups", "Bicep Curls"],
  },
  {
    id: 2,
    name: "Cardio Session",
    date: "Tomorrow",
    time: "7:30 AM",
    duration: "30 min",
    image: "/placeholder.svg?height=100&width=100",
    exercises: ["Treadmill", "Jump Rope", "Burpees", "Mountain Climbers"],
  },
  {
    id: 3,
    name: "Leg Day",
    date: "Jun 10",
    time: "6:00 PM",
    duration: "60 min",
    image: "/placeholder.svg?height=100&width=100",
    exercises: ["Squats", "Deadlifts", "Lunges", "Leg Press"],
  },
]

export default function WorkoutsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([2, 5]) // IDs of initially favorited workouts
  const [showModal, setShowModal] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const openWorkoutDetails = (workout: any) => {
    setSelectedWorkout(workout)
    setShowModal(true)
  }

  const filteredWorkouts = workoutPlans.filter(
    (workout) =>
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || workout.category === selectedCategory),
  )

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
        <Link
          href="/workouts/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-1" /> Create Workout
        </Link>
      </div>

      {/* Upcoming Workouts Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Upcoming Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingWorkouts.map((workout) => (
            <div key={workout.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-1/3 relative">
                  <Image
                    src={workout.image || "/placeholder.svg"}
                    alt={workout.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-500">
                        {workout.date} at {workout.time}
                      </p>
                    </div>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {workout.duration}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {workout.exercises.slice(0, 2).join(", ")}{" "}
                      {workout.exercises.length > 2 ? `+${workout.exercises.length - 2} more` : ""}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">Start</button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">Reschedule</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search workout plans..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <button
            className="w-full sm:w-48 px-4 py-2 border rounded-md bg-white flex items-center justify-between"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <span className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {selectedCategory}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {filterOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
              {["All", "Strength", "Cardio", "Core", "Full Body", "Flexibility"].map((category) => (
                <button
                  key={category}
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                    selectedCategory === category ? "bg-primary-50 text-primary-700" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category)
                    setFilterOpen(false)
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Workout Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="relative">
              <Image
                src={plan.image || "/placeholder.svg"}
                alt={plan.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleFavorite(plan.id)}
                className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100"
              >
                <Heart
                  className={`h-5 w-5 ${favorites.includes(plan.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    plan.level === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : plan.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : plan.level === "Advanced"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {plan.level}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{plan.description}</p>

              <div className="mt-3 flex items-center">
                <div className="flex-shrink-0 h-8 w-8 relative rounded-full overflow-hidden">
                  <Image
                    src={plan.trainerImage || "/placeholder.svg"}
                    alt={plan.trainer}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-gray-500">Trainer</p>
                  <p className="text-sm font-medium">{plan.trainer}</p>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 ml-1">{plan.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({plan.reviews})</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {plan.workoutsCount} workouts
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {plan.duration}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openWorkoutDetails(plan)}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View Details
                </button>
                <Link
                  href={`/workouts/${plan.id}`}
                  className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700"
                >
                  Start Plan
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Details Modal */}
      {showModal && selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedWorkout.image || "/placeholder.svg"}
                alt={selectedWorkout.name}
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">{selectedWorkout.name}</h2>
                <div className="flex items-center mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full bg-white bg-opacity-90 ${
                      selectedWorkout.level === "Beginner"
                        ? "text-green-800"
                        : selectedWorkout.level === "Intermediate"
                          ? "text-yellow-800"
                          : "text-red-800"
                    }`}
                  >
                    {selectedWorkout.level}
                  </span>
                  <span className="text-white text-sm ml-2">{selectedWorkout.category}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src={selectedWorkout.trainerImage || "/placeholder.svg"}
                      alt={selectedWorkout.trainer}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{selectedWorkout.trainer}</p>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-xs text-gray-700 ml-1">
                        {selectedWorkout.rating} ({selectedWorkout.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => toggleFavorite(selectedWorkout.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(selectedWorkout.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                    />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100">
                    <BookmarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedWorkout.description}</p>
                <p className="text-gray-600 mt-2">
                  This comprehensive program is designed to progressively challenge you over{" "}
                  {selectedWorkout.workoutsCount} workouts, each lasting {selectedWorkout.duration}. You'll focus on
                  proper form, progressive overload, and balanced development across all major muscle groups.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{selectedWorkout.workoutsCount} workouts</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Workout Length</p>
                      <p className="font-medium">{selectedWorkout.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Dumbbell className="h-5 w-5 text-primary-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Equipment</p>
                      <p className="font-medium">Full Gym</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Intensity</p>
                      <p className="font-medium">{selectedWorkout.level}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sample Workouts</h3>
                <div className="space-y-3">
                  {[
                    { name: "Week 1: Foundation", description: "Focus on form and building baseline strength" },
                    { name: "Week 4: Progressive Overload", description: "Increase weights and challenge your limits" },
                    {
                      name: "Week 8: Specialization",
                      description: "Target specific muscle groups with advanced techniques",
                    },
                  ].map((week, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <p className="font-medium text-gray-900">{week.name}</p>
                      <p className="text-sm text-gray-600">{week.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Preview Workout
                </button>
                <Link
                  href={`/workouts/${selectedWorkout.id}`}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Start This Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
