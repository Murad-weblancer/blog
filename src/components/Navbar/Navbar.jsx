import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

export const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="navbar-logo">
          <Link to='/'>
            <h1>Тестовое задание</h1>
          </Link>
        </div>
        <div className="navbar-list">
          <Link to='/'>Главная</Link>
          <Link to='/create'>Создать</Link>
        </div>
    </nav>
  )
}
