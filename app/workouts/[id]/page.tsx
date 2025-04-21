"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Flame, Dumbbell, Play, CheckCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

// This would normally come from an API or database
const workoutData = {
  id: "1",
  name: "Full Body Strength",
  description: "A comprehensive full body workout targeting all major muscle groups for balanced strength development.",
  duration: "45 min",
  calories: "320",
  difficulty: "Intermediate",
  exercises: [
    {
      id: 1,
      name: "Barbell Squats",
      sets: 4,
      reps: "10-12",
      rest: "90 sec",
      completed: false,
    },
    {
      id: 2,
      name: "Push-ups",
      sets: 3,
      reps: "15-20",
      rest: "60 sec",
      completed: false,
    },
    {
      id: 3,
      name: "Bent-over Rows",
      sets: 4,
      reps: "10-12",
      rest: "90 sec",
      completed: false,
    },
    {
      id: 4,
      name: "Shoulder Press",
      sets: 3,
      reps: "10-12",
      rest: "90 sec",
      completed: false,
    },
    {
      id: 5,
      name: "Lunges",
      sets: 3,
      reps: "12 each leg",
      rest: "60 sec",
      completed: false,
    },
    {
      id: 6,
      name: "Plank",
      sets: 3,
      reps: "30-60 sec",
      rest: "45 sec",
      completed: false,
    },
  ],
}

export default function WorkoutDetail({ params }: { params: { id: string } }) {
  const [exercises, setExercises] = useState(workoutData.exercises)
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [timer, setTimer] = useState(0)

  const toggleExerciseCompletion = (id: number) => {
    setExercises(
      exercises.map((exercise) => (exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise)),
    )
  }

  const startWorkout = () => {
    setIsWorkoutStarted(true)
  }

  const resetWorkout = () => {
    setIsWorkoutStarted(false)
    setCurrentExerciseIndex(0)
    setExercises(exercises.map((exercise) => ({ ...exercise, completed: false })))
    setTimer(0)
  }

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      toggleExerciseCompletion(exercises[currentExerciseIndex].id)
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      toggleExerciseCompletion(exercises[currentExerciseIndex].id)
      // Workout completed
      alert("Workout completed! Great job!")
    }
  }

  const completedCount = exercises.filter((ex) => ex.completed).length
  const progress = (completedCount / exercises.length) * 100

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/workouts" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Workouts
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{workoutData.name}</h1>
          <p className="mt-2 text-gray-600">{workoutData.description}</p>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>{workoutData.duration}</span>
            </div>
            <div className="flex items-center">
              <Flame className="h-5 w-5 text-red-400 mr-2" />
              <span>{workoutData.calories} calories</span>
            </div>
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 text-gray-400 mr-2" />
              <span>{workoutData.difficulty}</span>
            </div>
          </div>

          {isWorkoutStarted ? (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Progress</h3>
                <span>
                  {completedCount} of {exercises.length} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Current Exercise</h3>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="text-xl font-bold">{exercises[currentExerciseIndex].name}</h4>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Sets</p>
                      <p className="font-medium">{exercises[currentExerciseIndex].sets}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reps</p>
                      <p className="font-medium">{exercises[currentExerciseIndex].reps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rest</p>
                      <p className="font-medium">{exercises[currentExerciseIndex].rest}</p>
                    </div>
                  </div>
                  <button
                    onClick={nextExercise}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                  >
                    {currentExerciseIndex < exercises.length - 1 ? "Complete & Next" : "Finish Workout"}
                  </button>
                </div>
              </div>

              <button
                onClick={resetWorkout}
                className="mt-6 flex items-center justify-center text-red-600 hover:text-red-800"
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Reset Workout
              </button>
            </div>
          ) : (
            <button
              onClick={startWorkout}
              className="mt-6 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Play className="h-5 w-5 mr-2" /> Start Workout
            </button>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold mb-4">Exercise List</h2>
          <ul className="divide-y divide-gray-200">
            {exercises.map((exercise, index) => (
              <li key={exercise.id} className="py-3">
                <div className="flex items-center">
                  {isWorkoutStarted ? (
                    <button
                      onClick={() => toggleExerciseCompletion(exercise.id)}
                      className={`flex-shrink-0 h-5 w-5 mr-3 ${
                        exercise.completed ? "text-green-500" : "text-gray-300"
                      }`}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  ) : (
                    <span className="flex-shrink-0 h-5 w-5 mr-3 text-gray-400">{index + 1}.</span>
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${exercise.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exercise.sets} sets × {exercise.reps}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
