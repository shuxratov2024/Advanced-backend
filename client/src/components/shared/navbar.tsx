import React from 'react'
import logo from "/public/logo/logo.png"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import CreatePost from '../create-post'
import { UseCreatePost } from '@/hooks/use-create-post'

function Navbar() {

    const {onOpen} = UseCreatePost()

  return (
   <>
      <div className='w-full h-24 bg-gray-900 fixed inset-0'>
        <div className="w-full h-full flex justify-between items-content container">
        <Link className='flex items-center justify-center w-40.5 h-18 .5' to={'/'}>
            <img src={logo} />
            
            </Link>
        <div className="flex gap-2">
            <Button className='rounded-full bg-gray-600  font-bold ' size={"lg" } variant={"outline"} onClick={onOpen}>
                Create a Post
            </Button>
            <Link to={"/auth"}>
            <Button className='rounded-full bg-gray-900 font-bold' size={"lg" } variant={"outline"}>
                Login
            </Button>
            
            </Link>
            <CreatePost/>
        </div>
        </div>
    </div>
   </>
  )
}

export default Navbar