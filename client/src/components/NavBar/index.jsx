import React from 'react'

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-8 h-16">
      <p>Todo App</p>
      <button>Log out</button>
    </nav>
  )
}