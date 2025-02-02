"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export const getUserBalance = async (): Promise<{
    balance?: number
    error?: string
}> => {


    const {userId} = await auth() 
    if(!userId) {
        return {error:"User Not Founded"}
    }

    try {
        
        const transaction = await db.transactions.findMany({
            where:{
                userId:userId
            }
        })

        const balance = transaction.reduce((acc,next)=>acc+next.amount,0)
        return {balance}
    } catch (error) {
        
     
        return { error:"DB Error Occured" }
    }
}