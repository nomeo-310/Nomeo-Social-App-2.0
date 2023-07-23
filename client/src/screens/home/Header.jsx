import React from 'react';
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import {FaRegMoon, FaRegSun} from 'react-icons/fa';
import Card from '../../components/Card';

const Header = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const [redirect, setRedirect] = useState('')
    const colorTheme = theme === 'dark' ? 'light' : 'dark';
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme)
      }, [colorTheme, setTheme]);

    const logOutUser =()=> {
        window.location.reload();
        localStorage.clear();
        setRedirect('/login')
    }
    if (redirect) {
        return <Navigate to={redirect}/>
    }
  return (
    <div className='w-full fixed lg:px-[11%] md:px-[4%] px-[4%] z-50'> 
        <Card isPadded={true}>
            <div className="flex items-center justify-between font-quicksand font-semibold text-secondary dark:text-primary">
                <Link to={`/`} className='lg:text-lg'>Nomeo Social 2.0</Link>
                <div className='flex gap-5 items-center justify-between'>
                    <button className='flex items-center'>
                        <FaRegMoon onClick={() => setTheme('dark')} className='dark:hidden'/>
                        <FaRegSun onClick={() => setTheme('light')} className='hidden dark:block'/>
                    </button>
                    <button className='dark:text-primary text-secondary' onClick={logOutUser}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </button>
                </div>
            </div>
        </Card>
    </div>
  );
}

export default Header;
