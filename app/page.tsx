import { checkUser } from '@/lib/checkUser'
import React from 'react'
import Guest from './components/Guest'
import { currentUser } from '@clerk/nextjs/server'
import Transaction from './components/Transaction'
import Balance from './components/Balance'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'


const HomePage = async () => {
  
const user = await currentUser()

if(!user){
  return(
    <Guest/>
  )

}


  return (
    <div>
      <div>
        <div className='flex justify-center text-4xl'>
        Welcome , {user.firstName}
        </div>
        <Balance/>
        <IncomeExpense/>
        <Transaction/>
        <TransactionList/>
        </div>
    </div>
  );
}

export default HomePage