import React from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";
const AmountColor = ({category,amount}) => {
  return (
      <span className={`${category == 'income' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} flex gap-1 items-center py-1 px-3 rounded-sm `}>
          <span>{category == 'income' ? <HiMiniArrowTrendingUp /> : <HiMiniArrowTrendingDown />}</span>
          <span className='flex items-center'><FaIndianRupeeSign />{amount}</span>
    </span>
  )
}

export default AmountColor
