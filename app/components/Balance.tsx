import React from 'react'
import { getUserBalance } from '../actions/getUserBalance'

const Balance =async () => {
  const {balance,error} = await getUserBalance()
  return (
    <div className='flex justify-center gap-4'>
    <div className='text-2xl'> Your Balance</div>
    <div className='text-2xl font-bold'>
    Rs.{balance ?? 0}
    </div>
    </div>
  )
}

export default Balance