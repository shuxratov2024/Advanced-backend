import React from 'react'
import logo from "/public/logo/logo.png"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import CreatePost from '../create-post'
import { UseCreatePost } from '@/hooks/use-create-post'
import { AuthStore } from '@/store/auth.store'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

function Navbar() {

    const { onOpen } = UseCreatePost()
    const { isAuth, user } = AuthStore()

    return (
        <>
            <div className='w-full h-24 bg-gray-900 fixed inset-0'>
                <div className="w-full h-full flex justify-between items-content container">
                    <Link className='flex items-center justify-center w-40.5 h-18 .5' to={'/'}>
                        <img src={logo} className='w-full' />

                    </Link>
                    <div className="flex gap-2">
                        <Button className='rounded-full bg-gray-600  font-bold mt-6' size={"lg"} variant={"outline"} onClick={onOpen}>
                            Create a Post
                        </Button>
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
                                <DropdownMenuItem>Logout</DropdownMenuItem>

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