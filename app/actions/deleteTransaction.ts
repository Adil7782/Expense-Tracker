"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const deleteTransaction = async (id:string): Promise<{
    messege?: string
    error?: string
}> => {


    const {userId} = await auth() 
    if(!userId) {
        return {error:"User Not Founded"}
    }

    try {
        
        await db.transactions.delete({
            where: {
                id: id,
                userId:userId
            }
        })
        revalidatePath('/')
      
        return {messege:"Transaction Deleted"}
    } catch (error) {
        
     
        return { error:"DB Error Occured" }
    }
}