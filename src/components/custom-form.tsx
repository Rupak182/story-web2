'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { LoginSchema } from '@/schema'
import LoadingButton from '@/components/loading-btn'
import { handleCredentialsSignin } from '@/actions/authActions'
import ErrorMessage from './ErrorMessage'



export default function CustomForm() {
    const [globalError,setGlobalError] = useState<string>("");
 
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          username: "",
          password: ""
        }
      });
    
      const onSubmit = async (values:z.infer<typeof LoginSchema>) => {
          try {
            const res = await handleCredentialsSignin(values);
            if(res?.message){
              setGlobalError(res.message)
            }
          } catch (error) {
            setGlobalError("An unexpected error occured.Please try again .");
            
          }
      }


    
  return (
    <div className='flex flex-col items-center mt-10 justify-center w-full'>
        {globalError && <ErrorMessage error={globalError} />}
    
    {/* <Button onClick={c}></Button> */}
    <Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/3">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
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
              <Input type='password' placeholder="**********" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className='text-center py-5 w-full'>
        <LoadingButton pending={form.formState.isSubmitting} text="Login"/>
      </div>
    </form>
  </Form>
  </div>
  )
}
