import React, { useState } from 'react';
import {  NavLink} from 'react-router-dom';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { MdOutlineAttachMoney } from "react-icons/md";
import { SlWallet } from "react-icons/sl";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
        { name: 'Dashboard', path: '/', icon: <LuLayoutDashboard size={20} /> },
        { name: 'Income', path: '/income', icon: <MdOutlineAttachMoney size={20} /> },
        { name: 'Expense', path: '/expense', icon: <SlWallet size={20} /> },
        { name: 'Logout', path: '/logout', icon: <MdLogout size={20} /> },
    ];

    return (
        <div className="relative">
            <button className="flex items-center gap-5 text-3xl p-2 z-50 relative" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <><IoClose /><span className="text-xl font-semibold">Expense tracker</span></> : <CgMenuLeftAlt />}
            </button>
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-gray-200 shadow-md transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col p-5 gap-6 mt-10">
                    {menuItems.map(({ name, path, icon }) => (
                        <NavLink
                            key={name}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 font-semibold px-4 py-2 rounded-sm transition-colors duration-200
                            ${isActive ? 'bg-purple-600 text-white' : 'text-black hover:bg-purple-300'}`
                            }
                        >
                            {icon}
                            <p>{name}</p>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
