import React from 'react'
import { LuCreditCard } from 'react-icons/lu';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
const AmountBar = ({ label, amount, color,icon }) => {
    return (
        <div className="shadow-md w-full lg:w-1/3 rounded-md p-5 flex items-center gap-4 bg-white">
            <div className={`w-12 md:w-15 md:h-15 h-12 ${color} rounded-full flex items-center justify-center`}>
                {React.createElement(icon, { className: 'text-white text-xl' })}
            </div>
            <div>
                <p className="text-gray-700 md:text-xl">{label}</p>
                <p className="font-semibold md:text-lg">{amount}</p>
            </div>
        </div>
    )
}

export default AmountBar
