import React from 'react'
import logo from "/public/logo/logo.png"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import CreatePost from '../create-post'
import { UseCreatePost } from '@/hooks/use-create-post'
import { AuthStore } from '@/store/auth.store'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import $axios from '@/http'
import type { IUser } from '@/interface'

function Navbar() {

    const { onOpen } = UseCreatePost()
    const {setIsAuth,isAuth,setUser,isLoading,user} = AuthStore()
    const navigate =  useNavigate()

    const logout = async () => {
        try {
            await $axios.post("auth/logout")
            localStorage.removeItem("accessToken")
            setIsAuth(false)
            setUser({} as IUser)
            navigate("/auth")
        } catch (error) {
            //@ts-ignore
            toast(error.response?.data.message)
        }
    }

    return (
        <>
            <div className='w-full h-24 bg-gray-900 fixed inset-0 z-9999'>
                <div className="w-full h-full flex justify-between items-content container">
                    <Link className='flex items-center justify-center w-40.5 h-18 .5' to={'/'}>
                        <img src={logo} className='w-full' />

                    </Link>
                    <div className="flex gap-2 items-center">
                        {isAuth && (
                        <Button className='rounded-full bg-gray-600  font-bold mt-6' size={"lg"} variant={"outline"} onClick={onOpen}>
                            Create a Post
                        </Button>
                        )}
                        {isAuth ? <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://i1.sndcdn.com/artworks-yt8hDa83ThhpebyF-TvyGCA-t500x500.jpg"  className='rounded-3xl w-10 h-10 mt-6' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className='line-clamp-1'>{user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                            : <Link to={"/auth"}>
                                <Button className='rounded-full bg-gray-900 font-bold mt-6' size={"lg"} variant={"outline"}>
                                    Login
                                </Button>

                            </Link>}
                        <CreatePost />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar