import React from 'react';
import Card from '../../components/Card';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { FaTimesCircle } from 'react-icons/fa';

const Registration = () => {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [reDirect, setReDirect] = useState('')

    const reset =()=> {
        setUserName('');
        setFullName('');
        setLocation('');
        setOccupation('');
        setEmail('');
        setPassword('')
        setProfilePicture('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('userName', userName);
        data.append('fullName', fullName);
        data.append('location',location);
        data.append('occupation',occupation);
        data.append('email', email);
        data.append('password', password);
        data.append('profileImage', profilePicture);

        try {
            await axios.post('/api/auth/register', data);
            alert('user created succesfully');
            setReDirect('/login');
            reset();
        } catch (error) {
            alert('error creating user');
        }
    }
    if (reDirect) {
        return <Navigate to={reDirect}/>
    }
  return (
    <div className="w-[92%] md:w-[89%] h-screen mx-auto pt-[10%] flex items-center justify-center">
        <div className="grow lg:-mt-[10%]">
            <Card isPadded={true}>
                <div className="flex flex-col md:flex-row md:gap-3 gap-5 py-[5%] md:py-[3%]">
                    <div className="w-full md:w-[45%] text-center md:text-left flex flex-col gap-3">
                        <div>
                            <h2 className='text-2xl md:text-3xl lg:text-7xl mb-2 font-bold text-secondary font-quicksand'>Nomeo Socials</h2>
                            <p className="text-base lg:text-2xl font-quicksand">Meet friends, create moments and share moments</p>
                        </div>
                        <div className='grow rounded-md relative overflow-hidden hidden md:block'>
                            <div className='absolute overflow-hidden md:left-2 md:top-2 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/sign-up/petting.png" alt="petting_img"/>
                            </div>
                            <div className='absolute overflow-hidden md:left-12 md:top-12 lg:left-14 lg:top-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/sign-up/float.png" alt="float_img"/>
                            </div>
                            <div className='absolute overflow-hidden md:left-24 md:top-20 lg:left-32 lg:top-20 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/sign-up/sprinting.png" alt="sprinting_img"/>
                            </div>
                            <div className='absolute overflow-hidden md:left-36 md:top-2 lg:left-60 lg:top-0 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-primary/[0.40] rounded-full flex items-center justify-center'>
                                <img src="./assets/sign-up/chilling.png" alt="chilling_img"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[55%]">
                        <form action="" className='flex flex-col gap-2 lg:gap-3' encType='multipart/form-data' onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 lg:text-base'>Username</label>
                                    <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                        <span className='w-[50px] h-[40px] lg:w-[65px] lg:h-[50px] flex items-center justify-center text-xl text-white bg-secondary rounded-l-md'>@</span>
                                        <input type="text" placeholder='your username e.g username11' className='input-style' value={userName} onChange={(event) => setUserName(event.target.value)}/>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 lg:text-base'>Full name</label>
                                    <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                        <input type="text" placeholder='your fullname e.g John Doe' className='input-style capitalize' value={fullName} onChange={(event) => setFullName(event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 lg:text-base'>Location</label>
                                    <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                        <input type="text" placeholder='your location e.g city, state' className='input-style capitalize' value={location} onChange={(event) => setLocation(event.target.value)}/>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 lg:text-base'>Occupation</label>
                                    <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                        <input type="text" placeholder='what you do for a living e.g teacher' className='input-style capitalize' value={occupation} onChange={(event) => setOccupation(event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 lg:text-base'>Email</label>
                                    <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                        <input type="email" placeholder='your mail e.g yourmail@.com' className='input-style' value={email} onChange={(event) => setEmail(event.target.value)}/>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 lg:text-base'>Password</label>
                                    <div className='flex items-center h-[40px] lg:h-[50px] rounded-md border border-secondary'>
                                        <input type="password" placeholder='your password' className='input-style' value={password} onChange={(event) => setPassword(event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='p-2 lg:p-3 rounded-md border border-secondary h-full'>
                            <label htmlFor="file">
                                <input type="file" name="profileImage" id="file" className='hidden' onChange={(event) => setProfilePicture(event.target.files[0])}/>
                                <div className="flex gap-1 items-center text-slate-400 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                    <span className='text-xs lg:text-base'>upload profile picture</span>
                                </div>
                            </label>
                            { profilePicture && 
                                <div className="w-3/4 lg:w-1/2 relative">
                                    <Card>
                                        <img src={URL.createObjectURL(profilePicture)} alt="" className='rounded-md overflow-hidden mt-2'/>
                                    </Card>
                                    <FaTimesCircle className='absolute top-2 right-2 text-xl cursor-pointer' onClick={()=> setProfilePicture(null)}/>
                                </div>
                                }
                            </div>
                            <div className='h-[40px] lg:h-[50px] md:mt-8 mt-5'>
                                <button type="submit" className='h-full w-full bg-secondary text-white rounded-md text-base lg:text-lg'>Create account</button>
                            </div>
                        </form>
                        <div className='mt-2 text-center'>
                            <h2 className='text-sm lg:text-base'>Already have an account? <Link to={'/login'} className='text-secondary underline'>Login</Link></h2>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}

export default Registration;
