"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';
import AddTransaction from '../actions/addTransactions';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Transaction = () => {
    const formSchema = z.object({
      type: z.string().nonempty("Type is required"),
      amount: z.coerce.number()
      });

      const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues:{
            type: '',
            amount: 0
        }
    
      })


      
      
      const { toast } = useToast()
      const [loading,setLoading] = useState<boolean>(false)
      
      const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        console.log(formData.type,formData.amount)
        setLoading(true)
        const {data,error}  = await AddTransaction(formData)
        if(error)
        {
          
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error,
          })
        }else{
         
          toast({
            title: "Success",
            description: "Transaction Added",
          })
        }
        setLoading(false)

        form.reset()
      }
  return (
  <div className=' m-6 '>
    <div className='w-full flex-col justify-center '>
        <Form {...form}>

    <div className='flex justify-center items-center'>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">

      <div className='w-full '>
      <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input 
                placeholder="Food"
                
                type="text"
                {...field} />
              </FormControl>
              {/* <FormDescription>Tell us what type</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
        <div className=''>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input 
                placeholder="100"
                
                type="number"
                {...field} />
              </FormControl>
              {/* <FormDescription>The Amount</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className='flex justify-center '>
          <Button type="submit" className='mt-6 transition-transform transform hover:scale-105'>Submit</Button>

         </div>
<div className='flex justify-center m-2'>
          <Loader2 className={cn("animate-spin w-5 h-5 hidden", loading && "flex items-center justify-center")} />

</div>      </form>
    </div>
    </Form>
    </div>
  </div>
  )
}

export default Transaction