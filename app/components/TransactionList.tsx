import { Transactions } from '@prisma/client'
import React from 'react'
import { getTransaction } from '../actions/getTransactions'
import { Separator } from '@/components/ui/separator'
import TransactionItem from './TransactionItem'


const TransactionList = async () => {
    const {transaction,error} = await getTransaction()
        if(error){
            
        }
  return (
    <div className='w-full flex flex-col items-center justify-center '>
        <div>
        <h3 className='mb-2'>History</h3>
        <Separator className='w-full mb-2'/>
        <ul>
           {
            transaction &&
                transaction.map((t:Transactions)=>{ 
                    return (
                        <TransactionItem key={t.id} transaction={t}/>
                    )
                })
           }
        </ul>
        </div>
    </div>
  )
}

export default TransactionList