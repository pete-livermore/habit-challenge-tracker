import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Event from './components/events/Event'
import Home from './components/home/Home'
import AddHabitForm from './components/habits/AddHabitForm'
import TopNavbar from './components/navbar/TopNavbar'
import SingleProfile from './components/profile/SingleProfile'
import DeleteHabit from './components/habits/DeleteHabit'
import Comments from './components/Comments'
import EditHabit from './components/habits/EditHabit'
import EditProfile from './components/profile/EditProfile'

const App = () => {
  return (
    <BrowserRouter>
      <TopNavbar zIndex='1' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<Event />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/:eventId/AddHabitCompletion" element={<AddHabitForm />} />
        <Route path="/profile/:userId" element={<SingleProfile />} />
        <Route path="/profile/:userId/edit-profile" element={<EditProfile />} />
        <Route path="/profile/:userId/:eventId/:habitId/edit" element={<EditHabit />} />
        <Route path="/profile/:userId/:eventId/:habitId/delete-habit" element={<DeleteHabit />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
