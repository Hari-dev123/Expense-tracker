import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { SlWallet } from 'react-icons/sl'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdLogout } from 'react-icons/md'

const Sidebar = () => {
  const { pathname } = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LuLayoutDashboard size={20} /> },
    { name: 'Income', path: '/income', icon: <MdOutlineAttachMoney size={20} /> },
    { name: 'Expense', path: '/expense', icon: <SlWallet size={20} /> },
    { name: 'Logout', path: '/logout', icon: <MdLogout size={20} /> },
  ]

  return (
    <div className="w-60 h-screen fixed bg-gray-100 shadow-lg px-6 py-8">
      <h1 className="text-2xl font-bold mb-12 text-center text-purple-700">Expense Tracker</h1>

      <nav className="flex flex-col gap-4">
        {menuItems.map(({ name, path, icon }) => {
          const isActive = pathname === path
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-4 text-base font-medium px-4 py-2 rounded-md transition-all duration-200
                ${isActive ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-800 hover:bg-purple-100'}
              `}
            >
              {icon}
              <span>{name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
