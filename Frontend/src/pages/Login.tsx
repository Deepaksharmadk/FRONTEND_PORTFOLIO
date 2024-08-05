import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/zod/register";
import { useLoginRtkMutation } from "@/redux/slice/userApi"; // Assuming you have a login mutation
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slice/authSlice";

export function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginRtk, { isLoading, isSuccess, data }] = useLoginRtkMutation();
  if (isSuccess && data) {
    dispatch(login(data));
    localStorage.setItem("userdata", JSON.stringify(data));
    toast({
      title: "Login successful.",
      description: "You have been successfully logged in.",
      variant: "success",
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  interface CustomError extends Error {
    data?: {
      message?: string;
    };
  }

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginRtk(data).unwrap();
    } catch (error) {
      const customError = error as CustomError;
      if (customError.data && customError.data.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: customError.data.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full h-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 outline-black">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1 text-black"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                    />
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
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8 text-center">
              <span>Do not have an account? </span>
              <Link
                to="/register"
                className="text-blue-500 hover:underline px-1 py-1 "
              >
                Register
              </Link>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mx-auto my-auto h-4 w-4 animate-spin text-orange-800" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
