import  { authSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { z } from "zod"
import { useAuth } from "@/hooks/use-auth"
import { useForm } from "react-hook-form"

function Register() {
    const {setAuth} = useAuth()
        const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
          email:"", password:"",
        },
      })
      function onSubmit(values: z.infer<typeof authSchema>) {}
  return (
    <>
    <h1 className="text-2xl font-bold">Register</h1>
    <p className="text-sm text-muted-foreground">Already have account ?<span className="cursor-pointer text-blue-500 hover:underline" onClick={()=> setAuth("login")}>Sign In</span></p>
      <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6 rounded">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Adress</FormLabel>
                      <FormControl>
                        <Input placeholder="example@xmail.com" {...field}  className="rounded"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="**************" type="password" className="rounded" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            
                <Button type="submit" size={"sm"} className="rounded-2xl">Submit</Button>
              </form>
            </Form>
    </>
  )
}

export default Register