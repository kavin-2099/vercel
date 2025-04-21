"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react"

// Calendar data
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Sample workout events
const workoutEvents = [
  {
    id: 1,
    title: "Morning Run",
    date: new Date(2023, 5, 10, 7, 0),
    duration: 45,
    type: "Cardio",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: 2,
    title: "Upper Body Strength",
    date: new Date(2023, 5, 10, 18, 0),
    duration: 60,
    type: "Strength",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: 3,
    title: "Yoga Session",
    date: new Date(2023, 5, 12, 8, 0),
    duration: 30,
    type: "Flexibility",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: 4,
    title: "HIIT Workout",
    date: new Date(2023, 5, 13, 19, 0),
    duration: 30,
    type: "Cardio",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: 5,
    title: "Leg Day",
    date: new Date(2023, 5, 14, 17, 30),
    duration: 75,
    type: "Strength",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
]

// Generate dates for calendar
function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Previous month days to show
  const prevMonthDays = []
  if (startingDayOfWeek > 0) {
    const prevMonth = new Date(year, month, 0)
    const prevMonthDaysCount = prevMonth.getDate()

    for (let i = prevMonthDaysCount - startingDayOfWeek + 1; i <= prevMonthDaysCount; i++) {
      prevMonthDays.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
      })
    }
  }

  // Current month days
  const currentMonthDays = []
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    })
  }

  // Next month days to fill the calendar
  const nextMonthDays = []
  const totalDaysShown = prevMonthDays.length + currentMonthDays.length
  const remainingDays = 42 - totalDaysShown // 6 rows of 7 days

  for (let i = 1; i <= remainingDays; i++) {
    nextMonthDays.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    })
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
}

// Get events for a specific date
function getEventsForDate(date: Date, events: any[]) {
  return events.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )
}

// Format time (e.g., "7:00 AM")
function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}

export default function SchedulePage() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month")
  const [selectedDate, setSelectedDate] = useState(today)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    cardio: true,
    strength: true,
    flexibility: true,
  })

  // Generate calendar days
  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth())

  // Navigate to previous month/week/day
  const goToPrevious = () => {
    if (currentView === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (currentView === "week") {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 7)
      setCurrentDate(newDate)
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 1)
      setCurrentDate(newDate)
    }
  }

  // Navigate to next month/week/day
  const goToNext = () => {
    if (currentView === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (currentView === "week") {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 7)
      setCurrentDate(newDate)
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 1)
      setCurrentDate(newDate)
    }
  }

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Filter events based on selected filters
  const filteredEvents = workoutEvents.filter((event) => {
    if (event.type === "Cardio" && !filters.cardio) return false
    if (event.type === "Strength" && !filters.strength) return false
    if (event.type === "Flexibility" && !filters.flexibility) return false
    return true
  })

  // Get events for the selected date
  const selectedDateEvents = getEventsForDate(selectedDate, filteredEvents)

  // Toggle a filter
  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Workout Schedule</h1>

        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Filter className="h-4 w-4 inline mr-2" />
              Filter
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">Workout Types</h3>
                </div>
                <div className="px-4 py-2">
                  <label className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={filters.cardio}
                      onChange={() => toggleFilter("cardio")}
                      className="rounded text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Cardio</span>
                  </label>
                  <label className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={filters.strength}
                      onChange={() => toggleFilter("strength")}
                      className="rounded text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Strength</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.flexibility}
                      onChange={() => toggleFilter("flexibility")}
                      className="rounded text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Flexibility</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <button className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <Plus className="h-4 w-4 inline mr-2" />
            Add Workout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Calendar Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentView === "month"
                ? `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : currentView === "week"
                  ? `Week of ${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
                  : `${DAYS[currentDate.getDay()]}, ${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
            </h2>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-md hover:bg-primary-100"
            >
              Today
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setCurrentView("month")}
                className={`px-3 py-1 text-sm ${currentView === "month" ? "bg-primary-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                Month
              </button>
              <button
                onClick={() => setCurrentView("week")}
                className={`px-3 py-1 text-sm ${currentView === "week" ? "bg-primary-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                Week
              </button>
              <button
                onClick={() => setCurrentView("day")}
                className={`px-3 py-1 text-sm ${currentView === "day" ? "bg-primary-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                Day
              </button>
            </div>

            <div className="flex">
              <button
                onClick={goToPrevious}
                className="p-1 rounded-l border border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-1 rounded-r border-t border-r border-b border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Body - Month View */}
        {currentView === "month" && (
          <div className="bg-white">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {DAYS.map((day, index) => (
                <div key={index} className="py-2 text-center text-sm font-medium text-gray-500">
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 grid-rows-6 h-[600px]">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day.date, filteredEvents)
                const isToday = day.date.toDateString() === today.toDateString()
                const isSelected = day.date.toDateString() === selectedDate.toDateString()

                return (
                  <div
                    key={index}
                    className={`border-b border-r border-gray-200 p-2 ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"}`}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div className="flex justify-between items-start">
                      <div
                        className={`flex items-center justify-center h-7 w-7 rounded-full text-sm font-medium
                          ${isToday ? "bg-primary-500 text-white" : isSelected ? "bg-primary-100 text-primary-700" : "text-gray-700"}
                        `}
                      >
                        {day.date.getDate()}
                      </div>
                      {dayEvents.length > 0 && (
                        <span className="text-xs font-medium text-gray-500">{dayEvents.length} events</span>
                      )}
                    </div>

                    <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`px-2 py-1 rounded-md text-xs font-medium truncate ${event.color} border`}
                        >
                          {formatTime(event.date)} {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 font-medium text-center">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Calendar Body - Week View */}
        {currentView === "week" && (
          <div className="bg-white">
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="py-2 text-center text-sm font-medium text-gray-500 border-r border-gray-200">Time</div>
              {Array.from({ length: 7 }).map((_, index) => {
                const date = new Date(currentDate)
                date.setDate(date.getDate() - date.getDay() + index)
                const isToday = date.toDateString() === today.toDateString()

                return (
                  <div
                    key={index}
                    className={`py-2 text-center ${isToday ? "bg-primary-50" : ""}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="text-sm font-medium text-gray-500">{DAYS[index].substring(0, 3)}</div>
                    <div className={`text-lg font-semibold ${isToday ? "text-primary-600" : "text-gray-900"}`}>
                      {date.getDate()}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-8 h-[600px] overflow-y-auto">
              <div className="border-r border-gray-200">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="h-20 border-b border-gray-200 px-2 py-1">
                    <div className="text-xs text-gray-500">{index + 7}:00</div>
                  </div>
                ))}
              </div>

              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const date = new Date(currentDate)
                date.setDate(date.getDate() - date.getDay() + dayIndex)
                const dayEvents = filteredEvents.filter(
                  (event) =>
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear(),
                )

                return (
                  <div key={dayIndex} className="relative border-r border-gray-200">
                    {Array.from({ length: 12 }).map((_, hourIndex) => (
                      <div key={hourIndex} className="h-20 border-b border-gray-200"></div>
                    ))}

                    {dayEvents.map((event) => {
                      const startHour = event.date.getHours()
                      const startMinute = event.date.getMinutes()
                      const top = (startHour - 7) * 80 + (startMinute / 60) * 80
                      const height = (event.duration / 60) * 80

                      return (
                        <div
                          key={event.id}
                          className={`absolute left-1 right-1 rounded-md p-2 border ${event.color}`}
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          <div className="text-xs font-medium truncate">{event.title}</div>
                          <div className="text-xs">{formatTime(event.date)}</div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Calendar Body - Day View */}
        {currentView === "day" && (
          <div className="bg-white grid grid-cols-1 md:grid-cols-3 h-[600px]">
            <div className="col-span-2 border-r border-gray-200 overflow-y-auto">
              <div className="relative">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={index} className="h-20 border-b border-gray-200 px-4">
                    <div className="text-xs text-gray-500">{index + 7}:00</div>
                  </div>
                ))}

                {filteredEvents
                  .filter(
                    (event) =>
                      event.date.getDate() === selectedDate.getDate() &&
                      event.date.getMonth() === selectedDate.getMonth() &&
                      event.date.getFullYear() === selectedDate.getFullYear(),
                  )
                  .map((event) => {
                    const startHour = event.date.getHours()
                    const startMinute = event.date.getMinutes()
                    const top = (startHour - 7) * 80 + (startMinute / 60) * 80
                    const height = (event.duration / 60) * 80

                    return (
                      <div
                        key={event.id}
                        className={`absolute left-4 right-4 rounded-md p-3 border ${event.color}`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm mt-1 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(event.date)} -{" "}
                          {formatTime(new Date(event.date.getTime() + event.duration * 60000))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {DAYS[selectedDate.getDay()]}, {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}
              </h3>

              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.color}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {DAYS[event.date.getDay()]}, {MONTHS[event.date.getMonth()]} {event.date.getDate()}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(event.date)} - {formatTime(new Date(event.date.getTime() + event.duration * 60000))}
                        <span className="ml-2">({event.duration} min)</span>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-xs font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600">
                          Start Workout
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <CalendarIcon className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No workouts scheduled</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new workout for this day.</p>
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-600">
                      <Plus className="h-4 w-4 inline mr-2" />
                      Add Workout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
