"use client"

import { useState } from "react"
import {
  User,
  Bell,
  Activity,
  BarChart,
  ChevronRight,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import Image from "next/image"

const settingsSections = [
  {
    id: "account",
    title: "Account Settings",
    icon: User,
    settings: [
      {
        id: "profile",
        name: "Profile Information",
        description: "Update your personal details",
        component: "ProfileSettings",
      },
      {
        id: "email",
        name: "Email & Password",
        description: "Manage your login credentials",
      },
      {
        id: "privacy",
        name: "Privacy Settings",
        description: "Control your data and visibility",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    settings: [
      {
        id: "workout",
        name: "Workout Reminders",
        description: "Get notified about scheduled workouts",
        toggle: true,
      },
      {
        id: "achievements",
        name: "Achievement Alerts",
        description: "Notifications when you earn achievements",
        toggle: true,
      },
      {
        id: "social",
        name: "Social Notifications",
        description: "Updates from friends and community",
        toggle: true,
      },
    ],
  },
  {
    id: "preferences",
    title: "App Preferences",
    icon: Activity,
    settings: [
      {
        id: "units",
        name: "Measurement Units",
        description: "Choose between metric or imperial",
      },
      {
        id: "theme",
        name: "Theme",
        description: "Light or dark mode",
        toggle: true,
      },
      {
        id: "language",
        name: "Language",
        description: "Select your preferred language",
      },
    ],
  },
  {
    id: "data",
    title: "Data & Analytics",
    icon: BarChart,
    settings: [
      {
        id: "export",
        name: "Export Data",
        description: "Download your workout history",
      },
      {
        id: "sync",
        name: "Sync with Devices",
        description: "Connect with fitness trackers and apps",
      },
      {
        id: "delete",
        name: "Delete Account",
        description: "Permanently remove your account and data",
        danger: true,
      },
    ],
  },
  {
    id: "subscription",
    title: "Subscription & Billing",
    icon: CreditCard,
    settings: [
      {
        id: "plan",
        name: "Current Plan",
        description: "Premium Plan - $9.99/month",
        badge: "Premium",
      },
      {
        id: "payment",
        name: "Payment Methods",
        description: "Manage your payment options",
      },
      {
        id: "billing",
        name: "Billing History",
        description: "View past invoices and receipts",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    settings: [
      {
        id: "2fa",
        name: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        toggle: true,
      },
      {
        id: "sessions",
        name: "Active Sessions",
        description: "Manage devices where you're logged in",
      },
      {
        id: "activity",
        name: "Security Activity",
        description: "Review recent account activity",
      },
    ],
  },
  {
    id: "help",
    title: "Help & Support",
    icon: HelpCircle,
    settings: [
      {
        id: "faq",
        name: "FAQ",
        description: "Frequently asked questions",
      },
      {
        id: "contact",
        name: "Contact Support",
        description: "Get help with any issues",
      },
      {
        id: "feedback",
        name: "Send Feedback",
        description: "Help us improve FitTrack Pro",
      },
    ],
  },
]

// Profile Settings Component
function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary-100">
          <Image
            src="/placeholder.svg?height=96&width=96"
            alt="Profile"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
          <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
            Change
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-500">john.doe@example.com</p>
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Premium Member
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            defaultValue="John"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            defaultValue="Doe"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue="john.doe@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            defaultValue="(555) 123-4567"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            defaultValue="Fitness enthusiast focused on strength training and nutrition. Working towards my first marathon."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    workout: true,
    achievements: true,
    social: false,
    theme: false,
    "2fa": true,
  })
  const [activeSection, setActiveSection] = useState("profile")

  const handleToggleChange = (id: string, value: boolean) => {
    setToggleStates({ ...toggleStates, [id]: value })

    if (id === "theme") {
      setDarkMode(value)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          {settingsSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex items-center">
                <section.icon className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {section.settings.map((setting) => (
                    <li key={setting.id}>
                      <button
                        onClick={() => setActiveSection(setting.id)}
                        className={`w-full px-4 py-4 sm:px-6 flex items-center justify-between text-left ${
                          activeSection === setting.id ? "bg-primary-50" : ""
                        }`}
                      >
                        <div className="flex flex-col">
                          <p className={`text-sm font-medium ${setting.danger ? "text-red-600" : "text-gray-900"}`}>
                            {setting.name}
                          </p>
                          <p className="text-xs text-gray-500">{setting.description}</p>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 ${activeSection === setting.id ? "text-primary-500" : "text-gray-400"}`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <button className="w-full px-4 py-4 sm:px-6 flex items-center text-left text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5 mr-2" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {settingsSections.flatMap((section) => section.settings).find((setting) => setting.id === activeSection)
                  ?.name || "Profile Information"}
              </h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {activeSection === "profile" && <ProfileSettings />}

              {activeSection !== "profile" && (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <BarChart className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Setting under development</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This setting is currently being developed and will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed bottom-6 left-6 bg-white rounded-full shadow-lg p-2 border border-gray-200">
        <button
          onClick={() => handleToggleChange("theme", !toggleStates.theme)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {toggleStates.theme ? (
            <Moon className="h-5 w-5 text-gray-700" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
        </button>
      </div>
    </div>
  )
}
