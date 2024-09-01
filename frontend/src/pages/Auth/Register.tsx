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
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

interface ApiError {
  message: string;
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50).email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});

const Register = () => {

  const [registerError, setRegisterError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate(); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          const name = values.name.charAt(0).toUpperCase() + values.name.slice(1).toLowerCase();
          await register(values.email, name, values.password);
          navigate("/");
        } catch (error) {
          console.log(error)
          let msg = (error as ApiError).message;
          setRegisterError(msg);
        }
      }
    
      return (
        <div className="w-72">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-[12px]"/>
                </FormItem>
              )}
              />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-[12px]"/>
                </FormItem>
              )}
              />
            {registerError && (
              <div className="text-red-500 text-sm pb-3 text-center">
                {registerError}
              </div>
            )}
            <Button className="w-full" type="submit">Submit</Button>
            <div className="text-center">Already have an account? 
              <Link to="/auth/login"> <u>Sign In</u></Link> 
            </div>
          </form>
        </Form>
    </div>
      );
    };

export default Register