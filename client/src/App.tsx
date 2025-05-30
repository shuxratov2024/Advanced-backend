// import React from 'react'
// import { Button } from '@/components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Navbar from './components/shared/navbar';
import $axios from './http';
import { AuthStore } from './store/auth.store';
import { toast } from 'sonner';
import { useEffect } from 'react';


function App() {
  const { setIsAuth, setLoading, setUser } = AuthStore();
  const checkAuth = async () => {
    setLoading(true)
    try {
      const { data } = await $axios.get("auth/refresh")
      localStorage.setItem("accessToken", data.accessToken)
      setIsAuth(true)
      setUser(data.user)
    } catch (error) {
      //@ts-ignore
      toast(error.response?.data?.message || "User not authenticated",)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth()
    }
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App