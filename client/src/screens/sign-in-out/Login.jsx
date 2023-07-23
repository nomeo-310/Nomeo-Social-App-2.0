import React from 'react';
import { useState } from 'react';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import {loginCalls} from '../../../apiCalls'
import { useContext } from 'react';
import {UserContext} from '../../components/context/UserContext.jsx'

const Login = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user, isFetching, error, dispatch} = useContext(UserContext);

    const reset =()=> {
        setUserName('');
        setEmail('');
        setPassword('')
    };

    const handleSubmit = (event)=> {
        event.preventDefault();
        loginCalls({email, password}, dispatch);
    }

  return (
    <div className="w-[92%] lg:w-[75%] md:w-[88%] h-screen mx-auto pt-[10%] flex items-center justify-center">
        <div className="grow lg:-mt-[10%]">
            <Card isPadded={true}>
                <div className="flex flex-col md:flex-row md:gap-3 gap-[60px] py-[15%] md:py-[3%]">
                    <div className="w-full md:w-[60%] text-center md:text-left flex flex-col gap-3">
                        <div>
                            <h2 className='text-2xl md:text-3xl lg:text-7xl mb-2 font-bold text-secondary font-quicksand'>Nomeo Socials</h2>
                            <p className="text-base lg:text-2xl font-quicksand">Meet friends, create moments and share moments</p>
                        </div>
                        <div className='grow rounded-md relative overflow-hidden hidden md:block'>
                            <div className='absolute overflow-hidden md:left-2 md:top-2 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/login/dancing.png" alt="dancing_img"/>
                            </div>
                            <div className='absolute overflow-hidden md:left-12 md:top-12 lg:left-14 lg:top-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/login/levitate.png" alt="levitate_img"/>
                            </div>
                            <div className='absolute overflow-hidden md:left-24 md:top-20 lg:left-32 lg:top-20 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/login/meditating.png" alt="meditating_img"/>
                            </div>
                            <div className='absolute overflow-hidden md:left-36 md:top-2 lg:left-60 lg:top-0 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                               <img src="./assets/login/reading-side.png" alt="reading-side_img"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[40%]">
                        <form action="" className='flex flex-col gap-2 lg:gap-3' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='text-sm mb-1 lg:text-base'>Username</label>
                                <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                    <span className='w-[50px] h-[40px] lg:w-[65px] lg:h-[50px] flex items-center justify-center text-xl text-white bg-secondary rounded-l-md'>@</span>
                                    <input type="text" placeholder='your username e.g yourusername11' className='input-style' value={userName} onChange={(event) => setUserName(event.target.value)}/>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm mb-1 lg:text-base'>Email</label>
                                <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                    <input type="email" placeholder='your email e.g yourname@mail.com' className='input-style' value={email} onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm mb-1 lg:text-base'>Password</label>
                                <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                    <input type="password" placeholder='type your password' className='input-style' value={password} onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                            </div>
                            <div className='h-[40px] lg:h-[50px] mt-8'>
                                <button type="submit" className='h-full w-full bg-secondary text-white rounded-md text-base lg:text-lg'>{isFetching ? 'loading...': 'Login' }</button>
                            </div>
                        </form>
                        <div className='mt-2 text-center'>
                            <h2 className='text-sm lg:text-base'>Don't have an account? <Link to={'/create-account'} className='text-secondary underline'>Sign up</Link></h2>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}

export default Login;
