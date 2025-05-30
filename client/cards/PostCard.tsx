import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { API_URL, $axios } from '@/http';
import { Button } from '@/components/ui/button';
import type { IPost } from '@/interface';
import { useConfirm } from '@/hooks/use-confirm';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { postStore } from '@/store/post.store';
import { toast } from 'sonner';
import $api from '@/http/api';

function PostCard({ post }: { post: IPost }) {
  const [open, setOpen] = useState(false);

  const { onOpen, setPost } = useConfirm();
  const { setPosts, posts } = postStore();

  // DELETE funksiyasi
  const onDelete = () => {
    onOpen();
    setPost(post);
  };

  // PUT (edit) uchun mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ['edit-post'],
    mutationFn: async (values: z.infer<typeof postSchema>) => {
      console.log('Yuborilayotgan malumotlar:', values); // Yuborilayotgan ma'lumotlarni tekshirish
      const { data } = await $api.put(`/post/edit/${post._id}`, values);
      return data;
    },
    onSuccess: (data) => {
      console.log('Yangilangan ma\'lumot:', data); // Backenddan kelgan javobni tekshirish
      const newData = posts.map((c) => (c._id === data._id ? data : c));
      setPosts(newData);
      setOpen(false);
    },
    onError: (error) => {
      //@ts-ignore
     toast.err.response.data.message
    },
  });

  // react-hook-form sozlamalari
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title, // title bo'sh bo'lmasligiga ishonch hosil qilish
      body: post.body,
    },
  });

  // Form submit funksiyasi
  function onSubmit(values: z.infer<typeof postSchema>) {
    mutate(values);
  }

  return (
    <Card className="rounded mt-10">
      <img src={`${API_URL}/${post.picture}`} alt={post.title} className="rounded-t-md" />
      <CardContent className="mt-2">
        <CardTitle className="line-clamp-3">{post.title}</CardTitle>
        <p className="line-clamp-2 mt-1 text-muted-foreground">{post.body}</p>
      </CardContent>
      <CardFooter className="gap-2">
        {/* DELETE tugmasi */}
        <Button variant="destructive" className="w-14 rounded" onClick={onDelete}>
          Delete
        </Button>

        {/* EDIT uchun Popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="w-14 rounded">Edit</Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your title"
                          className="bg-secondary"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>Write the title of your post</FormDescription>
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
                        <Textarea
                          placeholder="Enter your text"
                          className="bg-secondary"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>In this article, you can write your post.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

export default PostCard;