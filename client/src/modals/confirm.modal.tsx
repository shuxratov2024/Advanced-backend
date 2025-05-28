

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useConfirm,  } from '@/hooks/use-confirm'
import $axios, { API_URL } from '@/http'
import { postStore } from '@/store/post.store'
import { Dialog, DialogContent, DialogDescription, DialogTitle,  } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import FillLoading from '@/components/shared/fill-loading'
import { toast } from 'sonner'




function ConfirmModal() {
  
    const {isOpen, onClose,post} = useConfirm()

    const {setPosts, posts,} = postStore()
const { mutate, error,} = useMutation({
  mutationKey: ["delete-post"],
  mutationFn: async () => {
     const {data} = await $axios.delete(`/post/delete/${post._id}`);
     return data
  },
  onSuccess: (data) => {
    const newData = posts.filter(c => c._id !== data._id)
    setPosts(newData);
    onClose();
  },
  onError: (error) => {
    console.error("Delete error:", error.message);
    toast.error(error.message); 
    console.log("Deleting post with ID:", post._id);
  console.log("Full URL:", `${API_URL}/posts/${post._id}`);
  }
});
  return (
<Dialog open={isOpen} onOpenChange={onClose} >
  <DialogContent className='fixed left-[50%] top-[50%] w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background rounded p-6 shadow-lg focus:outline-none'>
    {error && (
       <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
      </AlertDescription>
    </Alert>
    )}
    
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <Button variant={'destructive'} onClick={onClose}> Cancel</Button>
        <Button onClick={()=> mutate()}> Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}


export default ConfirmModal