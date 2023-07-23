import React from 'react';
import Card from '../../components/Card';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ProfileForm = () => {
    const {id} = useParams();
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [description, setDescription] = useState('');
    const [relationship, setRelationship] = useState('');
    const [hobby, setHobby] = useState('');

    const userId = id;

    useEffect(() => {
        axios.get(`api/user/${id}`).then(response => {
            const {data} = response;
            setUserName(data.userName);
            setFullName(data.fullName);
            setLocation(data.location);
            setOccupation(data.occupation);
            setDescription(data.description);
            setRelationship(data.relationship);
            setHobby(data.hobby);
        })

    }, [id]);

    const handleSubmit = async (event)=> {
        event.preventDefault();
        const newUser = {userId, userName, fullName, location, occupation, description, relationship, hobby}
        try {
            await axios.put(`api/user/${id}`, newUser);
            alert('your profile has been updated');
            window.location.reload()
        } catch (error) {
            alert('profile not updated');
        }
    }

  return (
    <Card isPadded={true}>
        <h2 className='capitalize text-sm lg:text-base font-semibold mb-3 lg:mb-5'>edit profile</h2>
        <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Username</label>
                    <div className='flex items-center h-[35px] lg:h-[40px] rounded-md border border-secondary dark:border-primary'>
                        <span className='w-[50px] h-[35px] lg:w-[65px] lg:h-[40px] flex items-center justify-center text-xl text-white bg-secondary rounded-l-md dark:bg-primary'>@</span>
                        <input type="text" placeholder='your username e.g username11' className='p-2 lg:py-2 lg:px-3 outline-none h-full w-full block rounded-r-md placeholder:text-xs placeholder:lg:text-base text-sm lg:text-base placeholder:lowercase bg-inherit'value={userName} onChange={(event) => setUserName(event.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Full name</label>
                    <div className='flex items-center h-[35px] lg:h-[40px] rounded-md border border-secondary dark:border-primary'>
                        <input type="text" placeholder='your fullname e.g John Doe' className='input-style capitalize bg-inherit' value={fullName} onChange={(event) => setFullName(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Location</label>
                    <div className='flex items-center h-[35px] lg:h-[40px] rounded-md border border-secondary dark:border-primary'>
                        <input type="text" placeholder='your fullname e.g John Doe' className='input-style capitalize bg-inherit' value={location} onChange={(event) => setLocation(event.target.value)}/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Occupation</label>
                    <div className='flex items-center h-[35px] lg:h-[40px] rounded-md border border-secondary dark:border-primary'>
                        <input type="text" placeholder='your fullname e.g John Doe' className='input-style capitalize bg-inherit' value={occupation} onChange={(event) => setOccupation(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Relation status</label>
                    <div className='flex items-center h-[35px] lg:h-[40px] rounded-md border border-secondary dark:border-primary'>
                        <input type="text" placeholder='e.g single, married, complicated' className='input-style capitalize bg-inherit' value={relationship} onChange={(event) => setRelationship(event.target.value)}/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Hobbies</label>
                    <div className='flex items-center h-[35px] lg:h-[40px] rounded-md border border-secondary dark:border-primary'>
                        <input type="text" placeholder='e.g singing, cooking etc.' className='input-style capitalize bg-inherit' value={hobby} onChange={(event) => setHobby(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1">
                <div className='flex flex-col'>
                    <label className='text-sm mb-1 lg:text-base'>Description</label>
                    <div className='h-[60px] lg:h-[80px] rounded-md border border-secondary dark:border-primary'>
                        <textarea type="text" placeholder='about yourself in less than 200 words' className='p-2 lg:py-2 lg:px-3 outline-none h-full w-full block rounded-r-md placeholder:text-xs placeholder:lg:text-base text-sm lg:text-base placeholder:lowercase bg-inherit'value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <button className='bg-secondary dark:bg-primary px-4 py-1 rounded-full text-sm lg:text-base text-white' type='submit'>submit</button>
            </div>
        </form>
    </Card>
  );
}

export default ProfileForm;
