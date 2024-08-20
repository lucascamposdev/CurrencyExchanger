import { Link } from "react-router-dom"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6),
});

const Login = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
<div className="w-72">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-[12px]"/>
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-[12px]"/>
                </FormItem>
              )}
              />
            <Button className="w-full" type="submit">Login</Button>
            <div className="text-center">Don't have an account? 
              <Link to="/register"> <u>Sign Up</u></Link> 
            </div>
          </form>
        </Form>
    </div>
  )
}

export default Login