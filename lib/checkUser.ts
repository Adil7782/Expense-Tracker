import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async()=>{

    const user = await currentUser()

   
    if (!user){
        return null;
    }

    // checking the user from the db

    const loggedUser = await db.user.findUnique({
        where:{
            clerkUserId:user.id
        }
    });


    // return if he is in the db
    if (loggedUser)
    {
       
        return loggedUser
    }

    
    // if no user create one

    const newUser = await db.user.create({
        data:{
            clerkUserId:user.id,
            name:`${user.firstName} ${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        }
    });

    return newUser

}