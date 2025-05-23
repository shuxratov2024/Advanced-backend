// import React from 'react'
// import { Button } from '@/components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Navbar from './components/shared/navbar';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path ="/" element={<Home/>} />
      <Route path ="/auth" element={<Auth/>} />
    </Routes>
    </>
  )
}

export default App