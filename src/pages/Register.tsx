import { z } from "zod";
import { formSchema } from "@/zod/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddPostMutation } from "@/redux/slice/userApi";
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

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [addPost, { isLoading, isSuccess, data }] = useAddPostMutation();
  console.log(data);
  if (isSuccess && data) {
    localStorage.setItem("userdata", JSON.stringify(data));
    toast({
      title: "User Created.",
      description: "Your account has been successfully created.",
      variant: "success",
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  interface CustomError extends Error {
    data?: {
      message?: string;
    };
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("aboutMe", data.aboutMe);

      if (data.resume instanceof File) {
        formData.append("resume", data.resume);
      }

      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      await addPost(formData).unwrap();
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
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 outline-black">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1 text-black"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Deepak Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
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
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Your about"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8 text-center">
              <span>Do have an account? </span>
              <Link
                to="/sign-in"
                className="text-blue-500 hover:underline px-1 py-1 "
              >
                Login
              </Link>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mx-auto my-auto h-4 w-4 animate-spin text-orange-800" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
