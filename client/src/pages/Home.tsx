
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { $axios } from '@/http';
import PostCard from './../../cards/PostCard';
import type { IPost } from '@/interface';
import PostLoading from '@/components/shared/post-loading';
import ConfirmModal from '@/modals/confirm.modal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { postStore } from '@/store/post.store';



function Home() {
  const {setPosts,posts} = postStore();



  const {data,isLoading,error} = useQuery({
    queryKey: ['get-posts'],
    queryFn: async () => {
      const { data, status }  = await $axios.get("/post/get")
      setPosts(data)
      return data
    },
  })
  
  return (<>
    <div className='container mx-w-4xl mx-auto mt-20'>
      {error && (
         <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
      </AlertDescription>
    </Alert>
      )}
      <div className="grid grid-cols-3 gap-4">
        {isLoading && Array.from({ length: 6 }).map((_,idx)=> <PostLoading key={idx}  /> )}
        {posts.map((post:IPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
    <ConfirmModal/>
        </>
  )
}

export default Home