import { Link, useNavigate } from "react-router-dom"

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
import useAuth from "@/hooks/useAuth"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6),
});

const Login = () => {

  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password);
      navigate("/app");
    } catch (error) {
      setLoginError("Wrong credentials.");
    }
  }

  return (
    <div className="w-72">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="text-[12px]" />
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
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}/>
          <Button className="w-full" type="submit">Login</Button>
          {loginError && (
            <div className="text-red-500 text-sm py-5 text-center">
              {loginError}
            </div>
          )}
          <div className="text-center">Don't have an account?
            <Link to="/register"> <u>Sign Up</u></Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Login