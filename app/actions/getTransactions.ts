"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { Transactions } from "@prisma/client"

export const getTransaction = async (): Promise<{
    transaction?: Transactions[]
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
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        

        return {transaction}
    } catch (error) {
        
     
        return { error:"DB Error Occured" }
    }
}