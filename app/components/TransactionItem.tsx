"use client"
import { Button } from '@/components/ui/button';
import { Transactions } from '@prisma/client'
import React, { useState } from 'react'
import { deleteTransaction } from '../actions/deleteTransaction';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const TransactionItem = ({transaction}:{transaction :Transactions}) => {
    

     const { toast } = useToast()

    const [loading,setLoading] = useState<boolean>(false)

    
     const handleDelete =async (id:string)=>{

        const confirm = window.confirm("Are you sure")
        setLoading(true)
        if(!confirm){
            return
        }

        const {messege,error} = await deleteTransaction(id)

        if(error){
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error,
              })
        }else{
            toast({
                
                title: "Success",
                description: messege,
              })
        }
        setLoading(false)



     }
  return (
    <div className="flex group ">
      <div className="flex items-center justify-between p-2 w-64 mb-2 bg-white border rounded shadow-md">
        <div className="flex items-center">
          <li className="text-sm font-medium text-gray-700 list-none">
            {transaction.text}
          </li>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-sm font-medium ${
              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {transaction.amount > 0 ? `+${Math.abs(transaction.amount)}` : `-${Math.abs(transaction.amount)}`}
          </span>
          <div
            className={`w-1 h-6 rounded ${
              transaction.amount > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
        </div>
      </div>
      <div className="ml-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"> {/* Hide button by default and show on hover */}
        <Button
          className="bg-destructive"
          onClick={() => handleDelete(transaction.id)}
        >
          X
        </Button>

      </div>
        <Loader2 className={cn("animate-spin w-5 h-5 hidden", loading && "flex items-center justify-center")} />
    </div>
  )
}

export default TransactionItem