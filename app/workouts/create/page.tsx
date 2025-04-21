"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, X, Save } from "lucide-react"
import Link from "next/link"

type Exercise = {
  id: number
  name: string
  sets: number
  reps: string
  rest: string
}

export default function CreateWorkout() {
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDescription, setWorkoutDescription] = useState("")
  const [difficulty, setDifficulty] = useState("Beginner")
  const [exercises, setExercises] = useState<Exercise[]>([{ id: 1, name: "", sets: 3, reps: "", rest: "60 sec" }])

  const addExercise = () => {
    const newId = exercises.length > 0 ? Math.max(...exercises.map((e) => e.id)) + 1 : 1
    setExercises([...exercises, { id: newId, name: "", sets: 3, reps: "", rest: "60 sec" }])
  }

  const removeExercise = (id: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((exercise) => exercise.id !== id))
    }
  }

  const updateExercise = (id: number, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map((exercise) => (exercise.id === id ? { ...exercise, [field]: value } : exercise)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the workout to your backend
    console.log({
      name: workoutName,
      description: workoutDescription,
      difficulty,
      exercises,
    })

    alert("Workout created successfully!")
    // Redirect to workouts page
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/workouts" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Workouts
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Workout</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="workout-name" className="block text-sm font-medium text-gray-700">
                  Workout Name
                </label>
                <input
                  type="text"
                  id="workout-name"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Full Body Strength"
                  required
                />
              </div>

              <div>
                <label htmlFor="workout-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="workout-description"
                  value={workoutDescription}
                  onChange={(e) => setWorkoutDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your workout..."
                />
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-900">Exercises</h2>
                  <button
                    type="button"
                    onClick={addExercise}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Exercise
                  </button>
                </div>

                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <div key={exercise.id} className="border rounded-md p-4 relative">
                      <button
                        type="button"
                        onClick={() => removeExercise(exercise.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => updateExercise(exercise.id, "name", e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Push-ups"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Sets</label>
                          <input
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(exercise.id, "sets", Number.parseInt(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Reps</label>
                          <input
                            type="text"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(exercise.id, "reps", e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 10-12 or 30 sec"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Rest Time</label>
                          <input
                            type="text"
                            value={exercise.rest}
                            onChange={(e) => updateExercise(exercise.id, "rest", e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 60 sec"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/workouts"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" /> Save Workout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
