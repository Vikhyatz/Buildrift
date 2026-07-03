"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiGithub } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function RegisterPage() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [notSame, setNotSame] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    console.log(data)

    // check if the passwords are same or not
    if (data.password != data.confirmpassword) {
      setNotSame(true)
    } else {
      setNotSame(false)

      setLoading(true);
      // only post this request if the password matches confirm password
      const res = await fetch('/api/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("user created successfully")
        const data = await res.json();
        console.log(data)

        redirect('/login')

      } else {
        toast.error("not able to create user")
      }
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="w-12 h-12 bg-primary rounded-xl mx-auto flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <CardTitle className="text-2xl tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <FiGithub className="w-5 h-5 mr-2" />
            Sign up with GitHub
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <Input {...register("name", { required: true })} id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input {...register("email", { required: true })} id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <Input  {...register("password", { required: true })} id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="confirm-password">Confirm Password</label>
              <Input {...register("confirmpassword", { required: true })} id="confirm-password" type="password" required />
            </div>
            {notSame ? "this is not acceptable" : ""}

            <Button type="submit" className="w-full" isLoading={loading}>
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border pt-6">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

