import { authSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { z } from "zod"
import { useAuth } from "@/hooks/use-auth"
import { useForm } from "react-hook-form"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import $axios from "@/http"
import { AuthStore } from "@/store/auth.store"
import { useNavigate } from "react-router-dom"


function Login() {
    const { setAuth } = useAuth()
    const {setIsAuth,setUser} = AuthStore()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "", password: "",
        },
    })
    const { mutate} = useMutation({
        mutationKey: ['login'],
        mutationFn: async (values: z.infer<typeof authSchema>) => {
            const { data } = await $axios.post(`/auth/login`, values);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Login successful!")
            setUser(data.user)
            setIsAuth(true)
            localStorage.setItem("accessToken", data.accessToken)
            navigate("/")
        },
        onError: () => {
            toast.error("Login failed, please check your credentials.")
        }
        
    })
    function onSubmit(values: z.infer<typeof authSchema>) {
     mutate(values)
    }
    return (
        <>
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-sm text-muted-foreground">Dont have a account  <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => setAuth("register")}>Sign Up</span></p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6 rounded">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Adress</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@xmail.com" {...field} className="rounded" />
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

export default Login