import React, { type ChangeEvent } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
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

function CreatePost() {
    const {isOpen,onClose} = UseCreatePost()

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title:"", body:"",
    },
  })
  function onFileChange( event :ChangeEvent<HTMLInputElement>){
   const file = event.target.files  &&  event.target.files[0]
   console.log(event.target.files)
   console.log(file); 
  }

    function onSubmit(values: z.infer<typeof postSchema>) {
    console.log(values)
  }



    return(
      <>
      
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a post</SheetTitle>
          <SheetDescription>
            Write what is in your mind.
          </SheetDescription>
        </SheetHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="enter your email" className='bg-secondary' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Textarea placeholder="enter your email" className='bg-secondary' {...field} />
              </FormControl>
              <FormDescription>
                in this article you can write your post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <div>
            <Label htmlFor='picture'>Picture</Label>
            <Input id="picture" type="file"  className='bg-secondary' onCanPlay={onFileChange}/>
          </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </SheetContent>
    </Sheet>


     </>

    )

        }
 
export default CreatePost