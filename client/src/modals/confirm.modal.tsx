

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useConfirm,  } from '@/hooks/use-confirm'
import $axios from '@/http'
import { postStore } from '@/store/post.store'
import { Dialog, DialogContent, DialogDescription, DialogTitle,  } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import FillLoading from '@/components/shared/fill-loading'
import { toast } from 'sonner'




function ConfirmModal() {
    const {isOpen, onClose,post} = useConfirm()

    const {setPosts, posts,} = postStore()
const { mutate, error, isPending } = useMutation({
  mutationKey: ["delete-post"],
  mutationFn: async () => {
    try {
      if (!post?._id) throw new Error("Post ID not found");
      
      const response = await $axios.delete(`/post/delete/${post._id}`);
      return response.data;
    } catch (err) {
      // To'g'ri error message olish
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete post";
      throw new Error(errorMessage);
    }
  },
  onSuccess: (data) => {
    setPosts(posts.filter(p => p._id !== data._id));
    onClose();
  },
  onError: (error) => {
    console.error("Delete error:", error.message);
    // Foydalanuvchiga xabarni ko'rsatish
    toast.error(error.message); // Agar toast ishlatayotgan bo'lsangiz
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