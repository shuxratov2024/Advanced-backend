import React, { useState, type ChangeEvent } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from './ui/sheet'
import { UseCreatePost } from '@/hooks/use-create-post'
import { postSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import $axios from '@/http'
import { toast } from 'sonner'
import { postStore } from '@/store/post.store'
import { AuthStore } from '@/store/auth.store'
import $api from '@/http/api'




function CreatePost() {
  const [picture, setPicture] = useState<File | null>(null)
  const { isOpen, onClose } = UseCreatePost()
  const { posts, setPosts, } = postStore()
  const { setLoading } = AuthStore()

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "", body: "",
    },
  })
  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0]
    console.log(event.target.files)
    setPicture(file as File)
  }

  async function onSubmit(values: z.infer<typeof postSchema>) {
    if (!picture) return null

    const formData = new FormData();
    formData.append("title", values.title)
    formData.append("body", values.body)
    formData.append("picture", picture)

    try {
      const res = await $api.post("/post/create", formData)
      const newData = [...posts, res.data]
      setPosts(newData)
      form.reset()
      onClose()
    } catch (error) {
      //@ts-ignore
      toast(error.response.data.message)
    }finally {
      setLoading(false)
    }}

    // const promise = $axios.post("/post/create", formData).then(res => {
    //   const newData = [...posts, res.data]
    //   setPosts(newData)
    //   form.reset()
    // onClose()
    // })
    //   .catch(err => (errorMSG = err.response.data.message))


  //   toast.promise(promise, {
  //     loading: "Creating post...",
  //     success: "Post created successfully!",
  //     error: "Failed to create post.",
  //   })
  // }



  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a post</SheetTitle>
          <SheetDescription>Write what is in your mind.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
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
            <div>
              <Label htmlFor='picture'>Picture</Label>
              <Input
                id="picture"
                type="file"
                className='bg-secondary'
                onChange={onFileChange}  // `onChange` ishlatildi
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )

}

export default CreatePost