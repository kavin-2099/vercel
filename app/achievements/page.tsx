"use client"

import { useState } from "react"
import {
  Award,
  TrendingUp,
  Calendar,
  Dumbbell,
  Flame,
  Clock,
  Target,
  Share2,
  ChevronDown,
  Gift,
  Trophy,
  Medal,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample achievements data
const achievementsData = [
  {
    id: 1,
    name: "Workout Warrior",
    description: "Complete 10 workouts in a month",
    icon: Dumbbell,
    progress: 100,
    completed: true,
    date: "May 15, 2023",
    xp: 500,
    category: "Consistency",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Calorie Crusher",
    description: "Burn 5,000 calories in total",
    icon: Flame,
    progress: 78,
    completed: false,
    xp: 300,
    category: "Performance",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Early Bird",
    description: "Complete 5 workouts before 8 AM",
    icon: Clock,
    progress: 60,
    completed: false,
    xp: 200,
    category: "Consistency",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Strength Master",
    description: "Lift 10,000 lbs in total",
    icon: TrendingUp,
    progress: 45,
    completed: false,
    xp: 400,
    category: "Performance",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "30-Day Streak",
    description: "Log in for 30 consecutive days",
    icon: Calendar,
    progress: 100,
    completed: true,
    date: "April 30, 2023",
    xp: 600,
    category: "Consistency",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Goal Getter",
    description: "Achieve 3 personal fitness goals",
    icon: Target,
    progress: 67,
    completed: false,
    xp: 350,
    category: "Goals",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 7,
    name: "Marathon Finisher",
    description: "Complete a full marathon distance",
    icon: Trophy,
    progress: 25,
    completed: false,
    xp: 1000,
    category: "Milestones",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 8,
    name: "Social Butterfly",
    description: "Connect with 10 fitness friends",
    icon: Medal,
    progress: 80,
    completed: false,
    xp: 250,
    category: "Social",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Sample badges data
const badgesData = [
  {
    id: 1,
    name: "Gold Athlete",
    image: "/placeholder.svg?height=80&width=80",
    description: "Awarded to users who maintain Elite status for 3 months",
    rarity: "Legendary",
    earned: true,
    date: "June 1, 2023",
  },
  {
    id: 2,
    name: "Marathon Finisher",
    image: "/placeholder.svg?height=80&width=80",
    description: "Completed a full marathon distance",
    rarity: "Epic",
    earned: false,
  },
  {
    id: 3,
    name: "Nutrition Expert",
    image: "/placeholder.svg?height=80&width=80",
    description: "Logged meals consistently for 60 days",
    rarity: "Rare",
    earned: true,
    date: "May 10, 2023",
  },
  {
    id: 4,
    name: "Powerlifter",
    image: "/placeholder.svg?height=80&width=80",
    description: "Bench press 1.5x your body weight",
    rarity: "Epic",
    earned: false,
  },
  {
    id: 5,
    name: "Early Riser",
    image: "/placeholder.svg?height=80&width=80",
    description: "Complete 20 workouts before 7 AM",
    rarity: "Rare",
    earned: false,
  },
  {
    id: 6,
    name: "Yoga Master",
    image: "/placeholder.svg?height=80&width=80",
    description: "Complete 50 yoga sessions",
    rarity: "Epic",
    earned: true,
    date: "March 15, 2023",
  },
]

// Sample rewards data
const rewardsData = [
  {
    id: 1,
    name: "1-Month Premium Subscription",
    description: "Unlock all premium features for 1 month",
    cost: 5000,
    image: "/placeholder.svg?height=100&width=100",
    category: "Subscription",
  },
  {
    id: 2,
    name: "Exclusive Workout Plan",
    description: "Access to a premium workout plan",
    cost: 2500,
    image: "/placeholder.svg?height=100&width=100",
    category: "Content",
  },
  {
    id: 3,
    name: "Custom Profile Badge",
    description: "Show off your achievements with a special badge",
    cost: 1000,
    image: "/placeholder.svg?height=100&width=100",
    category: "Cosmetic",
  },
  {
    id: 4,
    name: "$10 Store Credit",
    description: "Use towards fitness gear in our partner stores",
    cost: 7500,
    image: "/placeholder.svg?height=100&width=100",
    category: "Merchandise",
  },
]

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("achievements")
  const [filter, setFilter] = useState("All")
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [showAchievementDetails, setShowAchievementDetails] = useState<number | null>(null)
  const [showRewardCategories, setShowRewardCategories] = useState(false)
  const [rewardCategory, setRewardCategory] = useState("All")

  const filteredAchievements = achievementsData.filter(
    (achievement) => filter === "All" || achievement.category === filter,
  )

  const filteredRewards = rewardsData.filter((reward) => rewardCategory === "All" || reward.category === rewardCategory)

  const openRewardDetails = (reward: any) => {
    setSelectedReward(reward)
    setShowRewardModal(true)
  }

  const totalXP = 3240
  const nextLevelXP = 4000
  const progressPercentage = (totalXP / nextLevelXP) * 100

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
        <p className="mt-2 text-gray-600">Track your progress and earn rewards for your fitness journey</p>
      </div>

      {/* User level progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-primary-500">
              <Image src="/placeholder.svg?height=64&width=64" alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Level 15</h2>
              <p className="text-gray-600">Fitness Enthusiast</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{totalXP.toLocaleString()} XP</span>
            <span className="text-xs text-gray-500">/ {nextLevelXP.toLocaleString()} to Level 16</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Level 15</span>
          <span>Level 16</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "achievements"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "badges"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("badges")}
            >
              Badges
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "rewards"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("rewards")}
            >
              Rewards
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "leaderboard"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Leaderboard
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "achievements" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Consistency", "Performance", "Goals", "Milestones", "Social"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === category
                    ? "bg-primary-100 text-primary-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Achievements grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg shadow overflow-hidden border-t-4 ${
                  achievement.completed ? "border-green-500" : "border-primary-500"
                } hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => setShowAchievementDetails(achievement.id)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={achievement.image || "/placeholder.svg"}
                          alt={achievement.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {achievement.xp} XP
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${achievement.completed ? "bg-green-500" : "bg-primary-500"}`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {achievement.completed && (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-500">Completed {achievement.date}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Achievement Details Modal */}
          {showAchievementDetails !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                  {(() => {
                    const achievement = achievementsData.find((a) => a.id === showAchievementDetails)
                    if (!achievement) return null

                    return (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={achievement.image || "/placeholder.svg"}
                                alt={achievement.name}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-xl font-bold text-gray-900">{achievement.name}</h3>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                                {achievement.category}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowAchievementDetails(null)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="text-gray-600 mb-6">{achievement.description}</p>

                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${achievement.completed ? "bg-green-500" : "bg-primary-500"}`}
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">Reward</p>
                              <p className="text-lg font-bold text-gray-900">{achievement.xp} XP</p>
                            </div>
                            {achievement.completed ? (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Claimed
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                In Progress
                              </span>
                            )}
                          </div>
                        </div>

                        {achievement.completed ? (
                          <div className="flex justify-between">
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                              Share
                            </button>
                            <button
                              onClick={() => setShowAchievementDetails(null)}
                              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                            >
                              Close
                            </button>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">How to earn this achievement:</h4>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                              {achievement.category === "Consistency" && (
                                <>
                                  <li>Complete workouts regularly</li>
                                  <li>Track your progress in the app</li>
                                  <li>Maintain your streak by logging in daily</li>
                                </>
                              )}
                              {achievement.category === "Performance" && (
                                <>
                                  <li>Increase weights gradually</li>
                                  <li>Track all your workouts accurately</li>
                                  <li>Focus on proper form and technique</li>
                                </>
                              )}
                              {achievement.category === "Goals" && (
                                <>
                                  <li>Set specific, measurable goals</li>
                                  <li>Track your progress regularly</li>
                                  <li>Update your goals as you achieve them</li>
                                </>
                              )}
                              {achievement.category === "Milestones" && (
                                <>
                                  <li>Work consistently towards your target</li>
                                  <li>Track all related activities</li>
                                  <li>Follow the recommended training plan</li>
                                </>
                              )}
                              {achievement.category === "Social" && (
                                <>
                                  <li>Connect with other users</li>
                                  <li>Participate in community challenges</li>
                                  <li>Share your progress and achievements</li>
                                </>
                              )}
                            </ul>
                            <button
                              onClick={() => setShowAchievementDetails(null)}
                              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                            >
                              Got it
                            </button>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "badges" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badgesData.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-lg shadow overflow-hidden border border-gray-100 ${badge.earned ? "" : "opacity-60"}`}
            >
              <div className="p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-24 w-24 mb-3">
                    <Image src={badge.image || "/placeholder.svg"} alt={badge.name} fill className="object-contain" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{badge.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      badge.rarity === "Legendary"
                        ? "bg-purple-100 text-purple-800"
                        : badge.rarity === "Epic"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {badge.rarity}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">{badge.description}</p>

                  {badge.earned ? (
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>Earned on {badge.date}</span>
                    </div>
                  ) : (
                    <button className="mt-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200">
                      How to earn
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "rewards" && (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Reward Shop</h2>
                <p className="text-sm text-gray-600">Redeem your XP for exclusive rewards</p>
              </div>
              <div className="flex items-center bg-primary-50 px-4 py-2 rounded-lg">
                <Gift className="h-5 w-5 text-primary-500 mr-2" />
                <div>
                  <p className="text-xs text-primary-700">Available XP</p>
                  <p className="font-bold text-primary-700">{totalXP.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative">
                  <button
                    onClick={() => setShowRewardCategories(!showRewardCategories)}
                    className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <span>Category: {rewardCategory}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {showRewardCategories && (
                    <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      {["All", "Subscription", "Content", "Cosmetic", "Merchandise"].map((category) => (
                        <button
                          key={category}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            rewardCategory === category
                              ? "bg-primary-50 text-primary-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setRewardCategory(category)
                            setShowRewardCategories(false)
                          }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="#" className="text-sm text-primary-600 hover:text-primary-800">
                  View Redemption History
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openRewardDetails(reward)}
                  >
                    <div className="relative h-32">
                      <Image src={reward.image || "/placeholder.svg"} alt={reward.name} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 mb-1">{reward.name}</h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{reward.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-bold text-gray-900">{reward.cost.toLocaleString()}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            reward.cost <= totalXP ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {reward.cost <= totalXP ? "Available" : "Locked"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Rewards */}
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Featured Rewards</h2>
            </div>

            <div className="p-4">
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-500 opacity-90"></div>
                <div className="relative p-6 flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 text-white mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Limited Time Offer</h3>
                    <p className="mb-4">Get 3 months of Premium Membership for only 10,000 XP - that's 25% off!</p>
                    <button className="px-4 py-2 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100">
                      Learn More
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative h-32 w-32">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt="Premium Membership"
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reward Details Modal */}
          {showRewardModal && selectedReward && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="relative h-48">
                  <Image
                    src={selectedReward.image || "/placeholder.svg"}
                    alt={selectedReward.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <button
                    onClick={() => setShowRewardModal(false)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{selectedReward.name}</h3>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-bold">{selectedReward.cost.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{selectedReward.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Reward Details</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Category: {selectedReward.category}</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Instant digital delivery</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Valid for 30 days after redemption</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Your XP Balance</p>
                      <p className="font-bold text-gray-900">{totalXP.toLocaleString()} XP</p>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-md font-medium ${
                        selectedReward.cost <= totalXP
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={selectedReward.cost > totalXP}
                    >
                      {selectedReward.cost <= totalXP ? "Redeem Reward" : "Not Enough XP"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "leaderboard" && (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  XP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Achievements
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  rank: 1,
                  name: "Alex Johnson",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 24,
                  xp: 12450,
                  achievements: 48,
                  isFollowing: true,
                },
                {
                  rank: 2,
                  name: "Maria Garcia",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 22,
                  xp: 11200,
                  achievements: 42,
                  isFollowing: false,
                },
                {
                  rank: 3,
                  name: "David Kim",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 21,
                  xp: 10800,
                  achievements: 39,
                  isFollowing: true,
                },
                {
                  rank: 4,
                  name: "Sarah Williams",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 20,
                  xp: 10100,
                  achievements: 37,
                  isFollowing: false,
                },
                {
                  rank: 5,
                  name: "John Doe",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 15,
                  xp: 3240,
                  achievements: 22,
                  isCurrentUser: true,
                },
                {
                  rank: 6,
                  name: "Emma Wilson",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 14,
                  xp: 2980,
                  achievements: 19,
                  isFollowing: false,
                },
                {
                  rank: 7,
                  name: "Michael Brown",
                  avatar: "/placeholder.svg?height=40&width=40",
                  level: 13,
                  xp: 2750,
                  achievements: 17,
                  isFollowing: false,
                },
              ].map((user) => (
                <tr key={user.rank} className={user.isCurrentUser ? "bg-primary-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.rank <= 3 ? (
                      <span
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                          user.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : user.rank === 2
                              ? "bg-gray-100 text-gray-800"
                              : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {user.rank}
                      </span>
                    ) : (
                      user.rank
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          className="rounded-full"
                          src={user.avatar || "/placeholder.svg"}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name} {user.isCurrentUser && <span className="text-xs text-primary-600">(You)</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Level {user.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.xp.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.achievements}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!user.isCurrentUser && (
                      <button
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          user.isFollowing
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                        }`}
                      >
                        {user.isFollowing ? "Following" : "Follow"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing 7 of 250 users</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
