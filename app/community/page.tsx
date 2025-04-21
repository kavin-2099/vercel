"use client"

import { useState, useRef } from "react"
import {
  Search,
  MessageSquare,
  Share2,
  Filter,
  Award,
  UserPlus,
  ImageIcon,
  Smile,
  Send,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Dumbbell,
} from "lucide-react"
import Image from "next/image"

// Sample community posts data
const communityPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Elite",
      isVerified: true,
    },
    content: "Just completed my first 10K run! So proud of my progress over the last 3 months. #Running #Milestone",
    images: ["/placeholder.svg?height=300&width=500"],
    timestamp: "2 hours ago",
    likes: 42,
    comments: [
      {
        id: 1,
        user: {
          name: "Mike Chen",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "Amazing job! What was your time?",
        timestamp: "1 hour ago",
        likes: 3,
      },
      {
        id: 2,
        user: {
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "Congratulations! That's a huge achievement!",
        timestamp: "30 minutes ago",
        likes: 2,
      },
    ],
    workout: {
      name: "Morning Run",
      distance: "10 km",
      time: "55:32",
    },
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Intermediate",
      isVerified: false,
    },
    content:
      "New personal best on bench press today! 225lbs x 5 reps. The consistent training is paying off. What's your current PR?",
    images: [],
    timestamp: "5 hours ago",
    likes: 28,
    comments: [
      {
        id: 3,
        user: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "That's impressive! I'm still working on 185lbs for 5 reps.",
        timestamp: "4 hours ago",
        likes: 1,
      },
    ],
    workout: {
      name: "Chest Day",
      exercises: 5,
      duration: "45 min",
    },
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Advanced",
      isVerified: true,
    },
    content: "Trying out this new HIIT workout routine. It's intense but so worth it! Who else loves HIIT training?",
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    timestamp: "Yesterday",
    likes: 56,
    comments: [
      {
        id: 4,
        user: {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "HIIT is my favorite! What exercises are you including?",
        timestamp: "22 hours ago",
        likes: 4,
      },
      {
        id: 5,
        user: {
          name: "Alex Rivera",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "I do HIIT 3x a week. It's changed my fitness level completely!",
        timestamp: "20 hours ago",
        likes: 2,
      },
    ],
    workout: {
      name: "HIIT Circuit",
      calories: "450",
      duration: "30 min",
    },
    isLiked: false,
    isBookmarked: false,
  },
]

// Sample suggested users
const suggestedUsers = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Advanced",
    mutualFriends: 3,
    isFollowing: false,
  },
  {
    id: 2,
    name: "Taylor Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Elite",
    mutualFriends: 5,
    isFollowing: false,
  },
  {
    id: 3,
    name: "Jordan Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Intermediate",
    mutualFriends: 2,
    isFollowing: true,
  },
  {
    id: 4,
    name: "Olivia Parker",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Beginner",
    mutualFriends: 1,
    isFollowing: false,
  },
  {
    id: 5,
    name: "Daniel Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Advanced",
    mutualFriends: 4,
    isFollowing: false,
  },
]

// Sample trending topics
const trendingTopics = [
  "#MondayMotivation",
  "#FitnessTips",
  "#WeightLossJourney",
  "#StrengthTraining",
  "#RunningCommunity",
  "#FlexibilityChallenge",
  "#NutritionHacks",
]

// Sample fitness challenges
const fitnessChallenges = [
  {
    id: 1,
    title: "30-Day Push-Up Challenge",
    participants: 1245,
    image: "/placeholder.svg?height=100&width=200",
    daysLeft: 12,
    isJoined: true,
  },
  {
    id: 2,
    title: "Summer Shred Challenge",
    participants: 3782,
    image: "/placeholder.svg?height=100&width=200",
    daysLeft: 25,
    isJoined: false,
  },
  {
    id: 3,
    title: "10K Steps Daily",
    participants: 5431,
    image: "/placeholder.svg?height=100&width=200",
    daysLeft: 18,
    isJoined: false,
  },
]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState(communityPosts)
  const [showPostModal, setShowPostModal] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImages, setNewPostImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("feed")
  const [suggestedUsersList, setSuggestedUsersList] = useState(suggestedUsers)
  const [showCommentInput, setShowCommentInput] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [showPostOptions, setShowPostOptions] = useState<number | null>(null)
  const [challenges, setChallenges] = useState(fitnessChallenges)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  const toggleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          }
        }
        return post
      }),
    )
  }

  const toggleFollow = (userId: number) => {
    setSuggestedUsersList(
      suggestedUsersList.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowing: !user.isFollowing,
          }
        }
        return user
      }),
    )
  }

  const toggleJoinChallenge = (challengeId: number) => {
    setChallenges(
      challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return {
            ...challenge,
            isJoined: !challenge.isJoined,
            participants: challenge.isJoined ? challenge.participants - 1 : challenge.participants + 1,
          }
        }
        return challenge
      }),
    )
  }

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Math.max(0, ...post.comments.map((c) => c.id)) + 1,
            user: {
              name: "John Doe",
              avatar: "/placeholder.svg?height=30&width=30",
            },
            content: commentText,
            timestamp: "Just now",
            likes: 0,
          }

          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )

    setCommentText("")
    setShowCommentInput(null)
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim() && newPostImages.length === 0) return

    const newPost = {
      id: Math.max(0, ...posts.map((p) => p.id)) + 1,
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Premium Member",
        isVerified: false,
      },
      content: newPostContent,
      images: newPostImages,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      isLiked: false,
      isBookmarked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setNewPostImages([])
    setShowPostModal(false)
  }

  const handleImageUpload = () => {
    // In a real app, this would upload the image to a server
    // For this demo, we'll just add a placeholder image
    setNewPostImages([...newPostImages, "/placeholder.svg?height=300&width=500"])
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <button
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          <MessageSquare className="h-5 w-5 mr-2" /> New Post
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "feed"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("feed")}
          >
            Feed
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "challenges"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("challenges")}
          >
            Challenges
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "groups"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("groups")}
          >
            Groups
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "events"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - posts feed or challenges */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "feed" && (
            <>
              {/* Search and filter */}
              <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4 border border-gray-100">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              {/* Quick post */}
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Your profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-500"
                  >
                    What's on your fitness journey today?
                  </button>
                </div>
                <div className="flex mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md py-1"
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Photo
                  </button>
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md py-1"
                  >
                    <Award className="h-5 w-5 mr-2" />
                    Achievement
                  </button>
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md py-1"
                  >
                    <Dumbbell className="h-5 w-5 mr-2" />
                    Workout
                  </button>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                  {/* Post header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={post.user.avatar || "/placeholder.svg"}
                          alt={post.user.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{post.user.name}</h3>
                          {post.user.isVerified && (
                            <svg className="ml-1 h-4 w-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <span
                            className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              post.user.level === "Elite"
                                ? "bg-purple-100 text-purple-800"
                                : post.user.level === "Advanced"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {post.user.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setShowPostOptions(showPostOptions === post.id ? null : post.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </button>

                      {showPostOptions === post.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Save Post
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Follow {post.user.name}
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Hide Post
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Report Post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="px-4 pb-2">
                    <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
                  </div>

                  {/* Post images */}
                  {post.images.length > 0 && (
                    <div className={`grid ${post.images.length > 1 ? "grid-cols-2 gap-1" : "grid-cols-1"}`}>
                      {post.images.map((img, index) => (
                        <div key={index} className="relative aspect-video">
                          <Image src={img || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Workout details if available */}
                  {post.workout && (
                    <div className="mx-4 my-3 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center text-sm text-gray-500">
                        <Award className="h-4 w-4 mr-1 text-primary-500" />
                        <span className="font-medium text-gray-700 mr-2">{post.workout.name}</span>
                        {post.workout.distance && <span>• {post.workout.distance}</span>}
                        {post.workout.time && <span>• {post.workout.time}</span>}
                        {post.workout.exercises && <span>• {post.workout.exercises} exercises</span>}
                        {post.workout.duration && <span>• {post.workout.duration}</span>}
                        {post.workout.calories && <span>• {post.workout.calories} calories</span>}
                      </div>
                    </div>
                  )}

                  {/* Post actions */}
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-between">
                    <button
                      className={`flex items-center space-x-1 ${post.isLiked ? "text-primary-500" : "text-gray-500 hover:text-gray-700"}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <ThumbsUp className="h-5 w-5" fill={post.isLiked ? "currentColor" : "none"} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowCommentInput(showCommentInput === post.id ? null : post.id)}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                    <button
                      className={`flex items-center space-x-1 ${post.isBookmarked ? "text-primary-500" : "text-gray-500 hover:text-gray-700"}`}
                      onClick={() => toggleBookmark(post.id)}
                    >
                      <Bookmark className="h-5 w-5" fill={post.isBookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Comments */}
                  {(post.comments.length > 0 || showCommentInput === post.id) && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3 mb-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src={comment.user.avatar || "/placeholder.svg"}
                              alt={comment.user.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 bg-white p-2 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-900 text-sm">{comment.user.name}</span>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                            <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                              <button className="hover:text-primary-500">Like ({comment.likes})</button>
                              <button className="hover:text-primary-500">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Comment input */}
                      {showCommentInput === post.id && (
                        <div className="flex space-x-3 mt-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src="/placeholder.svg?height=32&width=32"
                              alt="Your profile"
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 flex">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              className="flex-1 bg-white border border-gray-300 rounded-l-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && handleAddComment(post.id)}
                            />
                            <button
                              className="bg-primary-500 text-white rounded-r-lg px-3 py-1 text-sm hover:bg-primary-600"
                              onClick={() => handleAddComment(post.id)}
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === "challenges" && (
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Fitness Challenges</h2>
                <p className="text-sm text-gray-600 mt-1">Join challenges to stay motivated and compete with others</p>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-32">
                        <Image
                          src={challenge.image || "/placeholder.svg"}
                          alt={challenge.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-3 text-white">
                            <h3 className="font-bold">{challenge.title}</h3>
                            <p className="text-sm">{challenge.participants.toLocaleString()} participants</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-primary-600 font-medium">{challenge.daysLeft} days</span> remaining
                        </div>
                        <button
                          onClick={() => toggleJoinChallenge(challenge.id)}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            challenge.isJoined
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-primary-500 text-white hover:bg-primary-600"
                          }`}
                        >
                          {challenge.isJoined ? "Joined" : "Join"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Popular Challenge Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Strength", "Cardio", "Weight Loss", "Flexibility", "Running", "Nutrition", "Meditation"].map(
                      (category, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                        >
                          {category}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-600">
                    Create a Challenge
                  </button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "groups" || activeTab === "events") && (
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 p-12 text-center">
              <div className="mx-auto h-16 w-16 text-gray-400">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {activeTab === "groups" ? "Join Fitness Groups" : "Discover Fitness Events"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "groups"
                  ? "Connect with like-minded fitness enthusiasts in groups"
                  : "Find local and virtual fitness events to participate in"}
              </p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-600">
                  {activeTab === "groups" ? "Browse Groups" : "Browse Events"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User profile summary */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=48&width=48" alt="Your profile" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">View your profile</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center border-t border-b py-3 mb-3">
              <div>
                <p className="font-bold">125</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <div>
                <p className="font-bold">843</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div>
                <p className="font-bold">267</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>
            <button className="w-full text-primary-600 text-sm font-medium hover:text-primary-800">
              View Activity Log
            </button>
          </div>

          {/* Fitness Challenges */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Active Challenges</h3>
            <div className="space-y-3">
              {challenges
                .filter((c) => c.isJoined)
                .map((challenge) => (
                  <div key={challenge.id} className="flex items-center space-x-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                      <Image
                        src={challenge.image || "/placeholder.svg"}
                        alt={challenge.title}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{challenge.title}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                ))}

              {challenges.filter((c) => c.isJoined).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-2">You haven't joined any challenges yet</p>
              )}
            </div>
            <button
              onClick={() => setActiveTab("challenges")}
              className="w-full text-primary-600 text-sm font-medium mt-3 hover:text-primary-800"
            >
              Browse All Challenges
            </button>
          </div>

          {/* Suggested users */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Suggested Users</h3>
            <div className="space-y-3">
              {suggestedUsersList.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.mutualFriends} mutual friends</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`p-1.5 rounded-full ${
                      user.isFollowing ? "text-gray-500 hover:bg-gray-100" : "text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {user.isFollowing ? (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <UserPlus className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full text-primary-600 text-sm font-medium mt-3 hover:text-primary-800">
              View All Suggestions
            </button>
          </div>

          {/* Trending topics */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800 hover:bg-gray-200"
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Create Post</h3>
              <button onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Your profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Public post</p>
                </div>
              </div>

              <textarea
                placeholder="What's on your fitness journey today?"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>

              {newPostImages.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {newPostImages.map((img, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-32">
                      <Image src={img || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                      <button
                        onClick={() => setNewPostImages(newPostImages.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full">
                    <Award className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={handleCreatePost}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    newPostContent.trim() || newPostImages.length > 0
                      ? "bg-primary-600 hover:bg-primary-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!newPostContent.trim() && newPostImages.length === 0}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
