"use server"


import { db } from "@/lib/db";
import { auth,  } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
// const user = await currentUser()



interface TransactionData {
    text:string;
    amount:number;
    
}

interface TransactionResult{
    data?: TransactionData;
    error?: string;
}


async function AddTransaction(formData:any): Promise<TransactionResult> {
    

    console.log("Received formData:", formData);
    const { type, amount } = formData;
    // console.log("asasa",formData)
    // const {type,amount} = formData

    if (!type || !amount) {
        return { error: "Invalid transaction data" };
    }

    const { userId } = await auth()

  
    if (!userId){
        return{error:"User Not Found"}
    }

    

    try {
        console.log("first2",type,amount,userId)

        
        const data = await db.transactions.create({
    data: {
        userId,
        text: type || "Unknown", // Provide a default value
        amount: Number(amount) || 0, // Ensure amount is a number
    }
});
        console.log("first")
        revalidatePath('/')
        return {data:data}

    } catch (error) {
        console.log(error)
        return{error:"Transaction Failed hutto"}
    }
    
  
}
export default AddTransaction