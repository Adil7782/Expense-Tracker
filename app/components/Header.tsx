import React from 'react'
import {SignInButton,SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {

  const user = await checkUser();
  return (
    <div>
        <nav >
           <div className='container bg-slate-500 p-6  flex  justify-between items-center'>
            <h1 className='text-white text-xl'>Expense Tracker</h1>
            <div className='text-white'>
            <SignedOut>
                <SignInButton/>

               
           </SignedOut>
           <SignedIn>
            <UserButton></UserButton>
           </SignedIn>
            </div>
           </div>
          
        </nav>

    </div>
  )
}

export default Header