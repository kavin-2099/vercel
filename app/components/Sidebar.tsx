"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Dumbbell,
  Calendar,
  Users,
  Award,
  Settings,
  BarChart,
  Activity,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

const menuItems = [
  { icon: Home, text: "Dashboard", href: "/" },
  { icon: Dumbbell, text: "Workouts", href: "/workouts" },
  { icon: Calendar, text: "Schedule", href: "/schedule" },
  { icon: Users, text: "Community", href: "/community" },
  { icon: Award, text: "Achievements", href: "/achievements" },
  { icon: BarChart, text: "Progress", href: "/progress" },
  { icon: Settings, text: "Settings", href: "/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`relative flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"} bg-white border-r border-gray-200 shadow-sm`}
    >
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-primary-500" />
          {!collapsed && <span className="text-xl font-bold text-gray-900">FitTrack Pro</span>}
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-primary-500" : "text-gray-500"}`} />
                  {!collapsed && <span className="ml-3 text-sm font-medium">{item.text}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary-900 mb-2">Premium Plan</h4>
            <p className="text-xs text-primary-700 mb-3">Get access to all features and personalized training</p>
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </div>
  )
}
