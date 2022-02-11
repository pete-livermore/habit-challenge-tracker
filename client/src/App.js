import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Authentificate from './components/Authentificate'
import Event from './components/Event'
import Home from './components/Home/Home'
import AddHabitForm from './components/AddHabitForm'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<Event />} />
        <Route path="/authentificate" element={<Authentificate />} />
        <Route path="/events/:eventId/AddHabitCompletion" element={<AddHabitForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
