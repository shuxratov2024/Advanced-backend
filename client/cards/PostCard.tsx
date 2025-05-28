

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { API_URL, $axios } from '@/http';
import { Button } from '@/components/ui/button';
import type { IPost } from '@/interface';
import { useConfirm } from '@/hooks/use-confirm';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { Popover, PopoverTrigger, } from '@radix-ui/react-popover';
import { PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { postStore } from '@/store/post.store';

function PostCard({post}: {post: IPost}) {
  const [open,setOpen] = useState(false)

  const {onOpen,setPost} = useConfirm();
  const {setPosts, posts} = postStore();

  const onDelete = () => {
    onOpen()
    setPost(post)
  }
  const { mutate} = useMutation({
    mutationKey: ["edit-post"],
    mutationFn: async (values:z.infer<typeof postSchema>) => {
       const {data} = await $axios.put(`/post/edit/${post._id}`,values);
       return data
    },
    onSuccess: data => {
      const newData = posts.map(c => (c._id === data._id ? data : c))
      setPosts(newData);
      setOpen (false);}
  })
  function onSubmit (values: z.infer<typeof postSchema>){
    mutate(values);
  }
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {title: post.title, body:post.body},
    })
  
  return (
    <Card className='rounded'>
        <img src={`${API_URL}/${post.picture}`} alt={post.title} className='rounded-t-md'/>
        <CardContent className='mt-2'>
            <CardTitle className='line-clamp-1'>{post.title}</CardTitle>
            <p className='line-clamp-2 mt-1 text-muted-foreground'>{post.body}</p>
        </CardContent>
        <CardFooter className='gap-2'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant={"destructive"} className='w-14 rounded' onClick={onDelete}>Delete</Button>
          </PopoverTrigger>
   <PopoverContent className='w-96'>
    {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your username" className='bg-secondary' {...field} />
                  </FormControl>
                  <FormDescription>Write title of your post </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="enter your text" className='bg-secondary' {...field} />
                  </FormControl>
                  <FormDescription>In this article you can write your post.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
   </PopoverContent>
</Popover>
            <Button className='w-14 rounded'onClick={() => setOpen(true)}>Edit</Button>
        </CardFooter>
    </Card>
  )
}

export default PostCard