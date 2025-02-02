"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export const getIncomeExpence = async (): Promise<{
    income?: number
    expense?: number
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

        const amounts = transaction.map((transaction)=>transaction.amount)

        const income = amounts.filter((a)=>a > 0).reduce((acc,next)=>acc+next ,0)
        const expense = amounts.filter((a)=>a < 0).reduce((acc,next)=>acc+next ,0)

        return {income,expense}
    } catch (error) {
        
     
        return { error:"DB Error Occured" }
    }
}