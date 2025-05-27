

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { API_URL } from '@/http';
import { Button } from '@/components/ui/button';
import type { IPost } from '@/interface';
import { useConfirm } from '@/hooks/use-confirm';

function PostCard({post}: {post: IPost}) {
  const {onOpen} = useConfirm();
  const onDelete = () => {
    onOpen();
  }
  return (
    <Card className='rounded'>
        <img src={`${API_URL}/${post.picture}`} alt={post.title} className='rounded-t-md'/>
        <CardContent className='mt-2'>
            <CardTitle className='line-clamp-1'>{post.title}</CardTitle>
            <p className='line-clamp-2 mt-1 text-muted-foreground'>{post.body}</p>
        </CardContent>
        <CardFooter className='gap-2'>
            <Button className='w-14 rounded'>Edit</Button>
            <Button variant={"destructive"} className='w-14 rounded' onClick={onDelete}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default PostCard